import * as RSelect from '@radix-ui/react-select'
import { ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import ArrowDownIcon from '../../public/icons/ArrowDownIcon'

type Variant = 'outlined'

interface Props {
  variant?: Variant
  options: Array<any>
  startIcon?: ReactNode
  label?: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const Select = ({
  variant = 'outlined',
  options,
  label,
  startIcon,
  className,
  value,
  onChange,
  ...props
}: Props) => {
  const STYLES = useMemo(
    (): Record<Variant, string> => ({
      outlined: '',
    }),
    []
  )

  return (
    <div>
      {label && <label className='text-sm self-start font-medium'>{label}</label>}

      <RSelect.Root
        onValueChange={onChange}
        value={value}
      >
        <RSelect.Trigger
          onClick={e => e.stopPropagation()}
          onChange={e => e.stopPropagation()}
          className={twMerge(
            'bg-white py-1 px-2 rounded-md border border-low-gray focus:border-purple-main hover:outline hover:border-black outline-none w-full inline-flex items-center justify-between transition-colors duration-300 min-h-[34px] relative',
            startIcon && 'pl-[34px]',
            STYLES[variant],
            className
          )}
          aria-label={label}
          disabled={props.disabled}
        >
          <RSelect.Value placeholder={props.placeholder} />

          {startIcon && (
            <div className='flex items-center justify-center p-1 absolute left-0 top-0 bottom-0 aspect-square fill-gray'>
              {startIcon}
            </div>
          )}

          <RSelect.Icon className='text-violet11'>
            <ArrowDownIcon />
          </RSelect.Icon>
        </RSelect.Trigger>

        <RSelect.Portal>
          <RSelect.Content
            onClick={e => e.stopPropagation()}
            onChange={e => e.stopPropagation()}
            className='relative z-50 overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'
          >
            <RSelect.ScrollUpButton
              onClick={e => e.stopPropagation()}
              onChange={e => e.stopPropagation()}
              className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'
            >
              <ArrowDownIcon className='rotate-180' />
            </RSelect.ScrollUpButton>
            <RSelect.Viewport
              onClick={e => e.stopPropagation()}
              onChange={e => e.stopPropagation()}
              className='p-1'
            >
              <RSelect.Group
                onClick={e => e.stopPropagation()}
                onChange={e => e.stopPropagation()}
              >
                {options?.map(option => (
                  <Option
                    key={typeof option === 'string' ? option : option?.value}
                    value={typeof option === 'string' ? option : option?.value}
                    icon={typeof option !== 'string' && option.icon}
                  />
                ))}
              </RSelect.Group>
            </RSelect.Viewport>
            <RSelect.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
              <ArrowDownIcon />
            </RSelect.ScrollDownButton>
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root>
    </div>
  )
}

interface OptionProps {
  value: string
  icon?: ReactNode
}

const Option = ({ value, icon }: OptionProps) => {
  return (
    <RSelect.Item
      value={value}
      className={twMerge(
        'text-[14px] outline-none hover:bg-purple-lighter hover:text-purple-main fill-gray hover:fill-purple-main rounded-md flex items-center cursor-pointer p-2 relative RSelect-none',
        icon && 'pl-[34px]'
      )}
    >
      {icon && (
        <div className='flex items-center justify-center p-1 absolute left-0 top-0 bottom-0 aspect-square'>
          {icon}
        </div>
      )}
      <RSelect.ItemText className='text-'>{value}</RSelect.ItemText>
    </RSelect.Item>
  )
}

export default Select
