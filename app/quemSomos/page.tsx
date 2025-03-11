import Image from "next/image";
import { OurValues, Vision, WhoWeAre } from "@/components/quemSomos";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <OurValues />
      <Vision />
      <WhoWeAre />
    </main>
  );
}