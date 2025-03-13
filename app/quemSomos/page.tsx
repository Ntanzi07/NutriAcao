import Image from "next/image";
import { OurValues, Vision, WhoWeAre, Equipe } from "@/components/quemSomos";
import { Footer, Navbar } from "@/components";

export default function quemSomos() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <WhoWeAre />
      <Equipe />
      <Vision />
      <OurValues />
      <Footer />
    </main>
  );
}