import Image from 'next/image'
import FadeInLeft from '@/components/animations/FadeInLeft'
import FadeInRight from '@/components/animations/FadeInRight'
import { CountUpClient } from '@/components/sections/CountUpClient'

/**
 * About — Server Component.
 * H2 heading, body text, and photo grid are server-rendered.
 * CountUpClient (uses IntersectionObserver + setState) is the only client island.
 */

const photos = [
  { src: 'https://picsum.photos/seed/team1/400/500', alt: 'Rogue Studio creative team', aspect: 'aspect-[4/5]' },
  { src: 'https://picsum.photos/seed/team2/400/400', alt: 'Team brainstorming session', aspect: 'aspect-square' },
  { src: 'https://picsum.photos/seed/team3/400/400', alt: 'Photographer adjusting studio equipment', aspect: 'aspect-square' },
  { src: 'https://picsum.photos/seed/team4/400/500', alt: 'Designer sketching on tablet', aspect: 'aspect-[4/5]' },
]

export default function About() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — text */}
          <FadeInLeft>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              World-class creative{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                setting a higher standard.
              </span>
            </h2>
            <p className="mt-8 text-lg text-on-tertiary-fixed-variant leading-relaxed max-w-md">
              We aren&apos;t just an agency in Jaipur. We are a global output machine powered by
              local culture and international ambition. Our team is a mix of obsessed designers,
              data junkies, and visual storytellers.
            </p>
            <div className="mt-12 flex gap-12">
              <div className="flex flex-col">
                <CountUpClient target={12} suffix="+" />
                <span className="text-xs font-bold uppercase tracking-widest mt-2 text-on-tertiary-fixed-variant">
                  Visionaries
                </span>
              </div>
              <div className="flex flex-col">
                <CountUpClient target={150} suffix="+" />
                <span className="text-xs font-bold uppercase tracking-widest mt-2 text-on-tertiary-fixed-variant">
                  Projects
                </span>
              </div>
            </div>
          </FadeInLeft>

          {/* Right — asymmetric photo collage */}
          <FadeInRight className="grid grid-cols-2 gap-4" delay={0.2}>
            {/* Col 1 — offset down */}
            <div className="space-y-4 pt-12">
              <div className={`${photos[0].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
              <div className={`${photos[1].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            {/* Col 2 — normal */}
            <div className="space-y-4">
              <div className={`${photos[2].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[2].src}
                  alt={photos[2].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
              <div className={`${photos[3].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[3].src}
                  alt={photos[3].alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  )
}
  { src: 'https://picsum.photos/seed/team2/400/400', alt: 'Team brainstorming session', aspect: 'aspect-square' },
  { src: 'https://picsum.photos/seed/team3/400/400', alt: 'Photographer adjusting studio equipment', aspect: 'aspect-square' },
  { src: 'https://picsum.photos/seed/team4/400/500', alt: 'Designer sketching on tablet', aspect: 'aspect-[4/5]' },
]

export default function About() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — text */}
          <FadeInLeft>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              World-class creative{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                setting a higher standard.
              </span>
            </h2>
            <p className="mt-8 text-lg text-on-tertiary-fixed-variant leading-relaxed max-w-md">
              We aren&apos;t just an agency in Jaipur. We are a global output machine powered by
              local culture and international ambition. Our team is a mix of obsessed designers,
              data junkies, and visual storytellers.
            </p>
            <div className="mt-12 flex gap-12">
              <div className="flex flex-col">
                <CountUp target={12} suffix="+" />
                <span className="text-xs font-bold uppercase tracking-widest mt-2 text-on-tertiary-fixed-variant">
                  Visionaries
                </span>
              </div>
              <div className="flex flex-col">
                <CountUp target={150} suffix="+" />
                <span className="text-xs font-bold uppercase tracking-widest mt-2 text-on-tertiary-fixed-variant">
                  Projects
                </span>
              </div>
            </div>
          </FadeInLeft>

          {/* Right — asymmetric photo collage */}
          <FadeInRight className="grid grid-cols-2 gap-4" delay={0.2}>
            {/* Col 1 — offset down */}
            <div className="space-y-4 pt-12">
              <div className={`${photos[0].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
              <div className={`${photos[1].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            {/* Col 2 — normal */}
            <div className="space-y-4">
              <div className={`${photos[2].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[2].src}
                  alt={photos[2].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
              <div className={`${photos[3].aspect} rounded-lg overflow-hidden bg-surface`}>
                <Image
                  src={photos[3].src}
                  alt={photos[3].alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  )
}
