import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

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
          <SignedOut>
            <SignInButton forceRedirectUrl="/chatbot">
              <button className='header__button-login'>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignInButton forceRedirectUrl="/chatbot">
              <button className='header__button-login'>Seu Chat</button>
            </SignInButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Navbar