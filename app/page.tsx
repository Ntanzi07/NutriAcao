
import { Footer, Navbar } from "@/components";
import { Hero, About, Nutricionista, StartAI, Equipe } from "@/components/home";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <StartAI />
      <About />
      <Equipe />
      <Nutricionista />
      <Footer />
    </main>
  );
}
