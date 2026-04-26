import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

const SLUG = 'reels-production-jaipur'
const CANONICAL = `https://www.roguestudio.in/${SLUG}`

export const metadata: Metadata = {
  title: 'Reels Production Agency Jaipur | Rogue Studio',
  description:
    'Rogue Studio is Jaipur\'s reels production agency — cinematic short-form video for Instagram, YouTube Shorts & more. Shot, edited, and published to convert.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Reels Production Agency Jaipur | Rogue Studio',
    description:
      'Cinematic Reels and short-form video production for Jaipur businesses. From concept to cut — we make content that stops the scroll.',
    url: CANONICAL,
    images: [{ url: '/og/home-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reels & Short-Form Video Production',
  description:
    'Professional Instagram Reels, YouTube Shorts, and short-form video production for brands and businesses in Jaipur.',
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
    q: 'How much does Reels production cost in Jaipur?',
    a: 'Our Reels production packages start at ₹8,000 per Reel for concept, shoot, and edit. Volume retainers (8–12 Reels/month) significantly reduce the per-unit cost. We quote based on location, talent, and complexity.',
  },
  {
    q: 'Do you handle scripting and concept development?',
    a: 'Yes — fully. We start with a content brief, develop hooks and scripts aligned to your brand voice, then handle production and post-production end-to-end. You approve before we shoot.',
  },
  {
    q: 'What industries do you make Reels for?',
    a: 'We produce for fashion, restaurants, real estate, hospitality, D2C products, fitness, education, and professional services. If your customer is on Instagram or YouTube, we can build a Reels strategy for you.',
  },
  {
    q: 'How long does it take to produce one Reel?',
    a: 'From brief to delivery: 5–7 business days for a standard shoot-and-edit Reel. Faster turnarounds are available for retainer clients. We batch shoots to maximise output per session.',
  },
  {
    q: 'Will you post and manage distribution too?',
    a: 'Yes — our social media retainer includes scheduling, caption writing, hashtag research, and posting at optimal times. Or we can hand off edited files if you have an in-house team.',
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

export default function ReelsProductionJaipurPage() {
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
              Reels Production · Jaipur
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white max-w-4xl"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Reels production agency Jaipur —{' '}
              <span
                className="italic font-normal text-primary-container"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                cinematic, not cringe.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="mt-8 text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              We shoot, edit, and distribute short-form video that makes people stop mid-scroll.
              Not filters-and-music. Actual storytelling that moves product and builds brand equity.
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
              for video
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Production quality that earns attention',
                body: 'Colour-graded, properly lit, crispy audio. Every Reel we produce looks like it came out of a proper production house — because it did.',
              },
              {
                title: 'Hooks designed for the algorithm',
                body: 'The first 1.5 seconds decide everything. We obsess over hooks, pattern interrupts, and pacing that drives replays and shares — the signals that get Reels pushed by Instagram.',
              },
              {
                title: 'Rooted in Jaipur, scaled for India',
                body: "We understand the Jaipur market's aesthetics — the textures, colour palette, and cultural codes that make content feel authentic rather than imported.",
              },
              {
                title: "Retainer partners, not one-off vendors",
                body: "Volume and consistency win on Reels. Our retainer model means you're never scrambling for content — the pipeline is always full, always on-brand.",
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
              What's in every production
            </h2>
            <p className="text-on-surface-variant mb-12 max-w-xl">
              From the brief to the publish button — we handle every frame.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-on-surface">
              {[
                'Hook writing & script development',
                'Location scouting & set dressing (Jaipur & surroundings)',
                'Cinematography — handheld, gimbal, drone available',
                'Professional lighting & audio capture',
                'Colour grading & motion graphics',
                'Subtitles, text overlays & captions',
                'Music licensing & sound design',
                'Platform-optimised exports (Reels, Shorts, Stories)',
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
              Let&apos;s talk about your Reels strategy — one conversation, zero jargon.
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
