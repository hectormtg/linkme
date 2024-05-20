'use client'

import { ButtonHTMLAttributes, ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'solid' | 'outlined' | 'text'
type Color = 'primary' | 'error' | 'success'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  color?: Color
  loading?: boolean
}

const Button = ({
  children,
  variant = 'solid',
  color = 'primary',
  loading,
  ...allProps
}: Props) => {
  const { className, ...props } = allProps

  const STYLES = useMemo(
    (): Record<Variant, string> => ({
      solid: 'bg-purple-main text-white hover:bg-purple-light px-6',
      outlined: 'border-purple-main border text-purple-main hover:bg-purple-lighter px-6',
      text: 'text-purple-main hover:bg-purple-lighter px-4',
    }),
    []
  )

  const COLOR_STYLES = useMemo(
    (): Record<Color, string> => ({
      primary: '',
      error: '',
      success: '',
    }),
    []
  )

  return (
    <button
      className={twMerge(
        'py-2 rounded-md transition font-medium flex items-center gap-2 border-1 justify-center',
        STYLES[variant],
        // COLOR_STYLES[color],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
