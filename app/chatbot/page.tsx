import { Chat } from "@/components/chatbot";
import ConvexClientProvider from "@/providers/ConvexClientProvider";

export default function ChatBot() {
  return (
    <ConvexClientProvider>
      <main className="overflow-hidden">
        <Chat />
      </main>
    </ConvexClientProvider>
  );
}