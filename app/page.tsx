import { getSortedArticles } from "@/lib/articles";
import HomePage from "./HomePage";

export default function Home() {
  const articles = getSortedArticles().slice(0,4);
  
  return (
    <main className="overflow-hidden">
      <HomePage articles={articles}/>
    </main>
  );
}
