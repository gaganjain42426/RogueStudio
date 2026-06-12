'use client'

import { motion } from 'framer-motion'

interface PortfolioHeroProps {
  clientNames: string[]
  stats: { value: string; label: string }[]
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function PortfolioHero({ clientNames, stats }: PortfolioHeroProps) {
  const marquee = [...clientNames, ...clientNames]

  return (
    <header className="relative overflow-hidden pt-36 pb-20 md:pt-44" style={{ background: '#0D0D0D' }}>
      {/* animated grain / glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(250,92,27,0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-8">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-px w-8" style={{ background: '#fa5c1b' }} />
          <span
            className="text-[11px] uppercase tracking-[0.3em] md:text-xs"
            style={{ color: '#fa5c1b', fontFamily: 'var(--font-label)' }}
          >
            The Portfolio · Real Clients, Real Results
          </span>
        </motion.div>

        {/* headline */}
        <h1
          className="font-black leading-[0.9] tracking-tighter text-white"
          style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(48px, 8vw, 132px)' }}
        >
          <motion.span
            initial={{ opacity: 1, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="block"
          >
            The work that
          </motion.span>
          <motion.span
            initial={{ opacity: 1, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.24 }}
            className="block italic"
            style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
          >
            speaks for itself.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
        >
          No stock photos. No vanity metrics. Just the brands we&apos;ve built, the content we&apos;ve
          shot, and the results we&apos;ve driven — reel by reel, lead by lead.
        </motion.p>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.65 }}
          className="mt-12 flex flex-wrap gap-x-12 gap-y-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl font-black text-white md:text-4xl"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* client-name marquee */}
      <div className="relative mt-16 overflow-hidden border-y border-white/5 py-5">
        <div className="flex w-max animate-vault-marquee whitespace-nowrap">
          {marquee.map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center">
              <span
                className="px-8 text-2xl font-black uppercase tracking-tight text-white/15 md:text-4xl"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {name}
              </span>
              <span className="text-xl" style={{ color: '#fa5c1b' }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
