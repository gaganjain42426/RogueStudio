import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'
import ScaleIn from '@/components/animations/ScaleIn'
import { FinalCTAWatermark } from '@/components/sections/FinalCTAWatermark'

/**
 * FinalCTA — Server Component.
 * H2 headings and CTA link are server-rendered.
 * The breathing ROGUE watermark is isolated in FinalCTAWatermark (client island).
 */
export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-primary-container to-background py-48 px-6 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden relative">
      {/* Background watermark — client island */}
      <FinalCTAWatermark />

      <div className="relative z-10 flex flex-col items-center">
        <FadeInUp>
          <h2
            className="text-6xl md:text-[10rem] font-black text-white leading-none"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Ready to go
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <h2
            className="text-7xl md:text-[12rem] font-black text-primary-container italic leading-none -mt-4 md:-mt-10"
            style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
          >
            Rogue?
          </h2>
        </FadeInUp>

        <ScaleIn className="mt-16 md:mt-20" delay={0.5}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary-container px-12 py-5 rounded-full text-xl md:text-2xl font-black hover:scale-110 transition-transform duration-300 shadow-2xl"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            LET&apos;S TALK →
          </Link>
        </ScaleIn>
      </div>
    </section>
  )
}
