import { Navbar } from "@/components";
import HeroBlog from "@/components/blog/HeroBlog";
import ListArticles from "@/components/blog/ListArticles";

export default function Home() {

  return (
    <main className="overflow-hidden text-white">
      <Navbar />
      <HeroBlog />
      <ListArticles />
    </main>
  );
}
