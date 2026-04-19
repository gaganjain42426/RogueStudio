'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

const CARD_WIDTH = 260
const CARD_GAP   = 16
const SCROLL_STEP = CARD_WIDTH + CARD_GAP

export default function ReelsCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([])
  const [playing,   setPlaying]   = useState<Record<string, boolean>>({})
  const [activeIdx, setActiveIdx] = useState(0)
  const touchStartX = useRef(0)

  // Update active dot on scroll
  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const paddingLeft = (window.innerWidth - CARD_WIDTH) / 2
    const scrolled    = el.scrollLeft
    const idx         = Math.round((scrolled) / SCROLL_STEP)
    setActiveIdx(Math.max(0, Math.min(idx, reels.length - 1)))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollBy = useCallback((dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' })
  }, [])

  const scrollToIdx = useCallback((idx: number) => {
    trackRef.current?.scrollTo({ left: idx * SCROLL_STEP, behavior: 'smooth' })
  }, [])

  const onMouseEnter = useCallback((idx: number, id: string) => {
    const v = videoRefs.current[idx]
    if (!v) return
    v.play().then(() => setPlaying(p => ({ ...p, [id]: true }))).catch(() => {})
  }, [])

  const onMouseLeave = useCallback((idx: number, id: string) => {
    const v = videoRefs.current[idx]
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(p => ({ ...p, [id]: false }))
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      scrollBy(delta > 0 ? 1 : -1)
    }
  }, [scrollBy])

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

      {/* Carousel wrapper — relative for arrow positioning */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-[#fa5c1b] hover:border-[#fa5c1b] transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-[#fa5c1b] hover:border-[#fa5c1b] transition-all duration-200"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="flex overflow-x-auto"
          style={{
            gap: `${CARD_GAP}px`,
            scrollSnapType: 'x mandatory',
            paddingLeft:  `calc((100vw - ${CARD_WIDTH}px) / 2)`,
            paddingRight: `calc((100vw - ${CARD_WIDTH}px) / 2)`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          {reels.map((reel, i) => (
            <FadeInUp key={reel.id} delay={i * 0.05}>
              <div
                className="flex-shrink-0 cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  width: `${CARD_WIDTH}px`,
                  aspectRatio: '9/16',
                  borderRadius: '16px',
                  background: '#1c1b1b',
                  scrollSnapAlign: 'center',
                }}
                onMouseEnter={() => onMouseEnter(i, reel.id)}
                onMouseLeave={() => onMouseLeave(i, reel.id)}
              >
                {/* Video */}
                <video
                  ref={el => { videoRefs.current[i] = el }}
                  src={reel.src}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="w-full h-full object-cover"
                />

                {/* Play icon overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                  style={{ opacity: playing[reel.id] ? 0 : 1 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    {/* Play triangle */}
                    <div
                      className="ml-1"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop:    '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft:   '18px solid white',
                      }}
                    />
                  </div>
                </div>

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
            </FadeInUp>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {reels.map((reel, i) => (
          <button
            key={reel.id}
            onClick={() => scrollToIdx(i)}
            aria-label={`Go to reel ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:      i === activeIdx ? '32px' : '6px',
              height:     '6px',
              background: i === activeIdx ? '#fa5c1b' : 'rgba(255,255,255,0.2)',
            }}
          />
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
