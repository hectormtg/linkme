import { TextFieldProps } from '@/types/common.type'
import { MouseEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import PreviewIcon from '../../public/icons/PreviewIcon'
import Button from './Button'
import TextField from './TextField'

const PasswordInput = (props: TextFieldProps) => {
  const [type, setType] = useState<string>('password')

  const isVisible = type === 'text'

  const toggleType = (e: MouseEvent) => {
    e.preventDefault()
    setType(prev => (prev === 'text' ? 'password' : 'text'))
  }

  return (
    <TextField
      {...props}
      type={type}
      endIcon={
        <Button
          onClick={toggleType}
          variant='text'
          className='rounded-full aspect-square p-1'
          type='button'
        >
          <PreviewIcon className={twMerge('fill-gray', isVisible && 'fill-purple-main')} />
        </Button>
      }
    />
  )
}

export default PasswordInput
