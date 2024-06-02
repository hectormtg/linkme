'use client'

import Avatar from '@/components/Avatar'
import LinkItem from '@/components/LinkItem'
import { linksAtom } from '@/store/links.store'
import { userAtom } from '@/store/user.store'
import { useAtomValue } from 'jotai'

const Preview = () => {
  const links = useAtomValue(linksAtom)
  const user = useAtomValue(userAtom)

  return (
    <div className='flex flex-grow justify-center items-center'>
      <div className='py-10 bg-white rounded-2xl min-h-[550px] min-w-[320px] md:shadow-lg flex flex-col gap-12 overflow-hidden max-h-[80vh]'>
        <section className='flex flex-col gap-2 items-center px-10'>
          <Avatar
            className='mb-2'
            src={user.image}
            defaultText={user.name || user.userName}
          />
          <span className='text-[28px] font-bold'>
            {user.name} {user.lastName}
          </span>
          <span className='text-gray'>{user.userName}</span>
        </section>

        <section className='flex flex-col gap-4 overflow-auto px-10'>
          {links.map(link => (
            <LinkItem
              key={link.id}
              link={link}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Preview
