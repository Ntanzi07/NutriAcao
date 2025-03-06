import { About, Hero, Nutricionista, StartAI } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Nutricionista/>
      <StartAI />
    </main>
  );
}
