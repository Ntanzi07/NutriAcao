import React from 'react'
import Image from 'next/image'

const Nutricionista = () => {
  return (
    <section className='relative bg-secondary-color z-[-2]'>
      <Image src="/food.jpg" alt='food' fill className='object-cover z-[-1] brightness-[0.5]' />
      <div className=' flex flex-col gap-10 padding-x py-16 z-10'>
        <h1 className='nutri__title'>Sobre o <b>NutriAção</b></h1>
        <div className='flex flex-wrap justify-around gap-10'>
          <div className='nutri__text-container'>
            <h2>Personalização Excepcional</h2>
            <p>
              Nossa abordagem Personalizada adapta planos de nutrição às necessidades especificas de cada usuário
              , utilizando dados detalhados para oferecer soluções verdadeiramente individualizadas.
            </p>
          </div>
          <div className='nutri__text-container'>
            <h2>Tecnologia e Humanização</h2>
            <p>
              Combinamos tecnologia avançada e expertise humana para proporcionar suporte personalizado,
              otimizando a saúde de nossos usuários com uma experiência rica e acolhedora.
            </p>
          </div>
          <div className='nutri__text-container'>
            <h2>Inovação e Excelência</h2>
            <p>
              Lideramos o setor de nutrição com inovação contínuas e excelência no atendimento ao cliente,
              sempre estabelecendo novos padrões de qualidade e eficácia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nutricionista