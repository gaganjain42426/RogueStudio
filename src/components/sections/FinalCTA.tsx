import Link from 'next/link'
import TextReveal from '@/components/ui/TextReveal'
import Magnetic from '@/components/ui/Magnetic'
import ScaleIn from '@/components/animations/ScaleIn'
import { FinalCTAWatermark } from '@/components/sections/FinalCTAWatermark'

/**
 * FinalCTA — the closing moment. The site's only watermark, a masked
 * title-card reveal on the headline, and a magnetic CTA.
 */
export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-primary-container to-background py-48 px-6 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden relative">
      <FinalCTAWatermark />

      <div className="relative z-10 flex flex-col items-center">
        <TextReveal>
          <h2
            className="text-6xl md:text-[10rem] font-black text-white leading-none"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Ready to go
          </h2>
        </TextReveal>

        <TextReveal delay={0.18}>
          <h2
            className="text-7xl md:text-[12rem] font-black text-primary-container italic leading-none -mt-2 md:-mt-6 pb-4"
            style={{ fontFamily: 'var(--font-serif-accent)' }}
          >
            Rogue?
          </h2>
        </TextReveal>

        <ScaleIn className="mt-14 md:mt-16" delay={0.5}>
          <Magnetic strength={12}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-primary-container px-12 py-5 rounded-full text-xl md:text-2xl font-black hover:scale-105 transition-transform duration-300 shadow-2xl"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              LET&apos;S TALK →
            </Link>
          </Magnetic>
        </ScaleIn>

        <p
          className="mt-8 text-xs uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.64)', fontFamily: 'var(--font-label)' }}
        >
          We reply within 4 working hours
        </p>
      </div>
    </section>
  )
}
