'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function MotionMain({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.main>
  )
}
