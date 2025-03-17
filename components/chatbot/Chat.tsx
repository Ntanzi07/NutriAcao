'use client'

import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col h-screen py-20 ">
      <div className="flex flex-col h-full p-3 padding-x rounded overflow-auto px-4">
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

      <div className="padding-x mt-4">
        <div className='chat__input-container'>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat__input"
            placeholder="Pergunte alguma coisa..."
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
