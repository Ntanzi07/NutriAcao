import React from 'react'
import Cards from './Cards'

const Equipe = () => {
  return (
    <section className='equipe'>
      <h2 className='equipe__text'><b>Nossa Equipe: </b></h2>
      <div className='equipe__card-container'>
        <Cards name="Amanda Silva" path="Amanda.jpg" style="object-[0%_70%]" />
        <Cards name="João Pedro" path="Joao.jpg" style="object-[0%_75%]"/>
        <Cards name="Leonardo Godinho" path="Leo.jpg" style="object-[0%_60%]" />
        <Cards name="Marisol Marques" path="Marisol.jpg" style="object-[0%_10%] " />
        <Cards name="Nathan Tanzi" path="Nathan.jpg" style="object-[0%_30%] backdrop-contrast-[.9] saturate-[1.3]" />
      </div>
    </section>
  )
}

export default Equipe