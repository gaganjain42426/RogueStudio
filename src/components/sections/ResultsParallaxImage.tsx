'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScaleIn from '@/components/animations/ScaleIn'

/**
 * ResultsParallaxImage — the laptop mockup with scroll-driven parallax.
 * Extracted from Results.tsx so the H2 and stats can be server-rendered.
 * Manages its own ref and scroll tracking internally.
 */
export function ResultsParallaxImage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <ScaleIn className="w-full max-w-5xl" delay={0.2}>
      <div ref={ref}>
        <motion.div
          className="w-full bg-surface-container-lowest rounded-lg p-4 shadow-2xl"
          style={{ y: laptopY }}
        >
          <Image
            src="https://picsum.photos/seed/dashboard/1200/700"
            alt="Rogue Studio dashboard showing social media growth analytics"
            width={1200}
            height={700}
            className="w-full rounded shadow-inner"
            sizes="(max-width: 1280px) 100vw, 1000px"
            quality={85}
          />
        </motion.div>
      </div>
    </ScaleIn>
  )
}
