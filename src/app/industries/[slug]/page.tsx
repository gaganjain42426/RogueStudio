import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { industries, industryClients } from '@/lib/industries'
import {
  painPointsMap,
  defaultPainPoints,
  contentTypesMap,
  defaultContentTypes,
  faqsMap,
  defaultFaqs,
} from '@/lib/industry-page-data'
import type { PainPoint } from '@/lib/industry-page-data'
import { AnimatedSection, AnimatedItem, AnimatedCard } from '@/components/ui/AnimatedSection'
import { VideoReelGrid } from '@/components/industries/VideoReelGrid'
import { FAQAccordion } from '@/components/industries/FAQAccordion'
import { DownloadPDFButton } from '@/components/industries/DownloadPDFButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}

  const title = `${industry.name} Social Media Marketing & Video Production | Rogue Studio Jaipur`
  const description = `Rogue Studio creates thumb-stopping reels, social media content, and brand films for ${industry.name} brands in Jaipur. Strategy-first creative that drives real results.`
  const url = `${SITE_URL}/industries/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Rogue Studio',
      images: [{ url: '/og/default-og.jpg', width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/default-og.jpg'],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getContentTypeIcon(type: string): string {
  const t = type.toLowerCase()
  if (t.includes('reel') || t.includes('video') || t.includes('film')) return 'play_circle'
  if (t.includes('photo') || t.includes('visual') || t.includes('image')) return 'photo_camera'
  if (t.includes('story') || t.includes('stories')) return 'auto_stories'
  if (t.includes('ad') || t.includes('campaign')) return 'campaign'
  if (t.includes('podcast') || t.includes('audio')) return 'mic'
  if (t.includes('logo') || t.includes('brand')) return 'palette'
  if (t.includes('post') || t.includes('carousel')) return 'grid_view'
  if (t.includes('testimonial') || t.includes('review')) return 'reviews'
  if (t.includes('before') || t.includes('transfor')) return 'compare'
  if (t.includes('time') || t.includes('lapse')) return 'timelapse'
  return 'check_circle'
}

const processSteps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We learn your brand, goals, target audience, and competitive landscape.',
  },
  {
    num: '02',
    title: 'Strategy & Calendar',
    desc: 'A 30-day content plan built around what works for your industry, not generic templates.',
  },
  {
    num: '03',
    title: 'Create & Produce',
    desc: 'Shoot, edit, and deliver studio-quality reels, photos, and brand content.',
  },
  {
    num: '04',
    title: 'Review & Scale',
    desc: 'Monthly performance reviews to double down on what drives real results.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) notFound()

  const clients = industryClients[slug] ?? []
  const painPoints: PainPoint[] = painPointsMap[slug] ?? defaultPainPoints
  const contentTypes: string[] = contentTypesMap[slug] ?? defaultContentTypes
  const faqs = faqsMap[slug] ?? defaultFaqs
  const allReels = clients.flatMap((c) =>
    c.reels.map((r) => ({ src: r.src, label: r.label, clientName: c.name }))
  )

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* ── SECTION 1 — HERO ── */}
      <section className="pt-40 pb-28 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-8">
                <Link
                  href="/industries"
                  className="hover:text-[#C8A96E] transition-colors duration-200"
                >
                  Industries
                </Link>
                <span>/</span>
                <span className="text-white/70">{industry.name}</span>
              </div>

              <span
                className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                {industry.name} Marketing
              </span>

              <h1
                className="mt-6 text-5xl md:text-7xl lg:text-[7.5rem] font-black text-white leading-[0.88] max-w-5xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                {industry.name} Brands
                <br />
                That Don&apos;t Blend In.
              </h1>

              <p className="mt-10 text-xl text-[#9CA3AF] max-w-2xl leading-relaxed">
                {industry.heroDescription}
              </p>

              {/* Stat chips */}
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#111827] border border-[#C8A96E]/30 rounded-full px-6 py-3">
                  <span className="material-symbols-outlined text-[#C8A96E] text-xl leading-none select-none">
                    bolt
                  </span>
                  <span
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    Strategy-First Approach
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-[#111827] border border-[#C8A96E]/30 rounded-full px-6 py-3">
                  <span className="material-symbols-outlined text-[#C8A96E] text-xl leading-none select-none">
                    verified
                  </span>
                  <span
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    Industry-Specific Content
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <DownloadPDFButton />
              </div>

              {/* Scroll indicator */}
              <div className="mt-16 flex items-center gap-3 text-[#9CA3AF]">
                <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
                <span className="material-symbols-outlined text-[#C8A96E] text-lg animate-bounce select-none">
                  arrow_downward
                </span>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — PAIN POINTS ── */}
      <section className="bg-[#0a0a0a] py-24 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p
                className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                The Problem
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-white max-w-3xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                What&apos;s holding {industry.name} brands back?
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {painPoints.map((pt, i) => (
              <AnimatedCard key={pt.title} delay={i * 0.1}>
                <div className="bg-[#111827] border-l-4 border-[#C8A96E] rounded-xl p-8 h-full">
                  <span className="material-symbols-outlined text-[#C8A96E] text-3xl leading-none select-none">
                    {pt.icon}
                  </span>
                  <h3
                    className="mt-4 text-xl font-black text-white"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">{pt.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — WHAT WE DO ── */}
      <section className="bg-[#0d1117] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p
                className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Our Services
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-white max-w-3xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                What We Do for{' '}
                <span className="text-[#C8A96E]">{industry.name}</span> Brands
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: 'strategy',
                title: 'Content Strategy',
                desc: 'Monthly content calendars, platform strategy, and posting schedules built for your audience.',
              },
              {
                icon: 'play_circle',
                title: 'Reels & Video',
                desc: 'Short-form video content that showcases your work, culture, and expertise.',
              },
              {
                icon: 'auto_awesome',
                title: 'AI-Enhanced Visuals',
                desc: 'AI-assisted product and space photography — studio quality without the studio cost.',
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} variant="item" delay={i * 0.1}>
                <div className="bg-[#111827] border-t-2 border-[#C8A96E] rounded-xl p-8 flex flex-col gap-5 h-full hover:shadow-[0_0_30px_rgba(200,169,110,0.15)] transition-shadow duration-500">
                  <span className="material-symbols-outlined text-[#C8A96E] text-4xl leading-none select-none">
                    {card.icon}
                  </span>
                  <div>
                    <h3
                      className="text-xl font-black text-white"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CONTENT TYPES ── */}
      <section className="bg-[#111827] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p
                className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Content Mix
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-white max-w-3xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                What We Create
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="mt-10 flex flex-wrap gap-3">
            {contentTypes.map((type, i) => (
              <AnimatedCard key={type} delay={i * 0.05}>
                <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-2.5 hover:border-[#C8A96E]/40 transition-colors duration-300">
                  <span className="material-symbols-outlined text-[#C8A96E] text-base leading-none select-none">
                    {getContentTypeIcon(type)}
                  </span>
                  <span
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
                  >
                    {type}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — VIDEO REELS ── */}
      <div data-section="video-reels">
        <VideoReelGrid reels={allReels} />
      </div>

      {/* ── SECTION 6 — PROCESS ── */}
      <section className="bg-[#111827] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p
                className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                How It Works
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-white max-w-3xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Our Process
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="relative mt-16">
            {/* Dashed connector line */}
            <div className="hidden md:block absolute top-[1.375rem] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-[#C8A96E]/20 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <AnimatedCard key={step.num} delay={i * 0.1}>
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
                      <span
                        className="text-black text-xs font-black"
                        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-black text-white"
                        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — CASE STUDIES ── */}
      <section className="bg-[#0a0a0a] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p
                className="text-[#C8A96E] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Client Work
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-white"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Real Brands. Real Results.
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="mt-12 max-w-3xl mx-auto flex flex-col gap-8">
            {clients.length > 0 ? (
              clients.map((client, i) => (
                <AnimatedSection key={client.name} variant="item" delay={i * 0.1}>
                  <div className="relative bg-[#111827] rounded-2xl p-8 overflow-hidden">
                    {/* Gold left bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8A96E] rounded-l-2xl" />

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                      <h3
                        className="text-2xl font-black text-white leading-tight"
                        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                      >
                        {client.name}
                      </h3>
                      <span className="bg-[#C8A96E]/15 text-[#C8A96E] text-xs font-bold px-3 py-1 rounded-full border border-[#C8A96E]/30 flex-shrink-0">
                        {industry.name}
                      </span>
                    </div>

                    {/* Services */}
                    <div className="mb-6">
                      <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3">
                        Services Provided
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {client.services.map((s) => (
                          <span
                            key={s}
                            className="bg-white/5 text-[#9CA3AF] text-xs px-3 py-1 rounded-full border border-white/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3">
                        Key Deliverables
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {client.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-white text-sm">
                            <span className="material-symbols-outlined text-[#C8A96E] text-base leading-tight mt-0.5 select-none">
                              check
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div className="pt-5 border-t border-white/10">
                      <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3">
                        Outcomes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {client.outcomes.map((o) => (
                          <span
                            key={o}
                            className="flex items-center gap-1.5 bg-[#C8A96E]/10 text-[#C8A96E] text-xs font-bold px-3 py-1.5 rounded-lg"
                          >
                            <span className="material-symbols-outlined text-xs leading-none select-none">
                              check
                            </span>
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              /* Empty state */
              <AnimatedSection variant="item">
                <div className="border-2 border-dashed border-[#C8A96E]/40 rounded-2xl p-16 text-center">
                  <span className="material-symbols-outlined text-[#C8A96E] text-5xl select-none">
                    rocket_launch
                  </span>
                  <h3
                    className="mt-6 text-3xl md:text-4xl font-black text-white"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    Accepting New{' '}
                    <span className="text-[#C8A96E]">{industry.name}</span> Clients
                  </h3>
                  <p className="mt-4 text-lg text-[#9CA3AF] max-w-lg mx-auto">
                    Be the first. Get priority onboarding and introductory pricing.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 bg-[#C8A96E] text-black font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-[#d4b87a] transition-all duration-300 active:scale-95"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    Talk to Us
                  </Link>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — FAQ ── */}
      <FAQAccordion faqs={faqs} industryName={industry.name} />

      {/* ── SECTION 9 — CTA ── */}
      <section className="bg-[#0d1117] py-28 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="border border-[#C8A96E]/30 rounded-2xl py-20 px-8 md:px-16 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Ready to grow your{' '}
              <span className="text-[#C8A96E]">{industry.name}</span> brand?
            </h2>
            <p className="mt-4 text-lg text-[#9CA3AF] max-w-xl mx-auto">
              Let&apos;s build something remarkable together.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-[#C8A96E] text-black font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-[#d4b87a] transition-all duration-300 active:scale-95"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
