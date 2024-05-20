import { TypeOptions, toast } from 'react-toastify'

const STYLES = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
}

export const notify = (text: string, type: TypeOptions) =>
  toast(text, {
    type: type,
    position: 'bottom-right',
    // className: STYLES[type],
  })
