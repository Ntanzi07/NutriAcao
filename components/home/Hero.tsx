'use client'

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee"
import Image from 'next/image'

const Hero = () => {
  const fadebot = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
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
          variants={fade}
          transition={{ delay: 0.1, duration: 1 }}
        >
          Nutri
        </motion.h1>
        <motion.h1
          className="hero__title"
          variants={fade}
          transition={{ delay: 0.1, duration: 1 }}
        >
          Ação
        </motion.h1>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadebot}
        transition={{ delay: 0.1, duration: 1 }}
        className='hero__imgContent'>
        <Image src={`/orange_2.jpg`} alt={`orange`} fill className='object-cover' />
      </motion.div>

      <div className="MarqueeHero">
        <Marquee className="hero__subtitle">
          Descubra um novo você com NutriAção
        </Marquee>
      </div>

    </div>
  )
}

export default Hero