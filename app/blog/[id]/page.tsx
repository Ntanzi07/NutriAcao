
// ✅ Tell Next.js this is a dynamic route (important if using dynamic data)
export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import ArticleBlog from "./ArticleBlog"
import { getArticleData, getSortedArticles } from "@/lib/articles"

  
  export async function generateMetadata(
    { params }: { params: { id: string } }
  ): Promise<Metadata> {
    const { id } = await params
    const article = await getArticleData(id);
    return {
      title: article.title,
    };
  }
  
const Article = async ({ params }: { params: { id: string } }) => {

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
  };
  
  export default Article;