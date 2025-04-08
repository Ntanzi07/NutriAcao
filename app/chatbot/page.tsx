'use client'

import { Chat } from "@/components/chatbot";
import ChatOptions from "@/components/chatbot/ChatOptions";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatBot() {
  const [activedOptions, setActivedOptions] = useState(true);

  const id = useSearchParams().get("id");

  function changeOption() {
    setActivedOptions(!activedOptions);
  }

  return (
    <ConvexClientProvider>
      <main className="flex items-start overflow-hidden">
        <ChatOptions chatid={id} activedOptions={activedOptions} setOptions={changeOption} />
        <div className='flex items-center px-3 padding-y'>
          <button className={` bg-primary-bg rounded-full
            ${activedOptions
              ? 'hidden rotate-180'
              : 'rotate-0 '}`
          } onClick={() => setActivedOptions(!activedOptions)}>
            <svg width="60" height="60" className="fill-secondary-color" viewBox="0 0 128 128">
              <path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z" />
            </svg>
          </button>
        </div>
        <Chat chatid={id}/>
      </main>
    </ConvexClientProvider>
  );
}