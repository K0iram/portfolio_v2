'use client';

import { useEffect, useRef, useState } from 'react';
import { useJsonStream } from 'stream-hooks';
import { z } from 'zod';

interface Data {
  content: string | null;
}

const Chat: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [conversation, setConversation] = useState<Array<{ sender: 'user' | 'bot'; content: string }>>([
    { sender: 'bot', content: `Hi! I am Mario's AI assistant. How can I help you today?` } // Initial bot message
  ]);
  const [currentBotMessage, setCurrentBotMessage] = useState<string>('');

  const { startStream, loading } = useJsonStream<z.ZodObject<any, any, any, { [x: string]: any; }, { [x: string]: any; }>>({
    schema: z.object({
      content: z.string().nullable(),
    }),
    onReceive: (data: Partial<Data>) => {
      if (data.content) {
        // Accumulate the bot's response
        setCurrentBotMessage(data.content);
      }
    },
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null); // Ref for the messages container

  // Effect for scrolling to the bottom on conversation update
  useEffect(() => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const height = messagesContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [conversation]);


  // Effect to update the conversation when loading finishes
  useEffect(() => {
    if (!loading && currentBotMessage) {
      // Add the accumulated bot message to the conversation
      setConversation(prev => [...prev, { sender: 'bot', content: currentBotMessage }]);
      setCurrentBotMessage(''); // Reset for the next message
    }
  }, [loading, currentBotMessage]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add the user's message to the conversation immediately
    setConversation((prev) => [...prev, { sender: 'user', content: text }]);
    setText('');
    try {
      startStream({
        url: '/api/chat',
        method: 'POST',
        body: {
          messages: [
            {
              content: text,
              role: 'user',
            },
          ],
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="overflow-auto h-96 p-2 space-y-2 bg-white dark:bg-zinc-700/[0.15]" ref={messagesContainerRef}>
          {conversation.map((message, index) => (
            <div key={index} className={`text-sm ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block rounded-lg px-3 py-1 ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-600'
                }`}
              >
                <p>{message.content}</p>
              </span>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex animate-pulse">
                <span className="block bg-gray-500 h-2 w-2 rounded-full mr-1"></span>
                <span className="block bg-gray-500 h-2 w-2 rounded-full mr-1"></span>
                <span className="block bg-gray-500 h-2 w-2 rounded-full"></span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-4 flex-none bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 text-sm disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
