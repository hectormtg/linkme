'use client'

import { withoutAuthentication } from '@/hocs/auth.hoc'
import { ComponentType, ReactNode } from 'react'
import MainLogoSm from '../../../public/icons/MainLogoSm'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='bg-white tablet:bg-primary flex tablet:justify-center tablet:items-center h-svh p-4 tablet:p-0'>
      <section className='flex flex-col gap-16 tablet:gap-10 w-full tablet:w-auto tablet:m-auto tablet:items-center'>
        <div className='flex items-center gap-1'>
          <MainLogoSm /> <span className='font-bold text-3xl'>Link Me</span>
        </div>

        <div className='tablet:rounded-lg bg-white tablet:min-w-[400px] tablet:shadow-cards tablet:p-6'>
          {children}
        </div>
      </section>
    </main>
  )
}

export default withoutAuthentication(Layout as ComponentType)
