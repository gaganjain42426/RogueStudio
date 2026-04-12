import { TESTIMONIALS } from '@/lib/constants'
import { AnimatedSection, AnimatedCard } from '@/components/ui/AnimatedSection'

export default function Testimonials() {
  return (
    <section className="bg-surface py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <h2
            className="text-center text-4xl md:text-6xl font-black text-white mb-20"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            The{' '}
            <span
              className="text-primary-container italic font-normal"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              Word
            </span>{' '}
            on the Street
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedCard key={t.id} delay={i * 0.1}>
                <div className="bg-surface-container-low p-10 rounded-lg border border-outline-variant/5 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex text-primary-container mb-6 gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className="material-symbols-outlined text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-lg italic text-on-surface leading-relaxed flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-surface-variant text-xl">
                        person
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.author}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
