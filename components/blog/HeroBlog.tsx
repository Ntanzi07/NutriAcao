import React from 'react'
import Image from 'next/image'

type Props = {}

const HeroBlog = (props: Props) => {
  return (
    <div className='relative'>
      <div className="flex items-center justify-center padding-x h-[50vh] ">
        <Image src="/blog.jpg" alt='blogImg' fill className='relative object-cover' />
        <h2 className="relative text-center text-white text-[10em] tracking-widest">Our <i>Blog.</i></h2>
      </div>
    </div>
  )
}

export default HeroBlog