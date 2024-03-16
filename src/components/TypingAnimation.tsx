'use client'

import React, { useState, useEffect } from 'react';


const TypingAnimation: React.FC<{ variations: string[] }> = ({ variations }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentText => currentText.slice(0, currentText.length - 1));
        setTypingSpeed(100);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentText => variations[loopNum].slice(0, currentText.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }

    if (!isDeleting && text === variations[loopNum]) {
      setIsDeleting(true);
      setTypingSpeed(3000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum => (loopNum + 1) % variations.length);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">{text}</h1>
      <span className="cursor w-1 animate-blink"></span>
    </>
  );
};

export default TypingAnimation;
