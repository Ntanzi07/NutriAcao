'use client'

import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'

const Footer = () => {
  return (
    <div className='bg-secondary-color py-10 items-center flex flex-col padding-x'>
      <div className='flex flex-row justify-between items-center w-full gap-5 md:flex-nowrap flex-wrap'>
        <Image
          src="/logo.svg"
          alt="Nutriação logo"
          width={118}
          height={18}
          className="object-contain"
        />
        <p className='footer__text'>Assine agora a newsletter e receba todas as novidades por e-mail</p>
        <form className='flex flex-row gap-3'>
          <div className='relative text-primary-bg'>
            <input type="email" id="email" name="email" className='footer__input' />
            <label htmlFor='email' className='footer__label'>Email</label>
          </div>
          <CustomButton title='Enviar' btnType="submit" containerStyles='footer__button-email' />
        </form>
      </div>
      <hr className='h-[2px] rounded-sm my-8 w-full bg-primary-green border-0' />
      <div className='flex justify-start w-full text-primary-bg gap-10'>
        <div>
          <h2 className=''>Email</h2>
          <p>nutriacao@gmail.com</p>
        </div>
        <div>
          <h2>Social</h2>

        </div>
      </div>
    </div>
  )
}

export default Footer