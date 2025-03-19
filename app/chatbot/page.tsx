'use client'

import { Chat } from "@/components/chatbot";
import ChatOptions from "@/components/chatbot/ChatOptions";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatBot() {
  const id = useSearchParams().get("userid");
  const [activedOptions, setActivedOptions] = useState(false);

  function changeOption() {
    setActivedOptions(!activedOptions);
  }

  return (
    <ConvexClientProvider>
      <main className="flex overflow-hidden">
        <button className={`absolute top-5 left-5 
          ${activedOptions
            ? 'hidden rotate-180'
            : 'rotate-0 '}`
        } onClick={() => setActivedOptions(!activedOptions)}>
          <svg width="60" height="60" className="fill-secondary-color" viewBox="0 0 128 128">
            <path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z" />
          </svg>
        </button>
        <ChatOptions activedOptions={activedOptions} setOptions={changeOption} />
        <Chat chatid={id} />
      </main>
    </ConvexClientProvider>
  );
}