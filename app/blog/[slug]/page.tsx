import ArticleBlog from "./ArticleBlog"
import { getArticleData } from "@/lib/articles"

type Props = {}

const Article = async ({ params }: { params: { slug: string } }) => {
    const articleData = await getArticleData(params.slug);

    return (
        <section>
            <ArticleBlog
                id={articleData.id}
                contentHtml={articleData.contentHtml}
                title={articleData.title}
                date={articleData.date}
                category={articleData.category}
                img={articleData.img}
            />
        </section>
    )

}

export default Article