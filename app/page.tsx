
import { Hero, About, Nutricionista, StartAI} from "@/components/home";
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
