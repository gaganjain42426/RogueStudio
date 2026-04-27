'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export type AnimateVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'heroSlide'

const variantMap: Record<AnimateVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  /**
   * heroSlide — keeps opacity: 1 in SSR HTML so Googlebot can read the text
   * on first-pass crawl. Only transforms y + skewY (no opacity fade).
   */
  heroSlide: {
    hidden: { opacity: 1, y: 80, skewY: 3 },
    visible: { opacity: 1, y: 0, skewY: 0 },
  },
}

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: AnimateVariant
}

/**
 * AnimateIn — reusable scroll-triggered animation island.
 * Place this around server-rendered content to animate it in on scroll
 * without making the content itself a client component.
 *
 * Uses whileInView (fires when element enters viewport).
 * Above-fold content (e.g. Hero H1) triggers immediately after hydration.
 */
export function AnimateIn({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp',
}: AnimateInProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variantMap[variant]}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
