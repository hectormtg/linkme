'use client'

import { LINK_ICONS } from '@/app/links-icons'
import { useDebounce } from '@/hooks/use-debounce'
import { linksAtom, showErrorsAtom } from '@/store/links.store'
import { LINK_NAME, LINK_TYPE_BY_NAME, Link } from '@/types/link.type'
import { isValidString, isValidUrl } from '@/utils/validations'
import { AnimatePresence, Reorder, useDragControls } from 'framer-motion'
import { useAtom } from 'jotai'
import { ChangeEvent, useEffect, useState } from 'react'
import DragIcon from '../../public/icons/DragIcon'
import LinkIcon from '../../public/icons/LinkIcon'
import Button from './Button'
import Select from './Select'
import TextField from './TextField'

interface Props {
  link: Link
  index: number
}

const OPTIONS = Object.values(LINK_NAME).map(value => ({
  value,
  icon: LINK_ICONS[value],
}))

const LinkCard = ({ link, index }: Props) => {
  const [payload, setPayload] = useState(link)

  const [links, setLinks] = useAtom(linksAtom)
  const [showErrors, setShowErrors] = useAtom(showErrorsAtom)

  const dragControls = useDragControls()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setPayload(prev => ({
      ...prev,
      name: value,
      type: LINK_TYPE_BY_NAME[value],
    }))
  }

  useDebounce({
    value: payload,
    onChange: value => {
      const link = links[index]
      const result = links.toSpliced(index, 1, {
        ...link,
        name: value.name,
        url: value.url,
        type: value.type,
        id: value.id,
      })
      setLinks(result)
    },
    omitFirstRender: true,
  })

  useEffect(() => {
    setShowErrors({
      ...showErrors,
      [payload.id]: false,
    })
  }, [payload.url])

  const onRemoveClick = () => {
    const result = links.toSpliced(index, 1)
    setLinks(result)
  }

  return (
    <AnimatePresence initial={false}>
      <Reorder.Item
        className='bg-primary p-4 rounded-xl flex flex-col gap-4 select-none'
        value={link}
        id={`${link.id}`}
        dragListener={false}
        dragControls={dragControls}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className='flex justify-between items-center'>
          <span className='font-medium flex items-center gap-2'>
            <div
              onPointerDown={e => dragControls.start(e)}
              className='cursor-grab h-4 aspect-square flex items-center justify-center active:cursor-grabbing'
            >
              <DragIcon />
            </div>
            Link {`#${index + 1}`}
          </span>

          <Button
            onClick={onRemoveClick}
            variant='text'
            className='text-sm py-1 px-2 text-gray hover:text-error-main hover:bg-error-lighter'
            color='error'
          >
            Remove
          </Button>
        </section>

        <Select
          value={payload.name}
          options={OPTIONS}
          label='Platform'
          onChange={handleSelectChange}
          startIcon={LINK_ICONS[payload.name]}
        />

        <TextField
          value={payload.url}
          onChange={handleChange}
          name='url'
          startIcon={<LinkIcon className='h-4' />}
          placeholder='e.g. https://www.github.com/johnappleseed'
          label='Link'
          error={showErrors[payload.id]}
          errorMessage={
            !isValidString(payload.url)
              ? `Can't be empty`
              : !isValidUrl(payload.url)
                ? 'Must be a valid url'
                : ''
          }
          tooltipPlacement='bottom-end'
        />
      </Reorder.Item>
    </AnimatePresence>
  )
}

export default LinkCard
