'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { ResolvedClient, ActiveReel } from '@/data/portfolio'
import Scene from '@/components/portfolio/Scene'
import FilmRail from '@/components/portfolio/FilmRail'
import ReelLightbox from '@/components/portfolio/ReelLightbox'
import Magnetic from '@/components/ui/Magnetic'
import Icon from '@/components/ui/Icon'
import { EASE, DUR } from '@/lib/motion'

/**
 * PortfolioExperience — "The Work", played as a film.
 *
 *   Title sequence → scenes (one full chapter per client, alternating
 *   compositions, accent lighting, CSS-3D media planes) → end credits for
 *   engagements still in production → closing CTA.
 *
 * A film rail on the right edge tracks and navigates scenes. No grids,
 * no filters, no cards — a directed sequence.
 */
export default function PortfolioExperience({ clients }: { clients: ResolvedClient[] }) {
  const [activeReel, setActiveReel] = useState<ActiveReel | null>(null)
  const reduced = useReducedMotion()

  // Finished case studies play as scenes; in-production clients roll in the credits.
  const scenes = clients.filter((c) => !c.needsContext)
  const credits = clients.filter((c) => c.needsContext)

  return (
    <div style={{ background: '#0D0D0D' }}>
      {/* ── Title sequence ── */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(250,92,27,0.14), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="film-grain" aria-hidden="true" />

        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.4em]"
          style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
        >
          Rogue Studio presents
        </motion.p>

        <motion.h1
          initial={reduced ? {} : { opacity: 1, y: 60, scale: 1.03 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
          className="mt-6 font-black text-white"
          style={{
            fontFamily: 'var(--font-headline)',
            fontSize: 'clamp(64px, 14vw, 220px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          THE{' '}
          <span
            className="italic font-normal"
            style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
          >
            Work.
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, delay: 0.8 }}
          className="mt-8 max-w-md text-base leading-relaxed"
          style={{ color: 'rgba(229,226,225,0.72)' }}
        >
          {scenes.length} clients. 200+ reels. 40M+ views. Every number on this
          page came from a client&rsquo;s real account — nothing staged, nothing rounded up.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.base, delay: 1.2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
          >
            Scroll to roll
          </span>
          <motion.span
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px"
            style={{ background: 'linear-gradient(to bottom, #fa5c1b, transparent)' }}
          />
        </motion.div>
      </header>

      <FilmRail scenes={scenes.map((c) => ({ slug: c.slug, name: c.name }))} />

      {/* ── Scenes ── */}
      {scenes.map((client, i) => (
        <Scene key={client.id} client={client} index={i} onOpen={setActiveReel} />
      ))}

      {/* ── End credits — engagements still in production ── */}
      {credits.length > 0 && (
        <section className="relative border-t border-white/5 px-6 py-28 md:px-8">
          <div className="mx-auto max-w-[1100px]">
            <p
              className="text-center text-[11px] uppercase tracking-[0.4em]"
              style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
            >
              Also in production
            </p>
            <div className="mt-12 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              {credits.map((c) => (
                <a
                  key={c.id}
                  href={c.instagram || undefined}
                  target={c.instagram ? '_blank' : undefined}
                  rel={c.instagram ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 bg-[#0D0D0D] p-7 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/90 p-1">
                    <Image src={c.logo} alt={`${c.name} logo`} width={48} height={48} className="h-full w-full object-contain" />
                  </span>
                  <span>
                    <span className="block font-black text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                      {c.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.64)' }}>
                      {c.industry}
                    </span>
                  </span>
                  {c.instagram && (
                    <Icon
                      name="arrow-ne"
                      size={16}
                      className="ml-auto text-white/35 transition-colors group-hover:text-white"
                    />
                  )}
                </a>
              ))}
            </div>
            <p className="mt-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              First deliverables shipping now — full case studies when the numbers are in.
            </p>
          </div>
        </section>
      )}

      {/* ── Closing CTA ── */}
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
          initial={reduced ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.base, ease: EASE }}
          className="relative mx-auto max-w-3xl"
        >
          <h2
            className="text-4xl font-black leading-[0.95] text-white md:text-6xl"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Scene {String(scenes.length + 1).padStart(2, '0')}:{' '}
            <span className="italic" style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}>
              your brand.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            We take on brands we know we can move the needle for — then put the
            numbers on this page.
          </p>
          <Magnetic strength={10} className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black transition-transform hover:-translate-y-0.5"
              style={{
                background: '#fa5c1b',
                color: '#0D0D0D',
                fontFamily: 'var(--font-headline)',
                boxShadow: '0 10px 30px -10px rgba(250,92,27,0.6)',
              }}
            >
              Start your project →
            </Link>
          </Magnetic>
        </motion.div>
      </section>

      <ReelLightbox reel={activeReel} onClose={() => setActiveReel(null)} />
    </div>
  )
}
