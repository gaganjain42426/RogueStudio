import FadeInUp from '@/components/animations/FadeInUp'
import { ResultsParallaxImage } from '@/components/sections/ResultsParallaxImage'

/**
 * Results — Server Component.
 * H2 and body copy are server-rendered.
 * Parallax image (useScroll/useTransform) is in ResultsParallaxImage (client island).
 */
export default function Results() {
  return (
    <section className="bg-primary-container py-40 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center relative z-10">
        {/* Laptop mockup with parallax */}
        <ResultsParallaxImage />

        {/* Headline */}
        <FadeInUp className="mt-20 text-center max-w-3xl" delay={0.4}>
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
        </FadeInUp>
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  )
}
