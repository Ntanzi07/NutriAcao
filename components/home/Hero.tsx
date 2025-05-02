'use client'

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee"

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
            className="hero__title text-secondary-color italic tracking-widest text-[13em]"
            variants={fadeLeft}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            NutriAção
          </motion.h1>

          <motion.h2
            className="hero__title text-primary-green pl-10 italic tracking-[.2em] font-semibold text-[17em] z-[1]"
            variants={fadeLeft}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            NutriAção
          </motion.h2>

          <motion.h2
            className="hero__title text-primary-color pl-[4rem] italic tracking-widest text-[13em] z-0"
            variants={fadeLeft}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            NutriAção
          </motion.h2>
        </motion.div>
        <div className="MarqueeHero">
          <Marquee className="hero__subtitle">
            Descubra um novo você com NutriAção
          </Marquee>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.6 }}
          className="hero__video-container">

          <video src={require('../../public/videos/gradienteVideo1.mp4')}
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            loop
            className="hero__video" />

          <div
            className="noiseFilter"
          />
        </motion.div>
      </div>
  )
}

export default Hero