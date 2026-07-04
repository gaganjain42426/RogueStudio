'use client'

import { useRef, useEffect } from 'react'
import FadeInUp from '@/components/animations/FadeInUp'
import LazyVideo from '@/components/LazyVideo'

const BUNNY_CDN_HOST = 'https://vz-2d00a478-198.b-cdn.net'
const bunnyPreview = (guid: string) => `${BUNNY_CDN_HOST}/${guid}/play_240p.mp4`
const bunnyPoster = (guid: string) => `${BUNNY_CDN_HOST}/${guid}/thumbnail.jpg`

const reels = [
  { id: '11', src: bunnyPreview('ddb8875c-8421-459f-917a-d27b9451cc11'), poster: bunnyPoster('ddb8875c-8421-459f-917a-d27b9451cc11'), client: 'Fashion Client', category: 'UGC' },
  { id: '12', src: bunnyPreview('42e149d4-fd4b-4e11-a6dc-3725a1385fa7'), poster: bunnyPoster('42e149d4-fd4b-4e11-a6dc-3725a1385fa7'), client: 'Fashion Client', category: 'UGC' },
  { id: '13', src: bunnyPreview('60179654-ec64-4e42-8748-39035f9fac4a'), poster: bunnyPoster('60179654-ec64-4e42-8748-39035f9fac4a'), client: 'Fashion Client', category: 'UGC' },
  { id: '14', src: bunnyPreview('2e0d8f27-dcdc-45aa-b9fe-09f61a757e44'), poster: bunnyPoster('2e0d8f27-dcdc-45aa-b9fe-09f61a757e44'), client: 'Fashion Client', category: 'UGC' },
  { id: '15', src: bunnyPreview('fa0ec563-31b4-4020-8b04-558cc9c94746'), poster: bunnyPoster('fa0ec563-31b4-4020-8b04-558cc9c94746'), client: 'Fashion Client', category: 'UGC' },
  { id: '16', src: bunnyPreview('e87304f7-9f5e-4d88-8419-5338a285dcb5'), poster: bunnyPoster('e87304f7-9f5e-4d88-8419-5338a285dcb5'), client: 'Fashion Client', category: 'UGC' },
  { id: '17', src: bunnyPreview('f3b8bed6-a0eb-46c4-b058-341b06e6b6d5'), poster: bunnyPoster('f3b8bed6-a0eb-46c4-b058-341b06e6b6d5'), client: 'Fashion Client', category: 'UGC' },
  { id: '18', src: bunnyPreview('1de7fcf6-af74-4839-ae9e-99ae38a4657b'), poster: bunnyPoster('1de7fcf6-af74-4839-ae9e-99ae38a4657b'), client: 'Fashion Client', category: 'UGC' },
  { id: '19', src: bunnyPreview('8053d536-0f8a-411f-83d7-59bfcca3f895'), poster: bunnyPoster('8053d536-0f8a-411f-83d7-59bfcca3f895'), client: 'Fashion Client', category: 'UGC' },
  { id: '20', src: bunnyPreview('359c83b5-2ed9-4682-8790-05d4290fdb66'), poster: bunnyPoster('359c83b5-2ed9-4682-8790-05d4290fdb66'), client: 'Fashion Client', category: 'UGC' },
  { id: '21', src: bunnyPreview('b3b7b4e1-322d-4d56-8c79-b4e0049d476f'), poster: bunnyPoster('b3b7b4e1-322d-4d56-8c79-b4e0049d476f'), client: 'Fashion Client', category: 'UGC' },
  { id: '22', src: bunnyPreview('9ede39eb-1e82-4605-a0df-97fc4dfb6773'), poster: bunnyPoster('9ede39eb-1e82-4605-a0df-97fc4dfb6773'), client: 'Fashion Client', category: 'UGC' },
  { id: '23', src: bunnyPreview('ee8e18db-e178-486b-824e-a7b99664aa4d'), poster: bunnyPoster('ee8e18db-e178-486b-824e-a7b99664aa4d'), client: 'Fashion Client', category: 'UGC' },
  { id: '24', src: bunnyPreview('14e80aa2-b8dc-4281-8123-17527f039a4e'), poster: bunnyPoster('14e80aa2-b8dc-4281-8123-17527f039a4e'), client: 'Fashion Client', category: 'UGC' },
  { id: '25', src: bunnyPreview('daa39ec5-61af-4448-bbc4-0611ce4bba98'), poster: bunnyPoster('daa39ec5-61af-4448-bbc4-0611ce4bba98'), client: 'Fashion Client', category: 'UGC' },
  { id: '26', src: bunnyPreview('ad5c6e68-8b3e-4d7b-adf3-2331afdf3910'), poster: bunnyPoster('ad5c6e68-8b3e-4d7b-adf3-2331afdf3910'), client: 'Fashion Client', category: 'UGC' },
  { id: '27', src: bunnyPreview('989111d8-8005-48a2-aa0e-a32bd38e906c'), poster: bunnyPoster('989111d8-8005-48a2-aa0e-a32bd38e906c'), client: 'Fashion Client', category: 'UGC' },
  { id: '28', src: bunnyPreview('29d4be8e-cf12-4cb4-82a3-f4e81c02955b'), poster: bunnyPoster('29d4be8e-cf12-4cb4-82a3-f4e81c02955b'), client: 'Fashion Client', category: 'UGC' },
  { id: '29', src: bunnyPreview('8fb6f750-5dcb-4a11-8d9b-91d5932d4f88'), poster: bunnyPoster('8fb6f750-5dcb-4a11-8d9b-91d5932d4f88'), client: 'Fashion Client', category: 'UGC' },
  { id: '30', src: bunnyPreview('204c0ec8-40f1-47c3-bdc3-731b2afa5c34'), poster: bunnyPoster('204c0ec8-40f1-47c3-bdc3-731b2afa5c34'), client: 'Fashion Client', category: 'UGC' },
  { id: '31', src: bunnyPreview('14277dde-97a9-4b9f-be24-c53708d3d9b6'), poster: bunnyPoster('14277dde-97a9-4b9f-be24-c53708d3d9b6'), client: 'Fashion Client', category: 'UGC' },
  { id: '32', src: bunnyPreview('61c58869-553a-40d0-9820-c6b91dce0ba8'), poster: bunnyPoster('61c58869-553a-40d0-9820-c6b91dce0ba8'), client: 'Fashion Client', category: 'UGC' },
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
            {/* Video — lazy, plays only while on-screen */}
            <LazyVideo
              src={reel.src}
              poster={reel.poster}
              className="w-full h-full object-cover"
              ariaHidden
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
