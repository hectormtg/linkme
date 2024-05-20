import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import { HTMLAttributes, ReactNode } from 'react'

type Element = 'main' | 'div' | 'section'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  as?: Element
  initial?: boolean
}

const animationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
}

const AnimatedElement = ({ children, initial, as = 'main', ...props }: Props) => {
  if (as === 'div')
    return (
      <AnimatePresence initial={initial}>
        <motion.div
          {...animationProps}
          {...(props as MotionProps)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )

  if (as === 'section')
    return (
      <AnimatePresence initial={initial}>
        <motion.section
          {...animationProps}
          {...(props as MotionProps)}
        >
          {children}
        </motion.section>
      </AnimatePresence>
    )

  return (
    <AnimatePresence initial={initial}>
      <motion.main
        {...animationProps}
        {...(props as MotionProps)}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

export default AnimatedElement
