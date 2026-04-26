'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * MotionMain — page-entry animation wrapper.
 *
 * SSR note: opacity is kept at 1 (not 0) so the initial HTML served to
 * Googlebot has visible content. Only the y-transform animates, giving
 * a subtle slide-up feel without hiding text from crawlers.
 */
export default function MotionMain({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 1, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.main>
  )
}
