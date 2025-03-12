import Image from 'next/image'
import React from 'react'
import OurValuesIten from './OurValuesIten'

const OurValues = () => {
  return (
    <section className='ourvalues'>
      <div className='ourvalues__text-container'>
        <h2 className='ourvalues__title'>Nossos <b>Valores</b></h2>
        <OurValuesIten text='Integridade' />
        <OurValuesIten text='Inclusão' />
        <OurValuesIten text='Inovação' />
        <OurValuesIten text='Compaixão' />
      </div>
      <div className='ourvalues__image-container'>
        <Image src="/nossosValores.jpg" alt="nossosValores" fill className='object-cover' />
      </div>
    </section>
  )
}

export default OurValues