import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

const SLUG = 'instagram-marketing-jaipur'
const CANONICAL = `https://www.roguestudio.in/${SLUG}`

export const metadata: Metadata = {
  title: 'Instagram Marketing Agency Jaipur | Rogue Studio',
  description:
    'Rogue Studio is Jaipur\'s Instagram marketing agency — account strategy, Reels production, paid ads, and growth management that builds real audiences and drives sales.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Instagram Marketing Agency Jaipur | Rogue Studio',
    description:
      'Instagram strategy, content, and paid ads for Jaipur brands. We turn your profile into a lead machine.',
    url: CANONICAL,
    images: [{ url: '/og/home-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Instagram Marketing',
  description:
    'Instagram account strategy, Reels production, organic growth, and paid advertising for brands and businesses in Jaipur.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Rogue Studio',
    address: {
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  },
  areaServed: 'Jaipur',
  url: CANONICAL,
}

const FAQ_ITEMS = [
  {
    q: 'How do you grow Instagram followers for Jaipur businesses?',
    a: "We focus on content quality, hook engineering, and strategic hashtag use — not follow/unfollow tricks. Sustainable Instagram growth comes from Reels that get pushed by the algorithm, collabs with relevant local accounts, and consistent posting that signals reliability to the platform.",
  },
  {
    q: 'Do you run Instagram ads?',
    a: 'Yes. We manage Meta Ads Manager for Instagram campaigns — from awareness Reels to conversion-focused stories and DM campaigns. We handle creative, targeting, A/B testing, and budget optimisation.',
  },
  {
    q: 'How many posts per month is standard?',
    a: "Our standard Instagram retainer includes 12–16 posts per month (a mix of Reels, carousels, and statics) plus Stories. We've found this cadence optimal for Jaipur-scale brands — enough volume to stay relevant without sacrificing quality.",
  },
  {
    q: 'Can you help with influencer partnerships in Jaipur?',
    a: 'Yes — we have relationships with Jaipur-based micro and mid-tier creators across fashion, food, lifestyle, and business niches. We handle outreach, briefs, and performance tracking for influencer campaigns.',
  },
  {
    q: 'What results can I realistically expect from Instagram marketing?',
    a: 'For a well-run account with consistent Reels, expect 2–5x reach growth within 90 days. Direct business outcomes (DMs, link clicks, sales) depend heavily on your offer and funnel. We set baseline KPIs in month one so you can track real progress.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function InstagramMarketingJaipurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="bg-background min-h-[80vh] flex items-center py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto w-full">
          <AnimateIn variant="fadeUp">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary-container mb-6"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Instagram Marketing · Jaipur
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white max-w-4xl"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Instagram marketing agency Jaipur —{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                your feed should be doing sales.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="mt-8 text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              Jaipur brands that post randomly and hope for virality are leaving money on the
              table. We build Instagram presences that are strategic, cinematic, and engineered to
              convert followers into customers.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary-container text-on-primary-fixed px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-transform duration-300"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Get a Free Audit →
              </Link>
              <Link
                href="/work"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-colors"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                View Our Work
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHY ROGUE ───────────────────────────────────────────────────── */}
      <section className="bg-surface-container py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimateIn variant="fadeUp">
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-16"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Why Jaipur brands choose{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Rogue Studio
              </span>{' '}
              for Instagram
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Content that earns the algorithm',
                body: 'We reverse-engineer what Instagram pushes: strong hooks, high completion rates, saves and shares over likes. Every piece of content is built with distribution logic, not just aesthetics.',
              },
              {
                title: 'Jaipur-native visual language',
                body: 'We understand the colour palette, cultural references, and consumer psychology that makes Jaipur audiences stop and engage. Your content will feel local, not imported.',
              },
              {
                title: 'Full-funnel approach',
                body: 'Instagram is not just top-of-funnel. We build strategies that move followers from discovery through to DM inquiries, link clicks, and purchases — with Reels, Stories, and paid ads working in tandem.',
              },
              {
                title: 'Partners, not post-and-ghost vendors',
                body: "Monthly reviews, strategy pivots based on data, and a dedicated account lead who knows your brand. We're in your DMs when something needs a quick decision.",
              },
            ].map(({ title, body }, i) => (
              <AnimateIn key={title} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-surface-container-high p-8 rounded-xl border border-outline-variant/10 h-full">
                  <h3
                    className="text-xl font-black text-white mb-3"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section className="bg-background py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimateIn variant="fadeLeft">
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              What's included
            </h2>
            <p className="text-on-surface-variant mb-12 max-w-xl">
              Everything your Instagram needs to grow from a page into a sales channel.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-on-surface">
              {[
                'Instagram account audit & competitive analysis',
                'Monthly content calendar with hook scripts',
                'Reels production (shoot, edit, colour grade)',
                'Carousel design & static post creation',
                'Caption writing optimised for saves & shares',
                'Hashtag strategy & keyword-optimised bios',
                'Instagram paid ads (traffic, lead gen, conversions)',
                'Community management & DM response protocols',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-surface-container p-5 rounded-lg border border-outline-variant/10"
                >
                  <span className="text-primary-container font-black mt-0.5 shrink-0">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-surface-container py-24 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <AnimateIn variant="fadeUp">
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-12"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Frequently asked questions
            </h2>
          </AnimateIn>
          <div className="space-y-6">
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <AnimateIn key={q} variant="fadeUp" delay={i * 0.08}>
                <div className="border border-outline-variant/20 rounded-xl p-7">
                  <h3
                    className="text-lg font-black text-white mb-3"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {q}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">{a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-container to-background py-32 px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <AnimateIn variant="fadeUp">
            <h2
              className="text-4xl md:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Ready to grow your brand in Jaipur?
            </h2>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <p className="mt-6 text-xl text-white/80">
              Free Instagram audit — we&apos;ll tell you exactly what&apos;s holding your account
              back.
            </p>
          </AnimateIn>
          <AnimateIn variant="scaleIn" delay={0.3}>
            <Link
              href="/contact"
              className="mt-10 inline-flex bg-white text-primary-container px-12 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform duration-300 shadow-2xl"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Let&apos;s Talk →
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── INTERNAL LINKS ──────────────────────────────────────────────── */}
      <section className="bg-background py-16 px-6 md:px-8 border-t border-outline-variant/10">
        <div className="max-w-[1440px] mx-auto">
          <p
            className="text-sm text-on-surface-variant mb-4 uppercase tracking-widest font-bold"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Also explore
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Social Media Agency Jaipur', href: '/social-media-agency-jaipur' },
              { label: 'Reels Production Jaipur', href: '/reels-production-jaipur' },
              { label: 'Digital Marketing Jaipur', href: '/digital-marketing-jaipur' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="border border-white/20 text-white/70 px-5 py-2.5 rounded-full text-sm font-bold hover:text-white hover:border-white/50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
