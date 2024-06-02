'use client'

import { linkErrorsAtom, linksAtom, showErrorsAtom } from '@/store/links.store'
import { LINK_NAME, Link, LinkType } from '@/types/link.type'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ForwardedRef, useRef } from 'react'
import EmptyPhone from '../../public/img/EmptyPhone'
import Button from './Button'
import LinksList from './LinksList'

const EMPTY_LINK: Link = {
  name: LINK_NAME[LinkType.GITHUB],
  type: LinkType.GITHUB,
  url: '',
  id: Date.now(),
}

const LinksView = () => {
  const [links, setLinks] = useAtom(linksAtom)
  const setShowErrors = useSetAtom(showErrorsAtom)
  const showErrors = useAtomValue(showErrorsAtom)
  const linkErrors = useAtomValue(linkErrorsAtom)

  const hasLinks = links.length > 0

  const listRef = useRef<HTMLDivElement>()

  const handleAddLinkClick = () => {
    const result = [...links, { ...EMPTY_LINK, id: Date.now() }]
    setLinks(result)
    setTimeout(() => {
      if (listRef.current) {
        const scrollHeight = listRef.current.scrollHeight
        listRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' })
      }
    }, 100)
  }

  const handleSave = () => {
    setShowErrors(linkErrors)
  }

  return (
    <div className='bg-white rounded-xl p-4 flex flex-col flex-grow gap-10 overflow-auto'>
      <section className='flex flex-col gap-2'>
        <h2 className='font-bold text-[32px]'>Customize your links</h2>
        <h3 className='text-gray'>
          Add/edit/remove links below and then share all your profiles with the world!
        </h3>
      </section>

      <section className='flex flex-col gap-6 overflow-auto flex-grow'>
        <Button
          variant='outlined'
          onClick={handleAddLinkClick}
        >
          + Add new link
        </Button>

        {hasLinks ? <LinksList ref={listRef as ForwardedRef<HTMLDivElement>} /> : <NoLinksView />}
      </section>

      <section className='border-t border-low-gray pt-4 flex flex-row-reverse'>
        <Button onClick={handleSave}>Save</Button>
      </section>
    </div>
  )
}

const NoLinksView = () => {
  return (
    <div className='rounded-xl p-4 py-14 flex flex-col gap-4 items-center bg-primary'>
      <span className='text-[26px] md:text-[32px] font-bold text-center'>
        Let&apos;s get you started
      </span>

      <EmptyPhone />

      <p className='text-gray text-center md:mx-[18%]'>
        Use the “Add new link” button to get started. Once you have more than one link, you can
        reorder and edit them. We&apos;re here to help you share your profiles with everyone!
      </p>
    </div>
  )
}

export default LinksView
