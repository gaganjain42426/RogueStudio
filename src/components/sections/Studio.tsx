import Link from 'next/link'
import FadeInUp from '@/components/animations/FadeInUp'
import { CountUpClient } from '@/components/sections/CountUpClient'

/**
 * Studio — who's behind the work. Replaces the old About-home section
 * (which ran on stock placeholder photos). Type and real numbers carry it;
 * no imagery until there's real imagery to show.
 */
export default function Studio() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        <FadeInUp className="lg:col-span-7">
          <span className="font-bold text-xs tracking-widest uppercase" style={{ color: '#aa3600' }}>
            The studio
          </span>
          <h2
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-[1.02]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            A 7-person studio in Malviya Nagar that{' '}
            <span
              className="italic font-normal"
              style={{ fontFamily: 'var(--font-serif-accent)', color: '#aa3600' }}
            >
              out-shoots
            </span>{' '}
            agencies ten times its size.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-tertiary-fixed-variant">
            Founded in 2021 with three people and a camera. Word-of-mouth carried the
            first twenty clients; the work carried the rest. Everything — scripting,
            shooting, editing, posting, ads — happens inside one room in Jaipur.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-tertiary-fixed-variant">
            Every client also gets a live portal: content calendar, task board,
            invoices, and results in one login — not a monthly PDF.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 border border-on-tertiary-fixed/25 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-on-tertiary-fixed hover:text-tertiary-fixed transition-colors duration-300"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            The full story →
          </Link>
        </FadeInUp>

        <FadeInUp className="lg:col-span-5" delay={0.15}>
          <dl className="grid grid-cols-2 gap-px bg-on-tertiary-fixed/15 border border-on-tertiary-fixed/15">
            {[
              { target: 150, suffix: '+', label: 'Projects delivered' },
              { target: 7, suffix: '', label: 'People on the team' },
              { target: 40, suffix: 'M+', label: 'Views produced' },
              { target: 5, suffix: '', label: 'Years shooting, since 2021' },
            ].map((stat) => (
              <div key={stat.label} className="bg-tertiary-fixed p-8">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUpClient target={stat.target} suffix={stat.suffix} />
                  <span className="block text-xs font-bold uppercase tracking-widest mt-2 text-on-tertiary-fixed-variant">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeInUp>
      </div>
    </section>
  )
}
