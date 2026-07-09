import { TESTIMONIALS } from '@/lib/constants'
import FadeInUp from '@/components/animations/FadeInUp'

/**
 * Testimonials — editorial pull-quotes.
 *
 * No star rows, no placeholder avatars, no cards pretending to be reviews:
 * large serif quotes attributed plainly. Quiet confidence over marketplace
 * furniture.
 */
export default function Testimonials() {
  return (
    <section className="bg-surface py-32 px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <FadeInUp>
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">
            After 90 days
          </span>
          <h2
            className="mt-6 text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            What clients{' '}
            <span
              className="italic font-normal"
              style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
            >
              actually say.
            </span>
          </h2>
        </FadeInUp>

        <div className="mt-20 space-y-16">
          {TESTIMONIALS.map((t, i) => (
            <FadeInUp key={t.id} delay={i * 0.1}>
              <figure
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-l-2 pl-6 md:pl-10"
                style={{ borderColor: 'rgba(250,92,27,0.5)' }}
              >
                <blockquote className="md:col-span-9">
                  <p
                    className="text-2xl md:text-[34px] leading-snug italic text-white/90"
                    style={{ fontFamily: 'var(--font-serif-accent)' }}
                  >
                    “{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="md:col-span-3 md:text-right self-end">
                  <span
                    className="block font-bold text-white text-sm"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {t.author}
                  </span>
                  <span
                    className="block text-xs uppercase tracking-widest mt-1"
                    style={{ color: 'rgba(255,255,255,0.64)' }}
                  >
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
