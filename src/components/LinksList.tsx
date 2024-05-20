import { linkErrorsAtom, linksAtom } from '@/store/links.store'
import { isValidString, isValidUrl } from '@/utils/validations'
import { Reorder } from 'framer-motion'
import { useAtom, useSetAtom } from 'jotai'
import { ForwardedRef, forwardRef, useEffect } from 'react'
import LinkCard from './LinkCard'

const LinksList = (_props: any, ref: ForwardedRef<HTMLDivElement>) => {
  const [links, setLinks] = useAtom(linksAtom)
  const setLinkErrors = useSetAtom(linkErrorsAtom)

  useEffect(() => {
    const linkErrors: Record<number, boolean> = {}
    links.forEach(link => {
      linkErrors[link.id] = !isValidString(link.url) || !isValidUrl(link.url)
    })
    setLinkErrors(linkErrors)
  }, [])

  return (
    <Reorder.Group
      values={links}
      className='flex flex-col gap-6 overflow-auto flex-grow overflow-x-hidden'
      axis='y'
      onReorder={setLinks}
      layoutScroll
      ref={ref}
      as='div'
      initial={false}
    >
      {links.map((link, index) => (
        <LinkCard
          key={link.id}
          link={link}
          index={index}
        />
      ))}
    </Reorder.Group>
  )
}

export default forwardRef(LinksList)
