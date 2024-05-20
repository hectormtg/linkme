import { Placement } from '@floating-ui/react'
import { InputHTMLAttributes, ReactNode } from 'react'

export interface FilePreview extends File {
  preview: string
}

export type TextFieldVariant = 'text' | 'outlined'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: TextFieldVariant
  startIcon?: ReactNode
  endIcon?: ReactNode
  label?: string
  error?: boolean
  errorMessage?: string
  tooltipPlacement?: Placement
}
