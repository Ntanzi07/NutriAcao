'use client'

import React, { useState } from 'react'

const Chat = () => {

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.reply };

      setMessages((prev) => [...prev, botMessage]); // Add AI response to chat
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Unable to fetch response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen py-20 padding-x">
      <div className=" flex h-full flex-col border p-3 rounded bg-white overflow-auto px-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 w-fit max-w-[90%] rounded ${msg.role === "user" ? "bg-blue-300 self-end" : "bg-gray-300 text-left"}`}>
            {msg.content}
          </div>
        ))}
        <div>a</div>

      </div>

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
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat