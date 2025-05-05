
import ArticleBlog from "./ArticleBlog";
import { getArticleData } from "@/lib/articles";

export default async function Article({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const articleData = await getArticleData(id);

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
  );
}