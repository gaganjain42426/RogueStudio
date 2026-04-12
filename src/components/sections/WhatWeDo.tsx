import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

export default function WhatWeDo() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row gap-16 lg:gap-20 items-center">
            {/* Left */}
            <AnimatedItem className="w-full md:w-1/2">
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
            </AnimatedItem>

            {/* Right — grayscale image */}
            <AnimatedItem className="w-full md:w-1/2">
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
            </AnimatedItem>
          </div>
        </AnimatedSection>

        {/* Bottom watermark */}
        <div className="mt-24 text-center overflow-hidden pointer-events-none select-none">
          <h3
            className="text-[12vw] font-black text-primary-container opacity-20 leading-none"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            ROGUE STUDIO
          </h3>
        </div>
      </div>
    </section>
  )
}
