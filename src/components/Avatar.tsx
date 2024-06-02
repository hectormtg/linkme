import { isValidString } from '@/utils/validations'
import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  defaultText?: string
  width?: number
  height?: number
}

const Avatar = ({ defaultText, width, height, ...allProps }: Props) => {
  const { className, ...props } = allProps

  const hasDefaultText = defaultText && isValidString(defaultText)

  const character = hasDefaultText ? defaultText[0].toUpperCase() : ''

  return (
    <div
      className={twMerge(
        'rounded-full border-2 border-purple-main aspect-square flex-shrink-0 min-h-[120px] bg-primary select-none text-[3em] text-low-gray overflow-hidden flex',
        !props.src && hasDefaultText && 'items-center justify-center',
        className
      )}
      {...props}
    >
      {!props.src && hasDefaultText && character}
      {!!props.src && (
        <Image
          src={props.src || ''}
          alt={defaultText || 'profile-image'}
          width={width || 120}
          height={height || 120}
          className='object-cover'
        />
      )}
    </div>
  )
}

export default Avatar
