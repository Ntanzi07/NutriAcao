'use client'

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

const About = () => {
  const text = "Sua própria nutricionista IA";
  const words = text.split(' ');

  const [refH2, inViewH2] = useInView({ threshold: 0.5, triggerOnce: true });
  const [refText, inViewText] = useInView({ threshold: 0.3, triggerOnce: true });
  const [refVideo, inViewVideo] = useInView({ threshold: 0.4, triggerOnce: true });

  const controlsH2 = useAnimation();
  const controlsText = useAnimation();
  const controlsVideo = useAnimation();

  useEffect(() => {
    if (inViewH2) controlsH2.start("visible");
    if (inViewText) controlsText.start("visible");
    if (inViewVideo) controlsVideo.start("visible");
  }, [inViewH2, inViewText, inViewVideo]);

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

  const appear = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const appearLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className='about'>
      <motion.h2
        ref={refH2}
        variants={container}
        initial="hidden"
        animate={controlsH2} // useAnimation trigger here
        className="about__title"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordAnimation} // ONLY variants here
            className="inline-block mr-14"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      <div className='about__text-container'>
        <motion.p
          ref={refText}
          variants={appear}
          transition={{ delay: 0.1, duration: 0.6 }}
          initial="hidden"
          animate={controlsText} // useAnimation trigger here
        >
          Nossa abordagem Personalizada adapta planos de nutrição às necessidades especificas de cada usuário
          , utilizando dados detalhados para oferecer soluções verdadeiramente individualizadas.
        </motion.p>
        <motion.p
          ref={refText}
          variants={appear}
          transition={{ delay: 0.25, duration: 0.6 }}
          initial="hidden"
          animate={controlsText} // useAnimation trigger here
        >
          Combinamos tecnologia avançada e expertise humana para proporcionar suporte personalizado,
          otimizando a saúde de nossos usuários com uma experiência rica e acolhedora.
          <br />
        </motion.p>
        <motion.p
          ref={refText}
          variants={appear}
          transition={{ delay: 0.5, duration: 0.6 }}
          initial="hidden"
          animate={controlsText} // useAnimation trigger here
        >
          Lideramos o setor de nutrição com inovação contínuas e excelência no atendimento ao cliente,
          sempre estabelecendo novos padrões de qualidade e eficácia.
        </motion.p>
      </div>
      <motion.div
        ref={refVideo}
        variants={appearLeft}
        transition={{ duration: 0.6 }}
        initial="hidden"
        animate={controlsVideo} // useAnimation trigger here
        className="about__video-container">
        <video src={require('../../public/videos/heroVideo.mp4')}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          loop
          className="about__video" />
        <div className="about_noiseFilter" />
        <h2 className="about_video-text">Do seu Jeito.</h2>
      </motion.div>
    </section>
  )
}

export default About