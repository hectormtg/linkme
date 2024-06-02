'use client'

import { linksAtom } from '@/store/links.store'
import { userAtom } from '@/store/user.store'
import { AnimatePresence } from 'framer-motion'
import { useAtomValue } from 'jotai'
import DeviceMockUp from '../../public/img/DeviceMockUp'
import Avatar from './Avatar'
import LinkItem from './LinkItem'

const DevicePreview = () => {
  return (
    <div className='bg-white p-4 rounded-xl min-w-[40%] min-[950px]:flex justify-center items-center hidden'>
      <div className='relative'>
        <DeviceMockUp />
        <ProfileImage />
        <Name />
        <UserName />
        <LinksPreview />
      </div>
    </div>
  )
}

const LinksPreview = () => {
  const links = useAtomValue(linksAtom)

  const linksToPreview = links.toSpliced(5)

  return (
    <div className='flex flex-col absolute inset-0 overflow-hidden'>
      <div className='h-[40%] flex-shrink-0' />

      <section className='flex flex-col gap-[18px] py-6 px-[34px] select-none'>
        <AnimatePresence initial={false}>
          {linksToPreview.map(link => (
            <LinkItem
              key={link.id}
              link={link}
              readOnly
            />
          ))}
        </AnimatePresence>
      </section>
    </div>
  )
}

const ProfileImage = () => {
  const user = useAtomValue(userAtom)

  if (user.image) {
    return (
      <div className='absolute top-16 left-0 right-0 flex justify-center'>
        <Avatar
          src={user.image}
          className='min-h-0 min-w-[95px] w-1/3'
          height={100}
          width={100}
        />
      </div>
    )
  }

  return null
}

const Name = () => {
  const user = useAtomValue(userAtom)

  if (user.name && user.lastName) {
    return (
      <div className='absolute top-[11.1rem] right-0 left-0 flex justify-center'>
        <span className='bg-white min-w-[60%] text-center font-bold text-lg'>
          {user.name}
          &nbsp;
          {user.lastName}
        </span>
      </div>
    )
  }

  return null
}

const UserName = () => {
  const user = useAtomValue(userAtom)

  return (
    <div className='absolute top-[13rem] right-0 left-0 flex justify-center'>
      <span className='bg-white min-w-[60%] text-center text-sm'>{user.userName}</span>
    </div>
  )
}

export default DevicePreview
