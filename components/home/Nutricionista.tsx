import React from 'react'
import Image from 'next/image'

const Nutricionista = () => {
  return (
    <section className='relative bg-secondary-color z-[-2]'>
      <Image src="/food.jpg" alt='food' fill className='object-cover z-[-1] brightness-[0.5]' />
      <div className=' flex flex-col gap-10 padding-x py-16 z-10'>
        <h1 className='nutri__title'>Seu Nutricionista Virtual <b>24/7</b></h1>
        <div className='flex flex-wrap justify-around gap-10'>
          <div className='nutri__text-container'>
            <h2>Acesso Imediato</h2>
            <p>
              Obtenha respostas instantâneas para suas perguntas sobre nutrição a qualquer hora, em qualquer lugar.
            </p>
          </div>
          <div className='nutri__text-container'>
            <h2>Interativo e Engajador</h2>
            <p>
              Nossa tecnologia de IA simula uma conversa real com um nutricionista, tornando o aprendizado 
              sobre nutrição divertido e acessível.
            </p>
          </div>
          <div className='nutri__text-container'>
            <h2>Suporte Personalizado</h2>
            <p>
              Nosso chat considera suas informações pessoais para oferecer conselhos adaptados,
              ajudando você a tomar decisões alimentares mais informadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nutricionista