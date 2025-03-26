
import { Footer, Navbar } from "@/components";
import { Hero, About, Nutricionista, StartAI } from "@/components/home";

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
