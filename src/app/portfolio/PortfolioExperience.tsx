'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  PORTFOLIO_FILTERS,
  type ResolvedClient,
  type ActiveReel,
  type PortfolioTag,
} from '@/data/portfolio'
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import Bookshelf from '@/components/portfolio/Bookshelf'
import CasePanel from '@/components/portfolio/CasePanel'
import ReelLightbox from '@/components/portfolio/ReelLightbox'
import { scrollToId } from '@/lib/smooth-scroll'

type Filter = PortfolioTag | 'All'

export default function PortfolioExperience({ clients }: { clients: ResolvedClient[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [activeReel, setActiveReel] = useState<ActiveReel | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? clients : clients.filter((c) => c.tag === filter)),
    [filter, clients],
  )

  const stats = [
    { value: '1000+', label: 'Reels produced' },
    { value: '1M+', label: 'Views on top reels' },
    { value: '10X', label: 'Peak return on ad spend' },
  ]

  // Only surface filters that actually match a client.
  const availableFilters = PORTFOLIO_FILTERS.filter(
    (f) => f.value === 'All' || clients.some((c) => c.tag === f.value),
  )

  // Bookshelf jump — clear any active filter so the target panel is mounted,
  // then scroll once it's in the DOM.
  const handleJump = (slug: string) => {
    setFilter('All')
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(slug)))
  }

  return (
    <div style={{ background: '#0D0D0D' }}>
      <PortfolioHero clientNames={clients.map((c) => c.name)} stats={stats} />

      {/* Bookshelf — tap a brand to jump to its panel */}
      <Bookshelf
        books={clients.map((c) => ({
          slug: c.slug,
          name: c.name,
          logo: c.logo,
          accent: c.accent,
        }))}
        onJump={handleJump}
      />

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 border-b border-white/5 bg-[#0D0D0D]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-2 px-6 py-4 md:px-8">
          {availableFilters.map((f) => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  active
                    ? 'bg-primary-container text-on-primary-fixed'
                    : 'border border-white/10 text-white/55 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Case panels */}
      <motion.div
        key={filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {filtered.map((client, i) => (
          <CasePanel key={client.id} client={client} index={i} onOpen={setActiveReel} />
        ))}
      </motion.div>

      {/* Closing CTA */}
      <section className="relative overflow-hidden border-t border-white/5 px-6 py-32 text-center md:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(250,92,27,0.18), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl"
        >
          <h2
            className="text-4xl font-black leading-[0.95] text-white md:text-6xl"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Ready to be the next{' '}
            <span className="italic" style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}>
              case study?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/60">
            We only take on brands we know we can move the needle for. If that&apos;s you, let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black transition-transform hover:-translate-y-0.5"
            style={{
              background: '#fa5c1b',
              color: '#0D0D0D',
              fontFamily: 'var(--font-headline)',
              boxShadow: '0 10px 30px -10px rgba(250,92,27,0.6)',
            }}
          >
            Start your project
            <span>→</span>
          </Link>
        </motion.div>
      </section>

      <ReelLightbox reel={activeReel} onClose={() => setActiveReel(null)} />
    </div>
  )
}
