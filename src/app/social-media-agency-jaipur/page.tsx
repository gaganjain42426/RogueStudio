import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

const SLUG = 'social-media-agency-jaipur'
const CANONICAL = `https://www.roguestudio.in/${SLUG}`

export const metadata: Metadata = {
  title: 'Social Media Agency in Jaipur | Rogue Studio',
  description:
    'Rogue Studio is the social media agency in Jaipur that turns brands into scroll-stopping presences. Strategy, content, reels & growth — all under one roof.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Social Media Agency in Jaipur | Rogue Studio',
    description:
      'Scroll-stopping social media strategy and content production for Jaipur businesses. Let's make your brand impossible to ignore.',
    url: CANONICAL,
    images: [{ url: '/og/home-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Marketing',
  description:
    'End-to-end social media strategy, content creation, and growth management for businesses in Jaipur.',
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
    q: 'How much does social media management cost in Jaipur?',
    a: 'Our social media retainers start at ₹25,000/month and scale based on platform count, content volume, and ad spend management. We offer transparent, deliverable-based pricing — no vague monthly fees.',
  },
  {
    q: 'Which platforms do you manage?',
    a: 'We specialise in Instagram and YouTube, but also manage LinkedIn, Facebook, and X (Twitter) depending on where your audience lives. We won't waste your budget on platforms your customers don't use.',
  },
  {
    q: 'How long until we see results?',
    a: 'Organic growth is a 90-day game. Most clients see measurable engagement uplift in 30–45 days. We track follower quality, reach, saves, and DMs — not just vanity likes.',
  },
  {
    q: 'Do you work with businesses outside Jaipur?',
    a: 'Yes — we work with brands across India and internationally. But our Jaipur roots mean we deeply understand the local market, culture, and aesthetics that resonate with Rajasthani consumers.',
  },
  {
    q: 'What makes Rogue Studio different from other agencies in Jaipur?',
    a: 'Most agencies recycle Canva templates. We build a visual system unique to your brand, shoot cinematic content, and treat your account like a portfolio piece — because it is one.',
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

export default function SocialMediaAgencyJaipurPage() {
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
              Jaipur's Social Media Agency
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white max-w-4xl"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              The social media agency in Jaipur{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                your brand deserves.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="mt-8 text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              Jaipur brands that look like they belong in Mumbai or Delhi. We build content
              ecosystems — strategy, production, and distribution — that turn followers into
              customers.
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
              Why Jaipur businesses choose{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Rogue Studio
              </span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'We know Jaipur',
                body: "We're not a Gurgaon agency with a Jaipur office. We live here, understand the market, and know what resonates with the city's consumers — from old city bazaars to Vaishali Nagar startups.",
              },
              {
                title: 'Cinematic quality, every post',
                body: 'Your feed is your portfolio. We shoot and edit every piece of content like it belongs in a brand campaign — not a stock library. The production quality shows.',
              },
              {
                title: 'Retainer-first, results-obsessed',
                body: "We don't do one-off projects. We're partners. When you grow, we grow. That alignment means we're as invested in your metrics as you are.",
              },
              {
                title: 'Strategy before aesthetics',
                body: 'Beautiful content that nobody sees is useless. Every content calendar we build starts with audience research, competitor gaps, and platform algorithm logic.',
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
              A complete social media engine — from the strategy deck to the scheduled post.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-on-surface">
              {[
                'Social media strategy & content calendar',
                'Scroll-stopping Reels & short-form video production',
                'Static post design & carousel creation',
                'Caption writing, hashtag research & CTA optimisation',
                'Community management (comments & DMs)',
                'Instagram & Facebook paid ad management',
                'Monthly performance reports with actionable insights',
                'Competitor & trend monitoring',
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
              Let&apos;s audit your current social presence — free, no commitment.
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
              { label: 'Reels Production Jaipur', href: '/reels-production-jaipur' },
              { label: 'Instagram Marketing Jaipur', href: '/instagram-marketing-jaipur' },
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
