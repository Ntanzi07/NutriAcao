import React from 'react'
import Image from 'next/image'

type Props = {}

const HeroBlog = (props: Props) => {
  return (
    <div className="relative mt-[3em] h-[65vh]">
      <Image src="/blog.jpg" alt="blog" fill className="object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-center text-white text-[10em] tracking-widest">Our <i>Blog.</i></h2>
      </div>
    </div>
  )
}

export default HeroBlog