'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
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
  const ref = useRef<HTMLDivElement>(null)
  // Observe the mask, not the moving line: the line starts fully clipped by the
  // mask, so an observer on it never sees it intersect and it would stay hidden.
  const inView = useInView(ref, VIEWPORT)

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: DUR.slow, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
