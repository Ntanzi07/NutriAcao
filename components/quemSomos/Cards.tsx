import React from 'react'
import Image from 'next/image'
import { CustomCardProps } from '@/types'

const cards = ({ name, style, path }: CustomCardProps) => {
  return (
    <div className='card'>
      <div className='card__image-container'>
        <Image src={`/devs/${path}`} alt="Imagem dev" fill className={`object-cover ${style}`} />
      </div>
      <div className='card__text-container'>
        <h1 className='card__name'>{name}</h1>
      </div>
    </div>
  )
}

export default cards