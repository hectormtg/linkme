'use client'

import AnimatedElement from '@/components/AnimatedElement'
import DevicePreview from '@/components/DevicePreview'
import NavBar from '@/components/NavBar'
import { withAuthentication } from '@/hocs/auth.hoc'
import UserProfile from './UserProfile'

const Home = () => {
  return (
    <AnimatedElement className='h-screen flex flex-col gap-6 p-4 md:p-6 max-w-screen-xl m-auto'>
      <NavBar />

      <section className='flex flex-grow gap-6 overflow-y-auto'>
        <DevicePreview />

        <UserProfile />
      </section>
    </AnimatedElement>
  )
}

export default withAuthentication(Home)
