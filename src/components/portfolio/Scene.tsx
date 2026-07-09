'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { ResolvedClient, ActiveReel } from '@/data/portfolio'
import LazyVideo from '@/components/LazyVideo'
import Icon from '@/components/ui/Icon'
import TextReveal from '@/components/ui/TextReveal'
import { reelPreview, reelPoster } from '@/lib/reels'
import { EASE, DUR, VIEWPORT } from '@/lib/motion'

/**
 * Scene — one client, one chapter.
 *
 * The portfolio plays as a film: each scene owns a full viewport, its own
 * accent lighting, a slate line, and a media cluster staged in CSS 3D
 * (perspective planes + scroll parallax — no WebGL, all transform-only).
 * Composition alternates per scene so no two consecutive chapters repeat.
 */

interface SceneProps {
  client: ResolvedClient
  index: number
  onOpen: (reel: ActiveReel) => void
}

function MediaCluster({
  client,
  onOpen,
  parallax,
}: {
  client: ResolvedClient
  onOpen: (reel: ActiveReel) => void
  parallax: { phone: ReturnType<typeof useTransform<number, number>>; tiles: ReturnType<typeof useTransform<number, number>> }
}) {
  const available = client.reels.filter((r) => r.available)
  const primary = available[0]
  const secondary = available.slice(1, 3)

  return (
    <div
      className="relative mx-auto w-full max-w-[440px]"
      style={{ perspective: '1200px' }}
    >
      {/* Accent glow behind the cluster */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-[48px] opacity-30 blur-3xl"
        style={{ background: client.accent }}
        aria-hidden="true"
      />

      {/* Primary phone plane */}
      <motion.div style={{ y: parallax.phone }} className="relative z-10 mx-auto w-[68%]">
        <motion.div
          initial={{ rotateX: 10, opacity: 0, y: 60 }}
          whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="relative overflow-hidden rounded-[30px] border-[5px] border-[#1a1a1a] bg-black shadow-2xl"
          style={{ aspectRatio: '9/16', transformStyle: 'preserve-3d' }}
        >
          {primary ? (
            <>
              <LazyVideo
                src={reelPreview(primary.src)}
                poster={reelPoster(primary.src)}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => onOpen({ src: primary.src, client: client.name, instagram: client.instagram })}
                aria-label={`Play ${client.name} reel with sound`}
                className="group absolute inset-0 flex items-end justify-center pb-6"
              >
                <span className="flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-transform group-hover:scale-105">
                  <Icon name="volume" size={14} />
                  Play with sound
                </span>
              </button>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <Icon name="film" size={28} className="text-white/30" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                Reel in the edit bay
              </p>
              {client.instagram && (
                <a
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: client.accent }}
                >
                  Watch on Instagram →
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Secondary planes — angled into depth on either side */}
      {secondary.map((reel, i) => (
        <motion.div
          key={reel.src}
          style={{ y: parallax.tiles }}
          className={`absolute top-[12%] z-0 w-[38%] ${i === 0 ? '-left-[6%]' : '-right-[6%]'} hidden sm:block`}
        >
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: 0.2 + i * 0.12 }}
            onClick={() => onOpen({ src: reel.src, client: client.name, instagram: client.instagram })}
            aria-label={`Play ${client.name} reel with sound`}
            className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl"
            style={{
              aspectRatio: '9/16',
              transform: `rotateY(${i === 0 ? 10 : -10}deg)`,
              opacity: 0.85,
            }}
          >
            <LazyVideo
              src={reelPreview(reel.src)}
              poster={reelPoster(reel.src)}
              className="h-full w-full object-cover"
              ariaHidden
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
              <Icon name="play" size={26} className="text-white" />
            </span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}

export default function Scene({ client, index, onOpen }: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const phoneY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const tilesY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [90, -90])
  const lightX = useTransform(scrollYProgress, [0, 1], ['20%', '80%'])

  const mediaLeft = index % 2 === 1
  const sceneNo = String(index + 1).padStart(2, '0')

  return (
    <section
      ref={ref}
      id={client.slug}
      data-scene={sceneNo}
      className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-8 md:py-36 scroll-mt-20"
      style={{ background: '#0D0D0D' }}
    >
      {/* Scene lighting — accent key light that travels with scroll */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at ${reduced ? '50%' : ''} 30%, ${client.accent}1f, transparent 70%)`,
          backgroundPositionX: reduced ? undefined : lightX,
        }}
        aria-hidden="true"
      />
      <div className="film-grain" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Slate line */}
        <div
          className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
        >
          <span style={{ color: client.accent }}>Scene {sceneNo}</span>
          <span className="h-px w-10 bg-white/20" aria-hidden="true" />
          <span>{client.industry}</span>
          {client.isInHouse && <span className="rounded-full border border-white/20 px-2 py-0.5">In-house brand</span>}
        </div>

        <div className={`mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 ${mediaLeft ? '' : ''}`}>
          {/* Text column */}
          <div className={`lg:col-span-6 ${mediaLeft ? 'lg:order-2' : ''}`}>
            <TextReveal>
              <h2
                className="text-5xl font-black leading-[0.95] text-white md:text-7xl"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {client.name}
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p
                className="mt-3 text-2xl italic md:text-3xl"
                style={{ fontFamily: 'var(--font-serif-accent)', color: client.accent }}
              >
                {client.tagline}
              </p>
            </TextReveal>

            <p className="mt-8 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: 'rgba(229,226,225,0.72)' }}>
              {client.caseStudy}
            </p>

            {/* Scope */}
            <div className="mt-8 flex flex-wrap gap-2">
              {client.scope.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Numbers — the reason this client is on the page */}
            {client.metrics.length > 0 && (
              <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
                {client.metrics.map((m) => (
                  <div key={m.label}>
                    <dd
                      className="text-5xl font-black md:text-6xl"
                      style={{ fontFamily: 'var(--font-headline)', color: client.accent }}
                    >
                      {m.value}
                    </dd>
                    <dt
                      className="mt-1 text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(255,255,255,0.64)' }}
                    >
                      {m.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
            {client.metrics.length === 0 && client.highlights.length > 0 && (
              <ul className="mt-10 space-y-2">
                {client.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-white/75">
                    <Icon name="check" size={15} style={{ color: client.accent }} />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {client.instagram && (
              <a
                href={client.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-white"
              >
                <Icon name="instagram" size={16} style={{ color: client.accent }} />
                {client.instagramHandle}
              </a>
            )}
          </div>

          {/* Media column */}
          <div className={`lg:col-span-6 ${mediaLeft ? 'lg:order-1' : ''}`}>
            <MediaCluster client={client} onOpen={onOpen} parallax={{ phone: phoneY, tiles: tilesY }} />
          </div>
        </div>
      </div>
    </section>
  )
}
