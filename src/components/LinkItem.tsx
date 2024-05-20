import { LINK_ICONS } from '@/app/links-icons'
import { LINK_NAME, Link, LinkType } from '@/types/link.type'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import ArrowRightcon from '../../public/icons/ArrowRightcon'

interface Props {
  link: Link
  readOnly?: boolean
}

const LinkItem = ({ link, readOnly }: Props) => {
  const router = useRouter()

  const anchorRef = useRef<HTMLAnchorElement>()

  const STYLES = useMemo(
    () => ({
      [LINK_NAME[LinkType.GITHUB]]: 'bg-black',
      [LINK_NAME[LinkType.YOUTUBE]]: 'bg-[#EE3939]',
      [LINK_NAME[LinkType.FACEBOOK]]: 'bg-blue-500',
    }),
    []
  )

  const handleClick = () => {
    if (readOnly) return
    if (anchorRef.current) {
      anchorRef.current.click()
    }
  }

  return (
    <motion.div
      className={twMerge(
        'px-3 py-[10px] border rounded-xl text-white fill-white flex items-center gap-2 relative',
        !readOnly && 'cursor-pointer',
        STYLES[link.name]
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
    >
      {LINK_ICONS[link.name]}
      <span>{link.name}</span>

      <ArrowRightcon className='absolute right-3' />

      {!readOnly && (
        <a
          target='_black'
          href={link.url}
          style={{ display: 'none' }}
          ref={anchorRef}
        />
      )}
    </motion.div>
  )
}

export default LinkItem
