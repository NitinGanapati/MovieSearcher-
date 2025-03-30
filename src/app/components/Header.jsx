import React from 'react'
import Link from 'next/link'
import DarkMode from './DarkMode'
import { SignedIn, SignedOut, SignInButton,UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto bg-white text-black'>
        <ul className='flex gap-4'>
            <SignInButton>
                <UserButton/>
            </SignInButton>
            <SignedOut>
                     <Link href={'/sign-in'}>Sign In</Link>
            </SignedOut>
            <li className='hidden sm:block'>
                <Link href={'/'}>Home</Link>
            </li>
            <li>
                <Link href={'/about'}>About</Link>
            </li>
            

        </ul>
        <div className='flex items-center gap-4'>
            <DarkMode/>
       
        <Link href={'/'} className='flex-gap-1 items-center'>
        <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg mr-2'>
                Nitin
            </span>
            <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg'>Ganapati</span>
            </Link>
            </div>
    </div>
  )
}
