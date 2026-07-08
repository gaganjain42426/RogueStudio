'use client'

import { useRef, useEffect, useState } from 'react'
import FadeInUp from '@/components/animations/FadeInUp'
import LazyVideo from '@/components/LazyVideo'
import type { BunnyReel } from '@/lib/bunny'
import type { ActiveReel } from '@/data/portfolio'
import ReelLightbox from '@/components/portfolio/ReelLightbox'

const CARD_WIDTH = 260
const CARD_GAP   = 16
const SCROLL_SPEED = 1.6

export default function ReelsCarousel({ reels }: { reels: BunnyReel[] }) {
  const trackRef   = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const scrollX    = useRef(0)
  const isPaused   = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeReel, setActiveReel] = useState<ActiveReel | null>(null)

  // Duplicate for seamless infinite loop
  const infiniteReels = [...reels, ...reels]

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    // Half the total scroll width = width of one set of reels
    const halfWidth = (CARD_WIDTH + CARD_GAP) * reels.length

    function tick() {
      if (!isPaused.current) {
        scrollX.current += SCROLL_SPEED
        if (scrollX.current >= halfWidth) {
          scrollX.current = 0
        }
        if (trackRef.current) {
          trackRef.current.scrollLeft = scrollX.current
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [reels.length])

  const handleMouseEnter = () => {
    isPaused.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  const handleMouseLeave = () => {
    isPaused.current = false
  }

  const handleTouchStart = () => {
    isPaused.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  const handleTouchEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false
    }, 2000)
  }

  return (
    <section
      className="py-20 md:py-24 overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 mb-14">
        <FadeInUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-px" style={{ background: '#fa5c1b' }} />
            <p
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#fa5c1b', fontFamily: 'var(--font-label, sans-serif)' }}
            >
              The Full Reel · Gallery
            </p>
          </div>
          <div>
            <h2
              className="text-5xl md:text-7xl font-black text-white leading-[0.95]"
              style={{ fontFamily: 'var(--font-headline, "Epilogue", sans-serif)' }}
            >
              Keep scrolling —
            </h2>
            <h2
              className="text-5xl md:text-7xl leading-[0.95] italic"
              style={{
                color: '#fa5c1b',
                fontFamily: 'var(--font-serif-accent, "Playfair Display", serif)',
              }}
            >
              there&apos;s more where that came from.
            </h2>
          </div>
        </FadeInUp>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-hidden"
        style={{
          gap: `${CARD_GAP}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {infiniteReels.map((reel, i) => (
          <button
            key={`${reel.id}-${i}`}
            onClick={() => setActiveReel({ src: reel.fullSrc, client: reel.client, instagram: '' })}
            aria-label={`Play ${reel.client} reel with sound`}
            className="group flex-shrink-0 relative overflow-hidden text-left appearance-none border-0 p-0 m-0 cursor-pointer"
            style={{
              width: `${CARD_WIDTH}px`,
              aspectRatio: '9/16',
              borderRadius: '16px',
              background: '#1c1b1b',
            }}
          >
            {/* Video — lazy, plays only while on-screen */}
            <LazyVideo
              src={reel.src}
              poster={reel.poster}
              className="w-full h-full object-cover"
              ariaHidden
            />

            {/* Play affordance on hover */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </span>
            </span>

            {/* Bottom info overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-col justify-end px-4 pb-4"
              style={{
                height: '80px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              }}
            >
              <p className="text-white font-bold text-sm leading-tight">{reel.client}</p>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: '#fa5c1b' }}
              >
                {reel.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-[1440px] mx-auto px-8 mt-12 text-center">
        <a
          href="https://instagram.com/roguestudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-wider transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fa5c1b')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          Follow us on Instagram →
        </a>
      </div>

      <ReelLightbox reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}
