'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { CustomCardProps } from '@/types'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = ({ name, style, path, delay }: CustomCardProps) => {

  const [refImg, inViewImg] = useInView({ threshold: 0.3, triggerOnce: true });
  const [refText, inViewText] = useInView({ threshold: 0.2, triggerOnce: true });

  const controlsImg = useAnimation();
  const controlsText = useAnimation();

  useEffect(() => {
    if (inViewImg) controlsImg.start("visible");
    if (inViewText) controlsText.start("visible");
  }, [inViewImg, inViewText]);

  const appearBot = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const appear = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className='card'>
      <div className='card__text-container'>
        <motion.h2
          ref={refText}
          variants={appear}
          transition={{ delay: delay, duration: 0.6 }}
          initial="hidden"
          animate={controlsText}
          className='card__name'>
          {name}
        </motion.h2>
      </div>
      <motion.div
        ref={refImg}
        variants={appearBot}
        transition={{ delay: delay, duration: 1 }}
        initial="hidden"
        animate={controlsImg}
        className='card__image-container noise'>
        <Image src={`/devs/${path}`} alt="Imagem dev" width={300} height={300} className={`object-cover ${style}`} />
      </motion.div>
    </div>
  )
}

export default cards