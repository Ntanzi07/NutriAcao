'use client'

import { Navbar } from "@/components";
import HeroBlog from "@/components/blog/HeroBlog";
import ListArticles from "@/components/blog/ListArticles";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const id = useSearchParams().get("id");

  return (
    <main className="overflow-hidden text-white">
      <Navbar />
      <HeroBlog />
      { id ? <p > hey </p> : <ListArticles /> }
    </main>
  );
}
