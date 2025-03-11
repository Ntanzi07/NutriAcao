import React from 'react'
import Image from 'next/image'

const CardImage = () => {
  return (
    <div className='cardimage'>
      <Image src="https://avatars.githubusercontent.com/u/138806744?v=4" alt="photo" fill />
      <div className='cardimage__text-container'>
        <h1 className='cardimage__title'>nome</h1>
        <div className='cardimage__social-media-container'>

        </div>
      </div>
    </div>
  )
}

export default CardImage