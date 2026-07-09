import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'

/**
 * Services — the single services statement on the homepage.
 * Three offers, each anchored to a proof point from real client work.
 * No icons; the type and the numbers carry it. Deep detail lives at /services.
 */

const OFFERS = [
  {
    n: '01',
    title: 'Content Production',
    proof: '200+ reels, 40M+ views',
    description:
      'Scripting, shooting, and editing short-form video from our own studio — founder features, client testimonials, on-site coverage. The clips playing in the hero are this service.',
  },
  {
    n: '02',
    title: 'Social Media Management',
    proof: 'Full pipeline, script to post',
    description:
      'Content calendars, captions, posting, and community — the whole organic engine, run for you. For Naman Vaastu we manage three founders’ personal brands simultaneously.',
  },
  {
    n: '03',
    title: 'Performance Ads',
    proof: '10X ROAS, leads under ₹15',
    description:
      'Meta campaigns built on the content we shoot, so the creative and the media buying are one team. Sarvatra Energy has run on this system since day one.',
  },
]

export default function Services() {
  return (
    <section className="bg-surface-container-low py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">
            What we do
          </span>
          <h2
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Three services.{' '}
            <span
              className="italic font-normal"
              style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
            >
              One pipeline.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg" style={{ color: 'rgba(229,226,225,0.7)' }}>
            Most agencies hand your brand between departments. Here the people who
            script your reel also cut it, post it, and run the ads behind it.
          </p>
        </FadeInUp>

        <div className="mt-20 border-t border-white/10">
          {OFFERS.map((offer) => (
            <div
              key={offer.n}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline border-b border-white/10 py-10 transition-colors hover:bg-white/[0.02]"
            >
              <span
                className="md:col-span-1 text-sm"
                style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
              >
                {offer.n}
              </span>
              <h3
                className="md:col-span-4 text-2xl md:text-4xl font-black text-white"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {offer.title}
              </h3>
              <p
                className="md:col-span-3 text-sm uppercase tracking-[0.14em]"
                style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.64)' }}
              >
                {offer.proof}
              </p>
              <p className="md:col-span-4 text-base leading-relaxed" style={{ color: 'rgba(229,226,225,0.66)' }}>
                {offer.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-colors"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Full service detail →
          </Link>
        </div>
      </div>
    </section>
  )
}
