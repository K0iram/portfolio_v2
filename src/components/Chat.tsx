'use client';

import OpenAI from 'openai';
import { useEffect, useRef, useState } from 'react';
import { useJsonStream } from 'stream-hooks';
import { schema } from '../app/api/chat/schema';

type Message = {
  content: string | null;
  role: OpenAI.ChatCompletionMessageParam['role']
}

const Chat: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I am Mario's AI assistant. How can I help you today?` } // Initial bot message
  ]);
  const [currentBotMessage, setCurrentBotMessage] = useState<string>('');
  const latestMessages = useRef<Message[]>(conversation);

  const { startStream, loading } = useJsonStream({
    schema,
    onReceive: (data) => {
      if (data.content) {
        const newMessages: Message[] = [...latestMessages.current, { role: 'assistant', content: data.content }];
        setConversation(newMessages);
      }
    },
    onEnd(data) {
      if (data) {
        const newMessages: Message[] = [...latestMessages.current, { role: 'assistant', content: data.content }];
        setConversation(newMessages);
        latestMessages.current = newMessages;
      }
    }
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null); // Ref for the messages container

  useEffect(() => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const height = messagesContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [conversation]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessages: Message[] = [...conversation, { role: 'user', content: text }];
    setConversation(newMessages);
    latestMessages.current = newMessages;
    setText('');
    try {
      startStream({
        url: '/api/chat',
        method: 'POST',
        body: {
          messages: [
            ...newMessages,
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
      <div className="overflow-auto h-96 p-2 space-y-2" ref={messagesContainerRef}>
          {conversation.map((message, index) => (
            <div key={index} className={`text-sm ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block rounded-lg px-3 py-1 ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-600'
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
            className="ml-4 flex-none bg--500 hover:bg--600 text-white rounded-md px-4 py-2 text-sm disabled:bg--300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
