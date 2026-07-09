'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE, DUR, VIEWPORT } from '@/lib/motion'

/**
 * TextReveal — a masked line reveal for display type.
 *
 * The line rises out of an overflow-hidden mask, like a title card.
 * SSR-safe: text ships at opacity 1 (transform-only animation), so crawlers
 * and reduced-motion users always see the content.
 */
export default function TextReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={VIEWPORT}
        transition={{ duration: DUR.slow, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
