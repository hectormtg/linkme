'use client'

import Button from '@/components/Button'
import { useClipboard } from '@/hooks/use-clipboard'
import { linksAtom } from '@/store/links.store'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const { copy } = useClipboard()

  const links = useAtomValue(linksAtom)

  const handleClick = () => {
    copy(window.location.href)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <nav className='bg-white rounded-xl p-4 flex justify-center md:justify-between w-full gap-4'>
      <Button
        variant='outlined'
        className='flex-grow min-w-fit w-1/2 md:w-auto md:flex-grow-0'
        onClick={handleGoBack}
      >
        Back to Editor
      </Button>

      <Button
        className='flex-grow min-w-fit w-1/2 md:w-auto md:flex-grow-0'
        onClick={handleClick}
      >
        Share Link
      </Button>
    </nav>
  )
}

export default Header
