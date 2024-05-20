import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

interface Props extends Dialog.DialogProps {
  empty?: boolean
}

const Modal = ({ children, empty, ...props }: Props) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 z-40 backdrop-blur-md backdrop-hue-rotate-90' />
        <Dialog.Content
          className={twMerge(
            'data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-[25px] focus:outline-none z-50',
            !empty &&
              'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] bg-white rounded-[6px]'
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
