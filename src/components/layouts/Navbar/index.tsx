"use client"

import Image from 'next/image'
import React, {FC} from 'react'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import MenuAuth from '@/components/organisms/MenuAuth'

interface NavbarProps {}

const Navbar : FC<NavbarProps> = ({}) => {
    const router = useRouter();

    const {data: session} = useSession();

    return (
        <header className='px-32 py-5 flex flex-row items-start justify-between'>
            <div className='inline-flex items-center gap-12'>
                <Link href='/'>
                    <Image
                        src='/images/logo2.png'
                        alt='/images/logo2.png'
                        width={160}
                        height={36}
                    />
                </Link>
                <div>
                    <Link href="/find-jobs" className='font-medium text-gray-400 mr-4 cursor-pointer'>
                        Find Jobs
                    </Link>
                    <Link href="/find-companies" className='font-medium text-gray-400 cursor-pointer'>
                        Browse Companies
                    </Link>
                </div>
            </div>
            <div className='inline-flex items-center gap-4 h-8'>
                {session ? (
                    <MenuAuth/>
                ) : (
                    <>
                        <Button variant='link' onClick={() => router.push('/signin')}>Login</Button>
                        <Button>Sign Up</Button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Navbar