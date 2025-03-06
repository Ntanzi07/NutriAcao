'use client'

import React from 'react'
import CustomButton from '../CustomButton'

const StartAI = () => {
  return (
    <section className=''>
      <div className='flex flex-col justify-center items-center text-center h-[70vh] gap-5 text-primary-green padding-x'>
        <h1 className='text-[2.5em]'><b>Alcance seus Objetivos de Saúde Hoje</b></h1>
        <p> Comece agora com um plano nutricional personalizado para você!!</p>
        <CustomButton
          title="Testar IA"
          containerStyles="bg-secondary-color text-white mt-10 py-3 px-7"
          handleClick={() => { }}
        />
      </div>
    </section>
  )
}

export default StartAI