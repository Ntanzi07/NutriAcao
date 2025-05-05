'use client'

import { ArticleItem } from '@/types'
import { motion, useAnimation } from 'framer-motion'
import { useTransitionRouter } from 'next-view-transitions'
import Image from 'next/image'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
    article: ArticleItem
}

const ItemBlog = ({ article }: Props) => {
    const router = useTransitionRouter();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        const y = sessionStorage.getItem('scroll-blog');
        if (y !== null) {
            window.scrollTo(0, parseInt(y));
            sessionStorage.removeItem('scroll-blog');
        }
    }, []);

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    function slideInOut() {
        document.documentElement.animate([
            {
                opacity: 1,
                transform: "translateY(0)",
            },
            {
                opacity: 0,
                transform: "translateY(-35%)",
            }
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        });

        document.documentElement.animate([
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            },
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        });
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
            className='md:w-[55vw] w-[90vw] md:min-w-[35em] flex flex-col gap-3'>

            <a onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem('scroll-blog', window.scrollY.toString()); // ✅ save scroll
                router.push(`/blog/${article.id}`, {
                    onTransitionReady: slideInOut,
                });
            }}
                href={`/blog/${article.id}`}>
                <h2 className='font-STIX sm:text-[3em] text-[8vw]  leading-[1em] md:padding-x hover:text-gray-300'>{article.title}</h2>
            </a>
            <p className='sm:text-[1em] text-[3vw] tracking-widest italic sm:padding-x'>-{article.category}</p>
            <div className='relative w-full'>
                <img src={`${article.img}`} alt={`${article.img}`}  className='w-full md:h-[400px] h-[50vw] object-cover' />
            </div>
        </motion.div>
    );
}

export default ItemBlog