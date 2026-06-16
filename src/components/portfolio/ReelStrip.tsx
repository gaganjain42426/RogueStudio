'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { ResolvedReel, ActiveReel } from '@/data/portfolio'
import LazyVideo from '@/components/LazyVideo'
import { reelPreview, reelPoster } from '@/lib/reels'

interface ReelStripProps {
  reels: ResolvedReel[]
  client: string
  instagram: string
  accent: string
  onOpen: (reel: ActiveReel) => void
}

/** A single hover-to-play secondary reel tile. */
function ReelTile({
  reel,
  onClick,
}: {
  reel: ResolvedReel
  onClick: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)

  if (!reel.available) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-dashed border-white/12 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-white/25"
        style={{ aspectRatio: '9/16' }}
      >
        Soon
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.pause()
          ref.current.currentTime = 0
        }
      }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-black"
      style={{ aspectRatio: '9/16' }}
      aria-label="Play reel"
    >
      <video
        ref={ref}
        src={reelPreview(reel.src)}
        poster={reelPoster(reel.src)}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
          play_arrow
        </span>
      </span>
    </button>
  )
}

/**
 * ReelStrip — a hero "phone" playing the primary reel (autoplay, muted, loop)
 * plus a strip of secondary reel tiles. Clicking any opens the lightbox with sound.
 * Gracefully degrades to a "reel coming soon" phone + Instagram link when no
 * local video exists yet.
 */
export default function ReelStrip({ reels, client, instagram, accent, onOpen }: ReelStripProps) {
  const available = reels.filter((r) => r.available)
  const primary = available[0]
  const secondary = reels.slice(reels.indexOf(primary ?? reels[0]) + 1).slice(0, 4)

  return (
    <div className="flex flex-col gap-4">
      {/* Primary phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto w-full max-w-[300px]"
      >
        {/* accent glow */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-30 blur-3xl"
          style={{ background: accent }}
          aria-hidden="true"
        />
        <div
          className="relative overflow-hidden rounded-[32px] border-[6px] border-[#1a1a1a] bg-black shadow-2xl"
          style={{ aspectRatio: '9/16' }}
        >
          {primary ? (
            <>
              <LazyVideo
                src={reelPreview(primary.src)}
                poster={reelPoster(primary.src)}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => onOpen({ src: primary.src, client, instagram })}
                aria-label={`Play ${client} reel with sound`}
                className="group absolute inset-0 flex items-end justify-center pb-6"
              >
                <span className="flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    volume_up
                  </span>
                  Play with sound
                </span>
              </button>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="material-symbols-outlined text-3xl text-white/30">movie</span>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Reel coming soon
              </p>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  Watch on Instagram →
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Secondary reel strip */}
      {secondary.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {secondary.map((reel, i) => (
            <ReelTile
              key={`${reel.src}-${i}`}
              reel={reel}
              onClick={() => onOpen({ src: reel.src, client, instagram })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
