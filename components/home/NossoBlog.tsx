import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleItem } from '@/types'


type Props = {
    articles: ArticleItem[]
}

const NossoBlog = ({ articles }: Props) => {
    return (
        <div className='text-white padding-x flex flex-col gap-5'>
            <h2 className='lg:text-[5em] text-[3.5em] font-Poppins leading-[1em] font-semibold uppercase'>Conheca nosso blog</h2>
            <div className='blogHome__itensContent gap-10 sm:px-0'>
                {
                    articles.map((item, index) => (
                        <div key={index} className='break-inside-avoid flex flex-col gap-2 mb-5'>
                            <div className='relative rounded-3xl'>
                                <Image src={`/${item.img}`} alt={`${item.img}`} height={500} width={1000} className='object-cover' />
                            </div>
                            <Link href={`/blog/${item.id}`} className="flex justify-center items-center pt-3">
                                <h2 className='text-[1.8em] leading-[1.2em] font-STIX hover:text-gray-400'>{item.title}</h2>
                            </Link>
                            <div className='flex justify-between gap-2 items-center text-[1em]'>
                                <p className='tracking-[.15em] italic'>-{item.category}</p>
                                <p className='italic'>{item.date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Link href="/blog" className="flex w-fit mx-auto px-3 py-2 justify-center items-center ">
                <button className='text-[1.3em] hover:text-gray-400'>ver mais</button>
            </Link>
        </div>
    )
}

export default NossoBlog