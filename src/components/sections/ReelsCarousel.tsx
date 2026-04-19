'use client'

import { useRef, useEffect } from 'react'
import FadeInUp from '@/components/animations/FadeInUp'

const reels = [
  { id: '1',  src: '/reels/reel-1.mp4',  client: 'Rogue Studio', category: 'Social Media' },
  { id: '2',  src: '/reels/reel-2.mp4',  client: 'Rogue Studio', category: 'Reels' },
  { id: '3',  src: '/reels/reel-3.mp4',  client: 'Rogue Studio', category: 'Content' },
  { id: '4',  src: '/reels/reel-4.mp4',  client: 'Rogue Studio', category: 'Social Media' },
  { id: '5',  src: '/reels/reel-5.mp4',  client: 'Rogue Studio', category: 'Reels' },
  { id: '6',  src: '/reels/reel-6.mp4',  client: 'Rogue Studio', category: 'Content' },
  { id: '7',  src: '/reels/reel-7.mp4',  client: 'Rogue Studio', category: 'Social Media' },
  { id: '8',  src: '/reels/reel-8.mp4',  client: 'Rogue Studio', category: 'Reels' },
  { id: '9',  src: '/reels/reel-9.mp4',  client: 'Rogue Studio', category: 'Content' },
  { id: '10', src: '/reels/reel-10.mp4', client: 'Rogue Studio', category: 'Social Media' },
]

// Duplicate for seamless infinite loop
const infiniteReels = [...reels, ...reels]

const CARD_WIDTH = 260
const CARD_GAP   = 16
const SCROLL_SPEED = 0.8

export default function ReelsCarousel() {
  const trackRef   = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const scrollX    = useRef(0)
  const isPaused   = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
  }, [])

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
      className="py-24 overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 mb-16">
        <FadeInUp>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: '#fa5c1b', fontFamily: 'var(--font-label, sans-serif)' }}
          >
            The Work in Motion
          </p>
          <div>
            <h2
              className="text-6xl md:text-8xl font-black text-white leading-none"
              style={{ fontFamily: 'var(--loaded-bebas, "Bebas Neue", sans-serif)' }}
            >
              Reels that
            </h2>
            <h2
              className="text-6xl md:text-8xl leading-none italic"
              style={{
                color: '#fa5c1b',
                fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)',
              }}
            >
              Stop the Scroll
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
          <div
            key={`${reel.id}-${i}`}
            className="flex-shrink-0 relative overflow-hidden"
            style={{
              width: `${CARD_WIDTH}px`,
              aspectRatio: '9/16',
              borderRadius: '16px',
              background: '#1c1b1b',
            }}
          >
            {/* Video — autoplay all */}
            <video
              src={reel.src}
              muted
              autoPlay
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover"
            />

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
          </div>
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
    </section>
  )
}
