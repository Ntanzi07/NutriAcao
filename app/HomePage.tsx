'use client'

import { Footer, Navbar } from "@/components";
import { Hero, About, Nutricionista, StartAI, NossoBlog } from "@/components/home";
import { ArticleItem } from "@/types";

type Props = {
    articles: ArticleItem[]
}

const HomePage = (props: Props) => {
    return (
        <section className="">
            <Navbar />
            <Hero />
            <StartAI />
            <About />
            <NossoBlog articles={props.articles}/>
            <Nutricionista />
            <Footer />
        </section>
    )
}

export default HomePage