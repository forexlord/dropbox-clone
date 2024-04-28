import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import dropboxImage from '../public/dropbox-logo.png'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggler } from './ThemeToggler'

function Header() {
  return (
    <header className='flex justify-between items-center'>
       <Link href='/' className='flex items-center space-x-2'>
        <div className='bg-[#0160fe] w-fit'>
            <Image
            src={dropboxImage}
            alt='dropbox-log'
            className='invert'
            width={40}
            height={40}
            />
        </div>
        <h1 className='text-[15px] text-black dark:text-white font-bold'>Reedzdrop-Box clone</h1>
       </Link>
       <div className='px-5 flex space-x-2 items-center'>
       <ThemeToggler/>
        <UserButton afterSignOutUrl='/'/>
        <SignedOut> 
            <SignInButton fallbackRedirectUrl='/' mode='modal'/>
        </SignedOut>
       </div>
    </header>
  )
}

export default Header