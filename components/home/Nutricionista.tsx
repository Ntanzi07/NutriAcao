'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { SignInButton } from '@clerk/nextjs'
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const Nutricionista = () => {
  const text = "Seus objetivos na saúde agora mesmo.";
  const words = text.split(' ');

  const [refH2, inViewH2] = useInView({ threshold: 0.5, triggerOnce: true });
  const [refImg, inViewImg] = useInView({ threshold: 0.2, triggerOnce: true });
  const [refButtom, inViewButtom] = useInView({ threshold: 0.2, triggerOnce: true });

  const controlsH2 = useAnimation();
  const controlsImg = useAnimation();
  const controlsButtom = useAnimation();

  useEffect(() => {
    if (inViewH2) controlsH2.start("visible");
    if (inViewImg) controlsImg.start("visible");
    if (inViewButtom) controlsButtom.start("visible");
  }, [inViewH2, inViewImg, inViewButtom]);

  const wordAnimation = {
    hidden: { opacity: 0, y: -20 },
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

  const appearBot = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const appear = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className='padding-x py-10 flex xl:flex-row flex-col gap-10 xl:h-screen h-[50vh] xl:bg-primary-bg bg-userText-bg'>
      <div className='nutri__images-container'>
        <motion.div
          ref={refImg}
          variants={appearBot}
          transition={{ delay: 0, duration: 1 }}
          initial="hidden"
          animate={controlsImg}
          className='relative w-full [grid-area:f1]'>
          <Image src="/esporte1.jpg" alt='esporte1' fill className='nutri__images' />
          <div className='noiseFull' />
        </motion.div>
        <motion.div
          ref={refImg}
          variants={appearBot}
          transition={{ delay: .25, duration: 1 }}
          initial="hidden"
          animate={controlsImg}
          className='relative [grid-area:f2]'>
          <Image src="/esporte2.jpg" alt='esporte2' fill className='nutri__images' />
          <div className='noiseFull' />
        </motion.div>
        <motion.div
          ref={refImg}
          variants={appearBot}
          transition={{ delay: .5, duration: 1 }}
          initial="hidden"
          animate={controlsImg}
          className='relative [grid-area:f3]'>
          <Image src="/esporte3.jpg" alt='esporte3' fill className='nutri__images' />
          <div className='noiseFull' />
        </motion.div>
      </div >
      <div className='flex-[1.5] flex flex-col justify-center items-center gap-7'>
        <motion.h2
          ref={refH2}
          variants={container}
          initial="hidden"
          animate={controlsH2} // useAnimation trigger here
          className="nutri__text"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordAnimation} // ONLY variants here
              className="inline-block leading-[1em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <SignInButton forceRedirectUrl="/chatbot">
          <motion.button
            ref={refButtom}
            variants={appear}
            transition={{ delay: 0, duration: 1 }}
            initial="hidden"
            animate={controlsButtom}
            className='nutri__button'>
            Testar IA
          </motion.button>
        </SignInButton>
      </div>
    </section>
  )
}

export default Nutricionista