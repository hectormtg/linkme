'use client'

import { linksAtom } from '@/store/links.store'
import { AnimatePresence } from 'framer-motion'
import { useAtomValue } from 'jotai'
import DeviceMockUp from '../../public/img/DeviceMockUp'
import LinkItem from './LinkItem'

const DevicePreview = () => {
  return (
    <div className='bg-white p-4 rounded-xl min-w-[40%] min-[950px]:flex justify-center items-center hidden'>
      <div className='relative'>
        <DeviceMockUp />
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

export default DevicePreview
