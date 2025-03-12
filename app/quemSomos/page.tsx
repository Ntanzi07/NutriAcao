import Image from "next/image";
import { OurValues, Vision, WhoWeAre, Equipe} from "@/components/quemSomos";

export default function quemSomos() {
  return (
    <main className="overflow-hidden">
      <WhoWeAre />
      <Equipe />
      <Vision />
      <OurValues />
    </main>
  );
}