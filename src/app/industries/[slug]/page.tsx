import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { industries, industryClients } from '@/lib/industries'
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

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

  const title = `${industry.name} Social Media Marketing | Rogue Studio Jaipur`
  const description = industry.heroDescription
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

const serviceCards = [
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
    title: 'AI Visuals',
    desc: 'AI-powered product and space photography — studio quality without a studio budget.',
  },
]

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) notFound()

  const clients = industryClients[slug] ?? []

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* ── SECTION 1 — HERO ── */}
      <section className="pt-40 pb-28 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-8">
                <Link href="/industries" className="hover:text-[#C8A96E] transition-colors duration-200">
                  Industries
                </Link>
                <span>/</span>
                <span className="text-white/70">{industry.name}</span>
              </div>

              <span
                className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Industry Portfolio
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
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — WHAT WE DO ── */}
      <section className="bg-[#0d1117] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
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
            {serviceCards.map((card, i) => (
              <AnimatedSection key={card.title} variant="item" delay={i * 0.1}>
                <div className="bg-[#111827] border border-white/10 rounded-xl p-8 flex flex-col gap-5 h-full hover:border-[#C8A96E]/40 transition-colors duration-300">
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

      {/* ── SECTION 3 — CLIENT PORTFOLIO ── */}
      <section className="bg-[#0a0a0a] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-3xl md:text-5xl font-black text-white"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Our Work
              </h2>
              <p className="mt-3 text-lg text-[#9CA3AF]">Real brands. Real results.</p>
            </AnimatedItem>
          </AnimatedSection>

          <div className="mt-12">
            {clients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map((client, i) => (
                  <AnimatedSection key={client.name} variant="item" delay={i * 0.1}>
                    <div className="bg-[#111827] border-l-4 border-[#C8A96E] rounded-xl p-8 flex flex-col gap-6 h-full">
                      {/* Client name + industry tag */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3
                          className="text-2xl font-black text-white leading-tight"
                          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                        >
                          {client.name}
                        </h3>
                        <span className="bg-[#C8A96E]/15 text-[#C8A96E] text-xs font-bold px-3 py-1 rounded-full border border-[#C8A96E]/30">
                          {industry.name}
                        </span>
                      </div>

                      {/* Services */}
                      <div>
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
                      <div>
                        <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-3">
                          Key Deliverables
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {client.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-white text-sm">
                              <span className="material-symbols-outlined text-[#C8A96E] text-base leading-tight mt-0.5 select-none">
                                check_circle
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {client.outcomes.map((o) => (
                            <span
                              key={o}
                              className="bg-[#C8A96E]/10 text-[#C8A96E] text-xs font-bold px-3 py-1.5 rounded-lg"
                            >
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              /* ── Empty state — Accepting New Clients ── */
              <AnimatedSection variant="item">
                <div className="border-2 border-dashed border-[#C8A96E]/40 rounded-2xl p-16 text-center">
                  <span className="material-symbols-outlined text-[#C8A96E] text-5xl select-none">
                    rocket_launch
                  </span>
                  <h3
                    className="mt-6 text-3xl md:text-4xl font-black text-white"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    We&apos;re actively onboarding{' '}
                    <span className="text-[#C8A96E]">{industry.name}</span> brands.
                  </h3>
                  <p className="mt-4 text-lg text-[#9CA3AF] max-w-lg mx-auto">
                    Be the first. Get priority onboarding and introductory pricing.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 bg-[#C8A96E] text-black font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-[#d4b87a] transition-all duration-300 active:scale-95"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    Talk to Us →
                  </Link>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
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
              Book a Free Call →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
