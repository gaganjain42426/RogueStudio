import Link from 'next/link'
import Image from 'next/image'
import { PORTFOLIO_CLIENTS } from '@/data/portfolio'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'

/**
 * FeaturedWork — Server Component.
 * Real client logos + taglines, each linking into the matching /portfolio panel.
 */
const featured = PORTFOLIO_CLIENTS.slice(0, 6)

export default function FeaturedWork() {
  return (
    <section className="bg-[#822800] py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Featured{' '}
              <span
                className="italic font-normal"
                style={{ fontFamily: 'var(--font-serif-accent)' }}
              >
                Work
              </span>
            </h2>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex border border-white/20 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              View Portfolio →
            </Link>
          </div>
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerChildren={0.08}
        >
          {featured.map((client) => (
            <Link
              key={client.id}
              href={`/portfolio#${client.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#0D0D0D] p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{ minHeight: 220 }}
            >
              {/* accent glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${client.accent}55` }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1.5">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="material-symbols-outlined text-white/30 transition-colors group-hover:text-white">
                  arrow_outward
                </span>
              </div>
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: client.accent }}>
                  {client.industry}
                </p>
                <h3
                  className="mt-1 text-xl font-black text-white"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {client.name}
                </h3>
                <p className="mt-1 text-sm text-white/55">{client.tagline}</p>
              </div>
            </Link>
          ))}
        </StaggerContainer>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/portfolio"
            className="inline-flex border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            View Portfolio →
          </Link>
        </div>
      </div>
    </section>
  )
}
