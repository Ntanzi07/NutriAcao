import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <header className='w-full fixed top-0 left-0 z-10'>
      <nav className='relative max-w-[1440px] mx-auto bg-primary-bg flex justify-between items-center sm:px-16 px-6 py-1 mt-2 rounded-full'>
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="Nutriação logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </Link>
        <div className='relative flex flex-row gap-2 z-[1] items-center'>
          <SignInButton forceRedirectUrl="/chatbot">
            <button className='header__button-login'>Sign in</button>
          </SignInButton>
        </div>
      </nav>
    </header>
  )
}

export default Navbar