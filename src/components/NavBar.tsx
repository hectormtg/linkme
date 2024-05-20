'use client'

import { userAtom } from '@/store/user.store'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, SVGProps } from 'react'
import { twMerge } from 'tailwind-merge'
import LinkIcon from '../../public/icons/LinkIcon'
import MainLogoSm from '../../public/icons/MainLogoSm'
import PreviewIcon from '../../public/icons/PreviewIcon'
import ProfileImageIcon from '../../public/icons/ProfileImageIcon'
import Button from './Button'

interface Options {
  text: string
  icon: FC<SVGProps<SVGSVGElement>>
  pathname: string
}

const OPTIONS: Array<Options> = [
  { text: 'Links', icon: LinkIcon, pathname: '/' },
  { text: 'Profile details', icon: ProfileImageIcon, pathname: '/profile' },
]

const NavBar = () => {
  const pathname = usePathname()

  const user = useAtomValue(userAtom)

  return (
    <nav className='bg-white rounded-xl p-4 flex justify-between'>
      <div className='flex gap-1 items-center font-bold w-[15%] justify-start'>
        <MainLogoSm />
        <h1 className='hidden md:inline'>
          Link<span>me</span>
        </h1>
      </div>

      <div className='flex items-center gap-1 w-[70%] justify-center'>
        {OPTIONS.map((option, index) => (
          <Link
            key={index}
            href={option.pathname}
          >
            <Button
              variant='text'
              className={twMerge(
                'text-gray fill-gray hover:text-purple-main hover:fill-purple-main',
                pathname === option.pathname &&
                  'text-purple-main fill-purple-main bg-purple-lighter'
              )}
            >
              <option.icon className='h-[20px] md:h-[18px]' />
              <span className='hidden md:inline'>{option.text}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className='flex w-[15%] justify-end'>
        <Link href={`/${user.userName}`}>
          <Button variant='outlined'>
            <PreviewIcon className='md:hidden fill-purple-main' />
            <span className='hidden md:inline'>Preview</span>
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
