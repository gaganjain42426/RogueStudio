import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'
import Icon from '@/components/ui/Icon'

/**
 * Pricing — two named retainers plus custom, prices framed as "from ₹—",
 * with proof sitting directly beside the money question. Server component;
 * no badges, no scale tricks.
 */

const PLANS = [
  {
    name: 'Starter',
    price: 'from ₹40,000',
    period: '/mo',
    description: 'A consistent, professional presence.',
    features: ['12 reels per month', 'Posting & community handled', 'Creative direction'],
    featured: false,
  },
  {
    name: 'Growth',
    price: 'from ₹95,000',
    period: '/mo',
    description: 'The full engine — content plus performance.',
    features: [
      '25 reels + static content',
      'Strategy & growth audit',
      'Dedicated manager',
      'Ad creative pack',
    ],
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Scoped to you',
    period: '',
    description: 'Full digital takeover — production, web, ads, influencers.',
    features: [
      'Unlimited production',
      'Web + CRO design',
      'Weekly analytics sync',
      'Influencer campaign management',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <div className="max-w-3xl">
            <span className="font-bold text-xs tracking-widest uppercase" style={{ color: '#aa3600' }}>
              Pricing
            </span>
            <h2
              className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              What working with us{' '}
              <span
                className="italic font-normal"
                style={{ fontFamily: 'var(--font-serif-accent)', color: '#aa3600' }}
              >
                costs.
              </span>
            </h2>
            <p className="mt-6 text-lg text-on-tertiary-fixed-variant max-w-xl">
              Retainers, priced plainly. For context: Sarvatra Energy&rsquo;s retainer has
              returned roughly 10X its ad spend, with qualified leads under ₹15 each.
            </p>
          </div>
        </FadeInUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-on-tertiary-fixed/15 border border-on-tertiary-fixed/15">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col bg-tertiary-fixed p-10"
              style={plan.featured ? { boxShadow: 'inset 0 3px 0 #aa3600' } : undefined}
            >
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-on-tertiary-fixed-variant">{plan.description}</p>
              <div className="mt-8 mb-8">
                <span
                  className="text-3xl md:text-4xl font-black"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {plan.price}
                </span>
                {plan.period && <span className="text-lg text-on-tertiary-fixed-variant">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm">
                    <Icon name="check" size={16} style={{ color: '#aa3600', flexShrink: 0 }} />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${plan.name.toLowerCase()}`}
                className={`py-4 rounded-full font-bold text-center block transition-colors ${
                  plan.featured
                    ? 'bg-primary-container text-on-primary-fixed hover:opacity-90'
                    : 'border-2 border-on-tertiary-fixed/30 hover:border-on-tertiary-fixed'
                }`}
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {plan.name === 'Custom' ? 'Scope my project' : `Start with ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-on-tertiary-fixed-variant">
          Every plan includes the client portal — live calendar, tasks, invoices, and results.
          We reply within 4 working hours on WhatsApp.
        </p>
      </div>
    </section>
  )
}
