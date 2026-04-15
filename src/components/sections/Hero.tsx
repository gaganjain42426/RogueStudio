'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

// Deterministically "random"-looking values for the dot grid
const COLS = 40
const ROWS = 26

const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: (i % COLS) * 40 + 20,
  y: Math.floor(i / COLS) * 40 + 20,
  duration: 2 + (i % 13) * 0.23,   // 2s – 5s
  delay: (i % 17) * 0.18,           // 0s – 3s
}))

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <header
      className="relative min-h-screen flex items-end overflow-hidden pt-20"
      style={{ background: '#0D0D0D' }}
    >
      {/* ── LAYER 1: Animated dot grid ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${COLS * 40} ${ROWS * 40}`}
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.5}
            fill="#fa5c1b"
            style={{
              opacity: 0.15,
              animation: prefersReduced
                ? 'none'
                : `dot-pulse ${dot.duration.toFixed(2)}s ease-in-out ${dot.delay.toFixed(2)}s infinite alternate`,
            }}
          />
        ))}
      </svg>

      {/* ── LAYER 2: "ROGUE" watermark with horizontal drift ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <motion.span
          className="text-[22vw] font-black text-white leading-none"
          style={{
            fontFamily: 'var(--font-headline)',
            opacity: 0.03,
          }}
          animate={prefersReduced ? {} : { x: ['-2%', '2%'] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        >
          ROGUE
        </motion.span>
      </div>

      {/* ── LAYER 3: Radial vignette overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0D0D0D 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── LAYER 4: Main content ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-20 md:pb-28 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* Left side — visible on md+ */}
        <div className="max-w-sm hidden md:block">
          <motion.span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
          >
            Social Media &amp; Creative Agency · Jaipur, India
          </motion.span>

          <motion.p
            className="mt-6 text-xl text-on-surface-variant font-medium leading-relaxed"
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
          >
            Based in Jaipur, we are a collective of misfits and masters redefining the digital
            frontier through raw creativity.
          </motion.p>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 1.2 }}
          >
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-2 border border-outline-variant/30 text-on-surface px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-container transition-colors"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              See Our Work →
            </Link>
          </motion.div>
        </div>

        {/* Right side — headline stack */}
        <div className="text-right">
          <motion.div
            className="flex flex-col items-end"
            variants={headlineVariants}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
          >
            {/* Line 1 */}
            <motion.h1
              variants={lineVariants}
              className="font-black text-white leading-none tracking-tighter"
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(60px, 10vw, 140px)',
              }}
            >
              SOCIAL
            </motion.h1>

            {/* Line 2 */}
            <motion.h1
              variants={lineVariants}
              className="font-black text-white leading-none tracking-tighter"
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: 'clamp(60px, 10vw, 140px)',
              }}
            >
              CREATIVE
            </motion.h1>

            {/* Line 3 — orange italic */}
            <motion.h1
              variants={lineVariants}
              className="italic leading-none tracking-tighter"
              style={{
                fontFamily: 'var(--font-serif-accent)',
                fontSize: 'clamp(60px, 10vw, 140px)',
                color: '#fa5c1b',
              }}
            >
              Studio
            </motion.h1>
          </motion.div>

          {/* Decorative line — draws from left */}
          <motion.div
            className="mt-6 ml-auto h-px"
            style={{
              width: 200,
              background: 'rgba(250, 92, 27, 0.4)',
              transformOrigin: 'left',
            }}
            initial={prefersReduced ? {} : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1.4 }}
          />

          {/* Mobile description */}
          <div className="mt-6 md:hidden text-left">
            <p className="text-lg text-on-surface-variant">
              We are a Jaipur-based agency crafting cinematic digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-xs tracking-widest text-white/40 uppercase"
          style={{ fontFamily: 'var(--font-label)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-white/30"
          style={{ height: 40 }}
          animate={prefersReduced ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>

      {/* ── Dot pulse keyframes ── */}
      <style>{`
        @keyframes dot-pulse {
          from { opacity: 0.05; }
          to   { opacity: 0.30; }
        }
      `}</style>
    </header>
  )
}
