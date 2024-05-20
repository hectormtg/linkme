'use client'

import AnimatedElement from '@/components/AnimatedElement'
import { ReactNode } from 'react'

interface Props {
  title: string
  description: string
  children: ReactNode
}

const CardLayout = ({ title, description, children }: Props) => {
  return (
    <AnimatedElement
      as='div'
      className='flex flex-col gap-2'
    >
      <h1 className='text-2xl min-[530px]:text-3xl font-bold'>{title}</h1>
      <h3 className='text-gray mb-6'>{description}</h3>

      {children}
    </AnimatedElement>
  )
}

export default CardLayout
