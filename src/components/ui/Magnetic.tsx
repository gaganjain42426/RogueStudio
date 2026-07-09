'use client'

import { useRef, useCallback, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic — buttons that lean toward the cursor.
 *
 * Pure transform (GPU), spring-settled, desktop-pointer only. Wrap any CTA;
 * the child receives a gentle pull within `strength` px of travel.
 */
export default function Magnetic({
  children,
  strength = 10,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 })

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse' || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength)
      y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength)
    },
    [reduced, strength, x, y],
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
