
import { Footer, Navbar } from "@/components";
import { Hero, About, Nutricionista, StartAI } from "@/components/home";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Nutricionista />
      <StartAI />
      <Footer />
    </main>
  );
}
