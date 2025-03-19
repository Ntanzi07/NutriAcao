'use client'

import { Chat } from "@/components/chatbot";
import ChatOptions from "@/components/chatbot/ChatOptions";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { useSearchParams } from "next/navigation";

export default function ChatBot() {
  const id = useSearchParams().get("userid");

  return (
    <ConvexClientProvider>
      <main className="flex overflow-hidden">
        <ChatOptions />
        <Chat chatid={id}/>
      </main>
    </ConvexClientProvider>
  );
}