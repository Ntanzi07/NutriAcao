'use server'

import Image from 'next/image'
import { getArticleData } from "@/lib/articles"

const ArticleBlog = async ({ params }: { params: { slug: string } }) => {
    const articleData = await getArticleData(params.slug);

    return (
        <div>
            <div className='relative w-full h-[400px] rounded-3xl'>
                <Image src={`/${articleData.img}`} alt={`${articleData.img}`} fill className='object-cover' />
            </div>
        </div>
    )
}

export default ArticleBlog