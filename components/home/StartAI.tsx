'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { SignInButton } from '@clerk/nextjs'
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion'

const StartAI = () => {
  const text = "Comece agora mesmo com NutriAção.";
  const words = text.split(' '); // Split the sentence into words

  // Refs for H2 and image
  const [refH2, inViewH2] = useInView({ threshold: 0.5, triggerOnce: true });
  const [refImg, inViewImg] = useInView({ threshold: 0.2, triggerOnce: true });
  const [refButton, inViewButton] = useInView({ threshold: 0.2, triggerOnce: true });

  // Separate animation controls
  const controlsH2 = useAnimation();
  const controlsImg = useAnimation();
  const controlsButton = useAnimation();

  // Trigger animations
  useEffect(() => {
    if (inViewH2) controlsH2.start("visible");
    if (inViewImg) controlsImg.start("visible");
    if (inViewButton) controlsButton.start("visible");
  }, [inViewH2, inViewImg, inViewButton]);

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

  const appearImg = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const appearButton = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <section className='padding-x'>
      <div className='Ai__TextContainer'>
        <motion.h2
          ref={refH2}
          variants={container}
          initial="hidden"
          animate={controlsH2} // useAnimation trigger here
          className="Ai__text"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordAnimation} // ONLY variants here
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <SignInButton forceRedirectUrl="/chatbot">
          <motion.button 
          ref={refButton}
          initial="hidden"
          animate={controlsImg}
          variants={appearButton}
          className='Ai__button'>Testar IA</motion.button>
        </SignInButton>
      </div>
      <motion.div
        ref={refImg}
        initial="hidden"
        animate={controlsImg}
        variants={appearImg}
        className='relative h-[50vh]'>
        <div className='Ai__ImageContainer'>
          <Image src="/orange2.jpg" alt='esporte3' fill className='Ai__Image object-cover' />
        </div>
      </motion.div >
    </section>
  )
}

export default StartAI