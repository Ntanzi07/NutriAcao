'use client'

import { ArticleItem } from '@/types'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
    article: ArticleItem
}

const ItemBlog = ({ article }: Props) => {

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // animate only once
        threshold: 0.2,    // 20% of the element must be visible
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
            className='w-[55vw] min-w-[35em] flex flex-col gap-3'>
            <Link href={`/blog/${article.id}`} className={`flex`}>
                <h2 className='font-STIX text-[3em] leading-[1em] padding-x hover:text-gray-300'>{article.title}</h2>
            </Link>
            <p className='text-[1em] tracking-widest italic padding-x'>-{article.category}</p>
            <div className='relative w-full h-[400px] rounded-3xl'>
                <Image src={`/${article.img}`} alt={`${article.img}`} fill className='object-cover' />
            </div>
        </motion.div>
    )
}

export default ItemBlog