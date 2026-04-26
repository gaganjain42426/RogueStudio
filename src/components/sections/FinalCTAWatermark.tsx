'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * FinalCTAWatermark — the slowly-breathing "ROGUE" background text.
 * aria-hidden so no SEO impact. Extracted so FinalCTA.tsx can be server-rendered.
 */
export function FinalCTAWatermark() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <motion.span
        className="text-[40vw] font-black text-white leading-none"
        style={{
          fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)',
          opacity: 0.07,
        }}
        animate={prefersReduced ? {} : { scale: [0.95, 1.05] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      >
        ROGUE
      </motion.span>
    </div>
  )
}
