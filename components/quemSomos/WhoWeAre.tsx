import React from 'react'
import Image from 'next/image'


const WhoWeAre = () => {
  return (
    <section className='whoweare'>
      <div className='whoweare__hero'>
        <Image src='/teste.jpg' alt='heroPhoto' fill className='object-cover z-[-1] brightness-[.8] grayscale-[.0]' />
        <div className='flex flex-col justify-center lg:items-start items-center text-center lg:h-[70vh] h-[40vh] padding-x'>
          <h1 className='whoweare__title'><b>Quem Nós Somos</b></h1>
        </div>
      </div>
      <div className='whoweare__text'>
        <p className='whoweare__subtitle'>
          <b>
            A NutriAção é uma plataforma focada em promover uma alimentação sauldável de forma acessível e personalizada. Com o suporte de um chat de IA, oferecemos orientações
            nutricionais, planos alimentarese ferramentas para ajudar você a atingir seus objetivos de saúde. Nosso compromisso é tornar a nutrição simples, prática e eficiente para todos.
          </b>
        </p>
      </div>
    </section>
  )
}

export default WhoWeAre