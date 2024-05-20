import { TextFieldProps, TextFieldVariant } from '@/types/common.type'
import { isValidString } from '@/utils/validations'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { FocusEvent, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const TextField = ({
  variant = 'outlined',
  startIcon,
  endIcon,
  label,
  error,
  errorMessage,
  tooltipPlacement = 'right',
  ...allProps
}: TextFieldProps) => {
  const { className, onBlur, ...props } = allProps

  const [hasError, setHasError] = useState<boolean | undefined>(false)

  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const { refs, context } = useFloating({
    placement: tooltipPlacement,
    open: showTooltip,
    onOpenChange: setShowTooltip,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })
  const hover = useHover(context)
  const focus = useFocus(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus])
  const { styles: transitionStyles, isMounted } = useTransitionStyles(context)

  useEffect(() => {
    if (!error && isValidString(props.value)) {
      setHasError(false)
      return
    }
    setHasError(error)
  }, [error, props.value])

  const STYLES = useMemo(
    (): Record<TextFieldVariant, string> => ({
      outlined: '',
      text: '',
    }),
    []
  )

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e)
    if (props.required && !isValidString(props.value)) {
      setHasError(true)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-1'>
        {label && (
          <label className='text-sm self-start font-medium'>
            {label}
            {props.required && '*'}
          </label>
        )}

        <div
          className='relative'
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          {startIcon && (
            <div className='flex items-center justify-center p-1 absolute left-0 top-0 bottom-0 aspect-square fill-gray'>
              {startIcon}
            </div>
          )}

          <input
            className={twMerge(
              `py-1 px-2 rounded-md border border-low-gray focus:border-purple-main hover:outline hover:border-black outline-none w-full focus:shadow-inputs transition-shadow`,
              startIcon && 'pl-[34px]',
              endIcon && 'pr-[34px]',
              hasError &&
                'text-error-main border-error-main focus:border-error-main hover:border-error-main',
              STYLES[variant],
              className
            )}
            onBlur={handleOnBlur}
            {...props}
          />

          {endIcon && (
            <div className='flex items-center justify-center p-1 absolute right-0 top-0 bottom-0 aspect-square fill-gray'>
              {endIcon}
            </div>
          )}
        </div>
      </div>

      {hasError && isMounted && errorMessage && (
        <div
          ref={refs.setFloating}
          style={{ ...context.floatingStyles, ...transitionStyles }}
          {...getFloatingProps()}
          className='text-xs font-medium text-error-main bg-error-lighter p-2 rounded-md'
        >
          {errorMessage}
        </div>
      )}
    </>
  )
}

export default TextField
