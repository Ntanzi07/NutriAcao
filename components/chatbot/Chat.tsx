'use client'

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from "react-markdown";

type Props = {
  chatid: string | null,
}

const Chat = ({ chatid }: Props) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand dynamically
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);


  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botMessage = { role: 'assistant', content: '' };

      setMessages((prev) => [...prev, botMessage]); // Add bot message placeholder

      while (true) {
        const { value, done } = await reader?.read() ?? {};
        if (done) break;

        botMessage.content += decoder.decode(value, { stream: true });

        // Update last bot message in real-time
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = botMessage;
          return updatedMessages;
        });
      }
      console.log(messages);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Unable to fetch response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-screen py-20 ">
      <div className={`flex flex-col h-full rounded overflow-auto lg:px-[20vw] padding-x 
        ${(messages.length === 0) ? 'justify-center' : 'justify-start'}`
      }>
        <div className={`markdonw-content-firstmessage`}>
          Olá Meu nome é Sarah, sua IA nutricionista, estou aqui para te ajudar com qualquer duvida!!
        </div>
        {messages.map((msg, index) => (
          <div key={index} className={`markdonw-content ${msg.role === 'user' ? 'markdonw-content-user' : 'markdonw-content-ai'}`}>
            <ReactMarkdown>
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="lg:px-[20vw] padding-x mt-4">
        <div className='chat__input-container'>
          <textarea
            ref={textareaRef}
            value={input}
            className="chat__input"
            placeholder="Pergunte alguma coisa..."
            onChange={(e) => { setInput(e.target.value) }}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 py-2 px-4 bg-primary-green text-white rounded-full disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
