'use client'

import React, { useState } from 'react';

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
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Unable to fetch response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen py-20 px-4">
      {/* Chat Display */}
      <div className="flex flex-col h-full border p-3 rounded bg-white overflow-auto px-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 w-fit max-w-[90%] rounded ${msg.role === 'user' ? 'bg-blue-300 self-end' : 'bg-gray-300 text-left'}`}>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
