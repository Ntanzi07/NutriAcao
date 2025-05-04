'use client'

import { Footer, Navbar } from "@/components";
import { Hero, About, Nutricionista, StartAI, Equipe, NossoBlog } from "@/components/home";
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
            <Equipe />
            <Nutricionista />
            <Footer />
        </section>
    )
}

export default HomePage