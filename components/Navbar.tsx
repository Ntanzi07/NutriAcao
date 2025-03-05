import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='w-full lg:absolute relative z-10 '>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Nutriação logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <div className='flex flex-row gap-1'>
          <CustomButton title='Quem somos' btnType="button" containerStyles='header__button'/>
          <CustomButton title='Calculadora TMB' btnType="button" containerStyles='header__button'/>
          <CustomButton title='Chat Bot' btnType="button" containerStyles='header__button'/>
          <CustomButton title='Blog' btnType="button" containerStyles='header__button'/>
          <CustomButton title='sing in' btnType="button" containerStyles='header__button-login'/>
        </div>
      </nav>
    </header>
  )
}

export default Navbar