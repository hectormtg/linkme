import { isValidString } from '@/utils/validations'
import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  defaultText?: string
}

const Avatar = ({ defaultText, ...allProps }: Props) => {
  const { className, ...props } = allProps

  const hasDefaultText = defaultText && isValidString(defaultText)

  const character = hasDefaultText ? defaultText[0].toUpperCase() : ''

  return (
    <div
      className={twMerge(
        'rounded-full border-2 border-purple-main aspect-square flex-shrink-0 min-h-[120px] bg-primary flex items-center justify-center select-none text-[3em] text-low-gray overflow-hidden',
        className
      )}
      {...props}
    >
      {!props.src && hasDefaultText && character}
      {!!props.src && (
        <Image
          src={props.src || ''}
          alt={defaultText || 'profile-image'}
          width={120}
          height={120}
        />
      )}
    </div>
  )
}

export default Avatar
