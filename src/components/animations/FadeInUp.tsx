'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeInUp({ children, delay = 0, className = '' }: Props) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
