'use client'

import { api } from '@/convex/_generated/api';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

type Props = {
  chatid: string | null,
}
interface Message {
  role: string;
  content: string;
}

const Chat = (props: Props) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "system",
      content:
        "Olá Meu nome é Sarah, sua IA nutricionista, estou aqui para te ajudar com qualquer duvida!!",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const conversations = useQuery(api.conversations.get);
  const createConversation = useMutation(api.convertation.create);
  const updateMessage = useMutation(api.convertation.update);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand dynamically
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  useEffect(() => {
    if (!conversations) return
    
    if (!isWriting) {
      const foundConversation = conversations?.find(c => c._id === props.chatid);

      if (foundConversation) {
        setMessages(foundConversation.messages);
      } else {
        setMessages([{
          role: "system",
          content:
            "Olá Meu nome é Sarah, sua IA nutricionista, estou aqui para te ajudar com qualquer duvida!!",
        }]);
      }
    }
  }, [props.chatid, conversations]);

  const handleUpdate = async (idchat: Id<"conversations">, newMessages: Message[]) => {
    try {
      await updateMessage({
        conversationId: idchat,
        messages: newMessages
      });
    } catch (error) {
      console.error("Failed to update messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
  
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setIsWriting(true);
  
    let currentChatId = props.chatid;
  
    try {
      // Handle new conversation case
      if (currentChatId === null) {
        const firstMessage = updatedMessages?.[1]?.content || "New Conversation!!";
  
        const conversation = await createConversation({
          firstMessage,
          messages: updatedMessages
        });
  
        currentChatId = conversation._id;
        router.push(`/chatbot?id=${currentChatId}`);
      }
  
      // Start streaming AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(updatedMessages),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botMessage = { role: 'assistant', content: '' };
  
      setMessages((prev) => [...prev, botMessage]);
  
      while (true) {
        const { value, done } = await reader?.read() ?? {};
        if (done) break;
  
        botMessage.content += decoder.decode(value, { stream: true });
  
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = botMessage;
          return updatedMessages;
        });
      }
  
      if (currentChatId !== null) {
        await handleUpdate(currentChatId as Id<"conversations">, [
          ...updatedMessages,
          botMessage
        ]);
      }
  
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Error: Unable to fetch response.'
      }]);
    } finally {
      setLoading(false);
      setIsWriting(false);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-screen pb-10 items-center">
      <div data-lenis-prevent className='flex justify-center h-full w-full overflow-auto pt-20'>
        <div className={`flex max-w-[60rem] flex-col h-full rounded overflow-visible padding-x 
        ${(messages.length === 1) ? 'justify-center' : 'justify-start'}`
        }>
          {messages.map((msg, index) => (
            <div key={index} className={`${index === 0 ? 'markdown-content-firstmessage' : 'markdown-content'} ${msg.role === 'user' ? 'markdown-content-user' : 'markdown-content-ai'}`}>
              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>

      <div className="padding-x mt-4 max-w-[60rem] w-[100%]">
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
            className="ml-2 py-2 px-4 bg-secondary-color text-white rounded-full disabled:bg-gray-400"
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
