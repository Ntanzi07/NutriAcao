import React from 'react'
import Image from 'next/image'
import { OurValuesItenProps } from '@/types'

const OurValuesIten = ({ text }: OurValuesItenProps) => {
  return (
    <span className='ourvalues__item'>
      <Image src="/icons/start-icon.png" alt="star" width={25} height={25} className='object-contain' />
      {text}
    </span>
  )
}

export default OurValuesIten