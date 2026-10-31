import { motion } from 'motion/react'
import { EASE, VIEWPORT } from '../../lib/motion.js'

/** Fades + lifts its children into view once. */
export default function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...props }) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
