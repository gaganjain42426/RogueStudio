'use client'

import { motion, useReducedMotion } from 'framer-motion'
import LazyVideo from '@/components/LazyVideo'
import { reelPreview, reelPoster } from '@/lib/reels'

const BUNNY_CDN_HOST = 'https://vz-2d00a478-198.b-cdn.net'

const bunnyPreview = (guid: string) => `${BUNNY_CDN_HOST}/${guid}/play_240p.mp4`
const bunnyPoster = (guid: string) => `${BUNNY_CDN_HOST}/${guid}/thumbnail.jpg`

const REELS = [
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

const COL_A = REELS.filter((_, i) => i % 2 === 0)
const COL_B = REELS.filter((_, i) => i % 2 === 1)

function ReelCard({
  src,
  poster,
  client,
  category,
}: {
  src: string
  poster?: string
  client: string
  category: string
}) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 group"
      style={{
        width: '100%',
        aspectRatio: '9 / 16',
        borderRadius: '18px',
        background: '#1c1b1b',
        boxShadow: '0 20px 40px -20px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset',
      }}
    >
      <LazyVideo
        src={poster ? src : reelPreview(src)}
        poster={poster ?? reelPoster(src)}
        className="w-full h-full object-cover"
        ariaHidden
      />
      <div
        className="absolute top-3 left-3 px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase rounded-full"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          color: '#fa5c1b',
          fontFamily: 'var(--font-label)',
          border: '1px solid rgba(250,92,27,0.25)',
        }}
      >
        {category}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)' }}
      >
        <p
          className="text-white text-sm font-semibold leading-tight"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {client}
        </p>
      </div>
    </div>
  )
}

function ReelColumn({
  reels,
  direction,
  duration,
  delay = 0,
}: {
  reels: typeof REELS
  direction: 'up' | 'down'
  duration: number
  delay?: number
}) {
  const doubled = [...reels, ...reels]
  const animClass = direction === 'up' ? 'hero-reel-col-up' : 'hero-reel-col-down'

  return (
    <div className="relative overflow-hidden" style={{ height: '100%' }}>
      <div
        className={`flex flex-col gap-4 ${animClass}`}
        style={
          {
            '--reel-duration': `${duration}s`,
            '--reel-delay': `${delay}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((reel, i) => (
          <ReelCard
            key={`${reel.id}-${i}`}
            src={reel.src}
            poster={'poster' in reel ? reel.poster : undefined}
            client={reel.client}
            category={reel.category}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * HeroReelStack — the right-column video reel grid + entry animation.
 * Kept as a client island because it uses Framer Motion animate (page-load)
 * and CSS custom properties for the infinite scroll animation.
 */
export function HeroReelStack() {
  const prefersReduced = useReducedMotion()

  return (
    <>
      <motion.div
        className="lg:col-span-6 xl:col-span-5 relative w-full"
        initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.6 }}
      >
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            height: 'clamp(440px, 72vh, 720px)',
            maxWidth: 560,
            transform: 'rotate(-3deg)',
            transformOrigin: 'center',
          }}
        >
          <div
            className="absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 60% 50%, rgba(250,92,27,0.35), transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 gap-4 h-full">
            <ReelColumn reels={COL_A} direction="up" duration={28} />
            <div className="translate-y-8">
              <ReelColumn reels={COL_B} direction="down" duration={34} delay={0.4} />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.6) 60%, transparent 100%)' }}
            aria-hidden="true"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 justify-end mt-6 pr-2">
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-label)' }}
          >
            Live from the studio
          </span>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#fa5c1b' }}
          />
        </div>
      </motion.div>

      {/* CSS keyframes for reel column animation */}
      <style>{`
        @keyframes hero-dot-pulse {
          from { opacity: 0.04; }
          to   { opacity: 0.22; }
        }
        @keyframes hero-reel-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes hero-reel-scroll-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .hero-reel-col-up {
          animation: hero-reel-scroll-up var(--reel-duration, 30s) linear infinite;
          animation-delay: var(--reel-delay, 0s);
          will-change: transform;
        }
        .hero-reel-col-down {
          animation: hero-reel-scroll-down var(--reel-duration, 30s) linear infinite;
          animation-delay: var(--reel-delay, 0s);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reel-col-up,
          .hero-reel-col-down {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}
