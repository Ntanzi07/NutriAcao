'use client'

import React, { useEffect } from 'react'
import Cards from '../Cards'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Equipe = () => {
  const text = "Nossa Equipe:";
  const words = text.split(' '); // Split the sentence into words

  // Refs for H2 and image
  const [refH2, inViewH2] = useInView({ threshold: 0.5, triggerOnce: true });

  // Separate animation controls
  const controlsH2 = useAnimation();

  // Trigger animations
  useEffect(() => {
    if (inViewH2) controlsH2.start("visible");
  }, [inViewH2]);

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

  return (
    <section className='equipe'>
      <motion.h2
        ref={refH2}
        variants={container}
        initial="hidden"
        animate={controlsH2} // useAnimation trigger here
        className="equipe__text"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordAnimation} // ONLY variants here
            className="inline-block mr-5 leading-[1em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      <div className='equipe__card-container'>
        <div className="break-inside-avoid my-auto">
          <Cards name="Amanda Silva" path="Amanda.jpg" delay={0} style="object-[50%_70%]" />
        </div>
        <div className="break-inside-avoid my-auto">
          <Cards name="João Pedro" path="Joao.jpg" delay={0} style="object-[0%_75%]" />
        </div>
        <div className="break-inside-avoid my-auto">
          <Cards name="Leonardo Godinho" path="Leo.jpg" delay={0} style="object-[0%_60%]" />
        </div>
        <div className="break-inside-avoid my-auto">
          <Cards name="Marisol Marques" path="Marisol.jpg" delay={0} style="object-[0%_10%]" />
        </div>
        <div className="break-inside-avoid my-auto">
          <Cards name="Nathan Tanzi" path="Nathan.jpg" delay={0} style="object-[0%_30%] backdrop-contrast-[.9] saturate-[1.3]" />
        </div></div>
    </section>
  )
}

export default Equipe