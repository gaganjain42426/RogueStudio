import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { industries } from '@/lib/industries'
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve',
  description:
    'Social media and content marketing for interior designers, clinics, gyms, schools, solar brands and more. Industry-specific strategies from Rogue Studio, Jaipur.',
  path: '/industries',
  keywords: [
    'industry-specific marketing Jaipur',
    'social media for interior design',
    'healthcare content marketing India',
    'restaurant social media agency',
    'solar energy digital marketing',
  ],
})

export default function IndustriesPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* ── SECTION 1 — HERO ── */}
      <section className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <span
                className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Built for Your World
              </span>
              <h1
                className="mt-6 text-5xl md:text-7xl lg:text-[8rem] font-black text-white leading-[0.88] max-w-5xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                We Speak
                <br />
                Your Industry&apos;s Language.
              </h1>
              <p className="mt-10 text-xl text-[#9CA3AF] max-w-2xl leading-relaxed">
                Generic agencies post content. We build industry-specific strategies that speak
                directly to your customers — in their language, for their needs.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SECTION 2 — INDUSTRY GRID ── */}
      <section className="bg-[#0d1117] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <span
                className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
              >
                Industries We Serve
              </span>
              <h2
                className="mt-4 text-4xl md:text-6xl font-black text-white"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Pick Your Industry.
              </h2>
              <p className="mt-4 text-lg text-[#9CA3AF] max-w-2xl leading-relaxed">
                Every industry gets a dedicated strategy, content style, and portfolio — not a
                copy-paste approach.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.slug} variant="item" delay={i * 0.05}>
                <Link href={`/industries/${industry.slug}`} className="block h-full group">
                  <div
                    className="relative bg-[#111827] border border-white/10 rounded-xl p-8 h-full flex flex-col gap-5
                      transition-all duration-300
                      hover:border-[#C8A96E]/60 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/50"
                  >
                    {/* Gold top-border on hover */}
                    <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#C8A96E] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    {/* Icon */}
                    <span className="material-symbols-outlined text-[#C8A96E] text-4xl leading-none select-none">
                      {industry.icon}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="text-xl font-black text-white leading-tight"
                        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                      >
                        {industry.name}
                      </h3>
                      <p className="mt-2 text-[#9CA3AF] text-sm leading-relaxed">{industry.desc}</p>
                    </div>

                    {/* Hover CTA */}
                    <span
                      className="text-[#C8A96E] text-sm font-bold opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      View Portfolio →
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — BOTTOM CTA BANNER ── */}
      <section className="bg-[#0a0a0a] py-28 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="border border-[#C8A96E]/30 rounded-2xl py-20 px-8 md:px-16 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Don&apos;t see your industry?
            </h2>
            <p className="mt-4 text-lg text-[#9CA3AF] max-w-xl mx-auto">
              We work with any brand serious about growth. Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-[#C8A96E] text-black font-black px-8 py-4 rounded-full hover:scale-105 hover:bg-[#d4b87a] transition-all duration-300 active:scale-95"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Book a Free Strategy Call →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
