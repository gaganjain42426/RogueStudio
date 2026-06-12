'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { ResolvedClient, ActiveReel } from '@/data/portfolio'
import ReelStrip from './ReelStrip'
import MediaSlot from './MediaSlot'

interface CasePanelProps {
  client: ResolvedClient
  index: number
  onOpen: (reel: ActiveReel) => void
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function CasePanel({ client, index, onOpen }: CasePanelProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y = reduced ? 0 : rawY

  // Alternate the media side for editorial rhythm.
  const flip = index % 2 === 1
  const hasMedia =
    client.dashboards.length > 0 || client.workSamples.length > 0

  return (
    <section
      ref={ref}
      id={client.slug}
      className="relative scroll-mt-28 border-t border-white/5 py-24 md:py-32"
    >
      {/* Ghost index number */}
      <span
        className="pointer-events-none absolute -top-2 right-4 select-none text-[18vw] font-black leading-none text-white/[0.025] md:text-[12vw]"
        style={{ fontFamily: 'var(--font-headline)' }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* ── Text column ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className={`lg:sticky lg:top-28 lg:col-span-5 ${flip ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {/* Tag + index */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-bold tabular-nums" style={{ color: client.accent }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-8" style={{ background: client.accent }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
              {client.industry}
            </span>
            {client.isInHouse && (
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
                In-House
              </span>
            )}
          </div>

          {/* Logo + name */}
          <div className="mb-5 flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1.5">
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </div>
            <h2
              className="text-3xl font-black leading-tight text-white md:text-4xl"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {client.name}
            </h2>
          </div>

          {/* Tagline */}
          <p
            className="mb-6 text-2xl italic md:text-3xl"
            style={{ fontFamily: 'var(--font-serif-accent)', color: client.accent }}
          >
            {client.tagline}
          </p>

          {/* Case study */}
          <p className="mb-8 max-w-xl leading-relaxed text-white/65">{client.caseStudy}</p>

          {/* Metrics */}
          {client.metrics.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-8">
              {client.metrics.map((m) => (
                <div key={m.label}>
                  <div
                    className="text-4xl font-black md:text-5xl"
                    style={{ fontFamily: 'var(--font-headline)', color: client.accent }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/40">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {client.highlights.length > 0 && (
            <ul className="mb-8 flex flex-wrap gap-2">
              {client.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Scope */}
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/35">
              What we handle
            </p>
            <div className="flex flex-wrap gap-2">
              {client.scope.map((s) => (
                <span
                  key={s}
                  className="rounded-md px-2.5 py-1 text-xs font-bold"
                  style={{
                    color: client.accent,
                    background: `${client.accent}14`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Instagram CTA */}
          {client.instagram && (
            <a
              href={client.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-white"
            >
              <span className="material-symbols-outlined text-base">photo_camera</span>
              {client.instagramHandle}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}

          {client.needsContext && (
            <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[11px] text-amber-300/70">
              ⚠ Notes file was empty — copy is placeholder. Add real details to{' '}
              <code className="text-amber-200/90">/client/Solaroof Solutions</code>.
            </p>
          )}
        </motion.div>

        {/* ── Media column ── */}
        <motion.div
          style={{ y }}
          className={`lg:col-span-7 ${flip ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <ReelStrip
            reels={client.reels}
            client={client.name}
            instagram={client.instagram}
            accent={client.accent}
            onOpen={onOpen}
          />

          {hasMedia && (
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white/35">
                Dashboards & deliverables
              </p>
              <div className="grid grid-cols-2 gap-3">
                {client.dashboards.map((m) => (
                  <MediaSlot key={m.src} media={m} kind="dashboard" aspect="aspect-video" />
                ))}
                {client.workSamples.map((m) => (
                  <MediaSlot key={m.src} media={m} kind="sample" aspect="aspect-[4/5]" />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
