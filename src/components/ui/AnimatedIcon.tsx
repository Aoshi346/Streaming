import React from 'react'
import { motion } from 'framer-motion'

type AnimatedIconProps = {
  children: React.ReactNode
  className?: string
}

export default function AnimatedIcon({ children, className = '' }: AnimatedIconProps) {
  return (
    <motion.span
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.18, rotate: 10 }}
      whileTap={{ scale: 0.98 }}
      aria-hidden
    >
      {children}
    </motion.span>
  )
}
