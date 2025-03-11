import React from 'react'
import CardImage from '../CardImage'

const OurValues = () => {
  return (
    <section className='ourvalues'>
      <h1 className='ourvalues__title'>Quem Somos</h1>
      <p className='ourvalues__subtitle'>
        A NutriAção é uma plataforma focada em promover uma alimentação sauldável de forma acessível e personalizada. Com o suporte de um chat de IA, oferecemos orientações
        nutricionais, planos alimentarese ferramentas para ajudar você a atingir seus objetivos de saúde. Nosso compromisso é tornar a nutrição simples, prática e eficiente para todos.
      </p>
      <div className='ourvalues__card-container'>
        <CardImage />
        <CardImage />
        <CardImage />
        <CardImage />
        <CardImage />
      </div>
    </section>
  )
}

export default OurValues