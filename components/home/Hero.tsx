'use client'

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee"
import Image from 'next/image'

const Hero = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="hero">
      <motion.div
        className="hero__text-container"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="hero__title"
          variants={fadeLeft}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Nutri
        </motion.h1>
        <motion.h1
          className="hero__title"
          variants={fadeLeft}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Ação
        </motion.h1>
      </motion.div>
      <div className='absolute w-[40em] z-[-1] h-[90%] bottom-0  rounded-3xl'>
        <Image src={`/orange_2.jpg`} alt={`orange`} fill className='object-cover' />
      </div>

      <div className="MarqueeHero">
        <Marquee className="hero__subtitle">
          Descubra um novo você com NutriAção
        </Marquee>
      </div>

    </div>
  )
}

export default Hero