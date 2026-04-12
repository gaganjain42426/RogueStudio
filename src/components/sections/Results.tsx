import Image from 'next/image'
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

export default function Results() {
  return (
    <section className="bg-primary-container py-40 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center relative z-10">
        <AnimatedSection>
          {/* Laptop mockup */}
          <AnimatedItem className="w-full max-w-5xl bg-surface-container-lowest rounded-lg p-4 shadow-2xl">
            <Image
              src="https://picsum.photos/seed/dashboard/1200/700"
              alt="Rogue Studio dashboard showing social media growth analytics"
              width={1200}
              height={700}
              className="w-full rounded shadow-inner"
              sizes="(max-width: 1280px) 100vw, 1000px"
              quality={85}
            />
          </AnimatedItem>

          {/* Headline */}
          <AnimatedItem className="mt-20 text-center max-w-3xl">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-on-primary-fixed leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              From scroll-stopping content to{' '}
              <span
                className="italic font-normal underline decoration-white/30"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                real business results.
              </span>
            </h2>
            <p className="mt-8 text-xl text-on-primary-fixed/80">
              Average 3.4x growth in organic reach within the first 90 days for our partners.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  )
}
