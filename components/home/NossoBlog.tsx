import React, { useEffect } from 'react'
import Link from 'next/link'
import { ArticleItem } from '@/types'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


type Props = {
    articles: ArticleItem[]
}

const NossoBlog = ({ articles }: Props) => {
    const text = "Conheca nosso blog.";
    const words = text.split(' ');

    const [refH2, inViewH2] = useInView({ threshold: 0.5, triggerOnce: true });
    const [refImg, inViewImg] = useInView({ threshold: 0.2, triggerOnce: true });

    const controlsH2 = useAnimation();
    const controlsImg = useAnimation();

    useEffect(() => {
        if (inViewH2) controlsH2.start("visible");
        if (inViewImg) controlsImg.start("visible");
    }, [inViewH2, inViewImg]);

    const wordAnimation = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Delay between each word
            },
        },
    };

    const disappearRight = {
        hidden: {
            x: 0
        },
        visible: {
            x: "100%"
        },
    }

    const appear = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <div className='text-white padding-x flex flex-col gap-5'>
            <motion.h2
                ref={refH2}
                variants={container}
                initial="hidden"
                animate={controlsH2}
                className="lg:text-[5em] text-[3.5em] font-Poppins leading-[1em] font-semibold uppercase overflow-hidden"
            >
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={wordAnimation}
                        className="inline-block mr-5 leading-[1em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h2>
            <div ref={refImg} className='blogHome__itensContent gap-10 sm:px-0'>
                {
                    articles.map((item, index) => (
                        <Link key={index} href={`/blog/${item.id}`} className="">
                            <motion.div
                                className='break-inside-avoid flex flex-col gap-2 mb-5'>
                                <div className='relative overflow-hidden'>
                                    <img src={`${item.img}`} alt={`${item.img}`} className='relative object-fill' />
                                    <motion.div
                                        variants={disappearRight}
                                        transition={{ delay: .5, duration: 1.5 }}
                                        initial="hidden"
                                        animate={controlsImg}
                                        className='absolute h-full w-full bg-primary-bg top-0 right-0'
                                    />
                                </div>
                                <motion.div
                                    variants={appear}
                                    transition={{ delay: .5, duration: 1 }}
                                    initial="hidden"
                                    animate={controlsImg}
                                    className='flex flex-col gap-2'>
                                    <h2 className='text-[1.8em] leading-[1.2em] font-STIX hover:text-gray-400 mt-2'>{item.title}</h2>
                                    <div className='flex justify-between gap-2 text-[1em]'>
                                        <p className='tracking-[.15em] italic'>-{item.category}</p>
                                        <p className='italic flex-1 text-right'>{item.date}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
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