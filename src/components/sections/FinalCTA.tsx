import Link from 'next/link'
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-primary-container to-background py-48 px-6 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden relative">
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="text-[40vw] font-black text-white opacity-[0.07] leading-none"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          ROGUE
        </span>
      </div>

      <AnimatedSection className="relative z-10">
        <AnimatedItem>
          <h2
            className="text-6xl md:text-[10rem] font-black text-white leading-none"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Ready to go
          </h2>
          <h2
            className="text-7xl md:text-[12rem] font-black text-primary-container italic leading-none -mt-4 md:-mt-10"
            style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
          >
            Rogue?
          </h2>
        </AnimatedItem>

        <AnimatedItem className="mt-16 md:mt-20">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary-container px-12 py-5 rounded-full text-xl md:text-2xl font-black hover:scale-110 transition-transform duration-300 shadow-2xl"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            LET&apos;S TALK →
          </Link>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  )
}
