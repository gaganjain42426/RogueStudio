import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { SERVICE_TILES, PRICING_PLANS } from '@/lib/constants'
import { AnimatedSection, AnimatedItem, AnimatedCard } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Explore Rogue Studio\'s full range of services — social media management, content production, brand strategy, web design, paid social, and more in Jaipur.',
  path: '/services',
  keywords: ['social media management Jaipur', 'content production agency', 'brand strategy Rajasthan'],
})

const mainServices = [
  {
    icon: 'hub',
    title: 'Social Media Management',
    description:
      'Full-cycle social media management — from content calendars and copywriting to community management and monthly performance reporting.',
    features: ['Content Calendar Strategy', 'Copywriting & Caption Art', 'Community Management', 'Monthly Reports'],
  },
  {
    icon: 'videocam',
    title: 'Content Production',
    description:
      'Cinematic short-form and long-form video, editorial photography, and motion graphics that stop the scroll and spark conversation.',
    features: ['Reels & Short-Form Video', 'Brand Photography', 'Motion Graphics', 'Post-Production'],
  },
  {
    icon: 'insights',
    title: 'Brand Strategy',
    description:
      'Deep-dive brand audits, competitive positioning, visual identity development, and brand guidelines for standing out in any market.',
    features: ['Brand Audit', 'Visual Identity', 'Brand Guidelines', 'Positioning Strategy'],
  },
  {
    icon: 'terminal',
    title: 'Web Design & Development',
    description:
      'Design-first, performance-optimised websites and landing pages that convert visitors into customers.',
    features: ['UI/UX Design', 'Next.js Development', 'SEO Optimisation', 'CRO Design'],
  },
  {
    icon: 'ads_click',
    title: 'Paid Social Advertising',
    description:
      'Meta, Google, and LinkedIn campaigns engineered for ROI — from creative strategy to ad buying and optimisation.',
    features: ['Meta Ads', 'Google Ads', 'Creative Strategy', 'A/B Testing'],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-background pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <span className="text-secondary font-bold text-xs tracking-widest uppercase">
                What We Do
              </span>
              <h1
                className="mt-6 text-6xl md:text-8xl font-black text-white leading-tight max-w-4xl"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Services built to{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  actually work.
                </span>
              </h1>
              <p className="mt-8 text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                We don&apos;t offer everything. We offer the right things — and we do them better than
                anyone else in the room.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Main services */}
      <section className="bg-surface-container-low py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="space-y-8">
              {mainServices.map((svc, i) => (
                <AnimatedItem key={svc.title}>
                  <div className="bg-surface-container-highest rounded-lg p-10 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 hover:bg-surface-bright transition-colors duration-300">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="material-symbols-outlined text-primary-container text-4xl">
                          {svc.icon}
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-black text-white"
                          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                        >
                          {svc.title}
                        </h3>
                      </div>
                      <p className="text-on-surface-variant leading-relaxed text-lg">
                        {svc.description}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-3">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-on-surface-variant">
                            <span
                              className="material-symbols-outlined text-primary-container text-base"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Service tiles grid */}
      <section className="bg-background py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-3xl md:text-5xl font-black text-white mb-12 text-center"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Everything in our{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  arsenal
                </span>
              </h2>
            </AnimatedItem>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SERVICE_TILES.map((tile, i) => (
                <AnimatedCard key={tile.label} delay={i * 0.05}>
                  <div className="bg-surface-container-high p-6 md:p-8 rounded-lg flex flex-col items-center text-center hover:bg-surface-bright transition-colors duration-300">
                    <span className="material-symbols-outlined text-primary text-3xl mb-4">
                      {tile.icon}
                    </span>
                    <span
                      className="font-bold text-sm text-on-surface"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {tile.label}
                    </span>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-4xl md:text-6xl font-black mb-6"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Simple,{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  transparent
                </span>{' '}
                pricing
              </h2>
              <p className="text-on-tertiary-fixed-variant mb-16 max-w-xl mx-auto">
                Starting from ₹40,000/month. No hidden fees.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <Link
                href="/#pricing"
                className="inline-flex bg-primary-container text-on-primary-fixed px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                View Pricing →
              </Link>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
