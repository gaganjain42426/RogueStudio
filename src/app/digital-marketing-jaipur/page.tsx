import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

const SLUG = 'digital-marketing-jaipur'
const CANONICAL = `https://www.roguestudio.in/${SLUG}`

export const metadata: Metadata = {
  title: 'Digital Marketing Agency Jaipur | Rogue Studio',
  description:
    'Rogue Studio is a full-service digital marketing agency in Jaipur — SEO, paid ads, social media, and content strategy that grows revenue, not just impressions.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Digital Marketing Agency Jaipur | Rogue Studio',
    description:
      'Performance digital marketing for Jaipur businesses. SEO, paid social, Google Ads, and content — all tied to revenue outcomes.',
    url: CANONICAL,
    images: [{ url: '/og/home-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Digital Marketing',
  description:
    'Full-service digital marketing including SEO, paid ads, social media strategy, and content marketing for businesses in Jaipur.',
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
    q: 'What digital marketing services do you offer in Jaipur?',
    a: 'We offer SEO (on-page, technical, local), Google Ads & Performance Max, Meta & Instagram paid ads, social media management, content marketing, and email automation. We build integrated strategies — not siloed channel tactics.',
  },
  {
    q: 'How much does digital marketing cost for a Jaipur business?',
    a: 'Retainers start at ₹30,000/month for a focused single-channel strategy (e.g. SEO or paid social). Full-funnel multi-channel programs start at ₹75,000/month. We always start with an audit to scope exactly what will move the needle for your business.',
  },
  {
    q: 'How do you measure success?',
    a: 'Revenue, leads, and ROAS — not impressions. We set up proper conversion tracking in GA4 and Meta before spending a rupee on ads. You see exactly what each channel is contributing.',
  },
  {
    q: 'Do you work with small businesses or only large brands?',
    a: 'We work with ambitious businesses of all sizes — from Jaipur startups with ₹50K/month budgets to established brands with multi-crore ad spends. What matters is that you want to grow seriously.',
  },
  {
    q: 'Why choose a Jaipur-based agency over a national one?',
    a: 'Proximity matters — we can attend shoots, meet your team, and understand the local competition first-hand. Plus, we know which Jaipur neighbourhoods and festivals to target, and which local publications and influencers carry real weight.',
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

export default function DigitalMarketingJaipurPage() {
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
              Digital Marketing · Jaipur
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white max-w-4xl"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Digital marketing agency Jaipur —{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                built for growth, not reports.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="mt-8 text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              We run digital marketing that converts — SEO that brings inbound leads, ads that
              return real ROAS, and content that builds lasting brand authority. For Jaipur
              businesses serious about scaling.
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
              Why Jaipur brands trust{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Rogue Studio
              </span>{' '}
              with their digital growth
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Local market intelligence',
                body: "We know Jaipur's competition — who's ranking where, which brands are outspending on ads, and what content gaps exist in your industry locally. Data-backed decisions from day one.",
              },
              {
                title: 'Creative that performs',
                body: 'Most agencies split creative from media buying. We integrate both. Ad creative built in-house means faster iterations, lower CPMs, and messaging that actually resonates.',
              },
              {
                title: "Retainer model means skin in the game",
                body: "We're not billing by the hour. Our retainers are milestone-based — tied to growth targets. If your business grows, we grow. That's the alignment you want from an agency.",
              },
              {
                title: 'Transparent, jargon-free reporting',
                body: "Every month you get a plain-English report. What we spent, what it returned, what we're changing and why. No slide decks full of impressions to hide a bad ROAS.",
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
              Full-funnel digital marketing — from the first impression to the closed sale.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-on-surface">
              {[
                'SEO audit, on-page optimisation & technical fixes',
                'Local SEO & Google Business Profile optimisation',
                'Google Ads (Search, Performance Max, Display)',
                'Meta & Instagram paid advertising',
                'Social media content strategy & management',
                'Email marketing & automation sequences',
                'Landing page copywriting & CRO',
                'Monthly analytics reporting (GA4 + Looker Studio)',
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
              Get a free digital audit — we&apos;ll show you exactly where you&apos;re losing
              revenue online.
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
              { label: 'Instagram Marketing Jaipur', href: '/instagram-marketing-jaipur' },
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
