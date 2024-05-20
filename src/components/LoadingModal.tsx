import { motion } from 'framer-motion'
import MainLogoSm from '../../public/icons/MainLogoSm'
import Modal from './Modal'

const LoadingModal = ({ open }: { open?: boolean }) => {
  return (
    <Modal
      open={open}
      empty
    >
      <motion.div
        className='bg-white relative h-8 w-8 m-auto'
        animate={{
          rotate: [0, 360, 360, 0],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <MainLogoSm className='h-12 w-12 m-auto absolute -left-[28%] -top-2 drop-shadow-md' />
      </motion.div>
    </Modal>
  )
}

export default LoadingModal
