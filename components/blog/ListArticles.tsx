import { getSortedArticles } from '@/lib/articles'
import { ItemBlog } from '.'

type Props = {}

const ListArticles = (props: Props) => {
  const articles = getSortedArticles()

  return (
    <div className='text-white w-full my-20 flex'>
      <div className='flex flex-col gap-20 mx-auto'>
        {
          articles !== null && 
          articles.map((article, index) => (
            <ItemBlog key={index} article={article}/>
          ))
        }
      </div>
    </div>
  )
}

export default ListArticles