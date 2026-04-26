import { TESTIMONIALS } from '@/lib/constants'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { TestimonialCardClient } from '@/components/sections/TestimonialCardClient'

/**
 * Testimonials — Server Component.
 * H2 heading is server-rendered. Each card is a TestimonialCardClient island
 * for the stagger-variant animation from StaggerContainer.
 */

export default function Testimonials() {
  return (
    <section className="bg-surface py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
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
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerChildren={0.12}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCardClient
              key={t.id}
              id={t.id}
              quote={t.quote}
              author={t.author}
              role={t.role}
              company={t.company}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
