'use client'

import { motion, useReducedMotion } from 'framer-motion'

/** Scroll indicator at the bottom of the hero — client because it animates continuously. */
export function HeroScrollIndicator() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <span
        className="text-[10px] tracking-[0.3em] text-white/40 uppercase"
        style={{ fontFamily: 'var(--font-label)' }}
      >
        Scroll
      </span>
      <motion.div
        className="w-px bg-white/30"
        style={{ height: 36 }}
        animate={prefersReduced ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  )
}
