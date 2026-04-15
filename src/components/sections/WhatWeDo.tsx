import Image from 'next/image'
import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'
import FadeInLeft from '@/components/animations/FadeInLeft'
import FadeInRight from '@/components/animations/FadeInRight'

export default function WhatWeDo() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-20 items-center">
          {/* Left */}
          <FadeInLeft className="w-full md:w-1/2" delay={0.1}>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Creativity Meets{' '}
              <span
                className="text-primary-container italic font-normal"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Strategy
              </span>
            </h2>
            <p className="mt-8 text-lg lg:text-xl text-on-tertiary-fixed-variant max-w-lg leading-relaxed">
              We don&apos;t just post. We build worlds. Our approach blends deep analytical
              research with unapologetic artistic direction to move needles and hearts.
            </p>
            <Link
              href="/work"
              className="mt-10 inline-flex items-center gap-2 border border-on-tertiary-fixed/20 text-on-tertiary-fixed px-8 py-3 rounded-full font-bold text-sm hover:bg-on-tertiary-fixed hover:text-tertiary-fixed transition-colors duration-300"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              See Our Work →
            </Link>
          </FadeInLeft>

          {/* Right — grayscale image */}
          <FadeInRight className="w-full md:w-1/2" delay={0.2}>
            <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden group">
              <Image
                src="https://picsum.photos/seed/whatwedo/600/750"
                alt="Rogue Studio creative team at work"
                width={600}
                height={750}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeInRight>
        </div>

        {/* Bottom watermark */}
        <FadeInUp className="mt-24 text-center overflow-hidden pointer-events-none select-none" delay={0.3}>
          <h3
            className="text-[12vw] font-black text-primary-container opacity-20 leading-none"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            ROGUE STUDIO
          </h3>
        </FadeInUp>
      </div>
    </section>
  )
}
