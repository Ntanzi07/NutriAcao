'use client';

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
  const user = useQuery(api.my.get);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Olá Meu nome é Sarah, sua IA nutricionista, estou aqui para te ajudar com qualquer duvida!!",
    }
  ]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(messages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const conversations = useQuery(api.conversations.get);
  const createConversation = useMutation(api.convertation.create);
  const updateMessage = useMutation(api.convertation.update);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  useEffect(() => {
    if (!conversations) return;
    if (!isWriting) {
      const foundConversation = conversations.find(c => c._id === props.chatid);
      const defaultMsg = [{
        role: "system",
        content: "Olá Meu nome é Sarah, sua IA nutricionista, estou aqui para te ajudar com qualquer duvida!!",
      }];
      const newMessages = foundConversation ? foundConversation.messages : defaultMsg;
      setMessages(newMessages);
      setDisplayedMessages(newMessages);
    }
  }, [props.chatid, conversations]);

  const animateWords = async (text: string) => {
    const words = text.split(' ');
    let current = '';

    for (let i = 0; i < words.length; i++) {
      current += (i > 0 ? ' ' : '') + words[i];
      await new Promise(res => setTimeout(res, 100)); // control speed here

      setDisplayedMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', content: current };
        return newMsgs;
      });
    }
  };

  const handleUpdate = async (idchat: Id<"conversations">, newMessages: Message[]) => {
    try {
      await updateMessage({ conversationId: idchat, messages: newMessages });
    } catch (error) {
      console.error("Failed to update messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setDisplayedMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setIsWriting(true);

    let currentChatId = props.chatid;

    try {
      if (currentChatId === null) {
        const firstMessage = updatedMessages[1]?.content || "New Conversation";
        const conversation = await createConversation({
          firstMessage,
          messages: updatedMessages,
        });
        currentChatId = conversation._id;
        router.push(`/chatbot?id=${currentChatId}`);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfos: user, message: updatedMessages }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullMessage = '';

      while (true) {
        const { value, done } = await reader?.read() ?? {};
        if (done) break;
        fullMessage += decoder.decode(value, { stream: true });
      }

      const botMessage = { role: 'assistant', content: fullMessage };
      const newMessageList = [...updatedMessages, botMessage];
      setMessages(newMessageList);
      setDisplayedMessages([...updatedMessages, { role: 'assistant', content: '' }]);
      await animateWords(fullMessage);

      if (currentChatId) {
        await handleUpdate(currentChatId as Id<"conversations">, newMessageList);
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao buscar resposta.' }]);
      setDisplayedMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao buscar resposta.' }]);
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
      <div data-lenis-prevent className='flex flex-col-reverse items-center h-full w-full overflow-auto pt-10'>
        <div className={`flex max-w-[60rem] flex-col-reverse h-max overflow-visible padding-x my-auto
        ${(messages.length === 1) ? 'justify-center' : 'justify-start'}`}>
          {displayedMessages.map((msg, index) => (
            <div
              key={index}
              className={`
                ${index === 0 ? 'markdown-content-firstmessage' : 'markdown-content'}
                ${msg.role === 'user' ? 'markdown-content-user' : 'markdown-content-ai'}
              `}
            >
              <ReactMarkdown
                components={{
                  text: ({ node, children }) => (
                    <span className="inline-block animate-fade">{children}</span>
                  )
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          )).reverse()}
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
