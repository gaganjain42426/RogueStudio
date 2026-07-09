import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { TEAM_MEMBERS } from '@/lib/constants'
import { AnimatedSection, AnimatedItem, AnimatedCard } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'The Rogue Studio story — a creative studio founded in Jaipur in 2021, a 7-person specialist team shipping 150+ projects. Meet the team and how we work.',
  path: '/about',
  keywords: ['about Rogue Studio', 'creative team Jaipur', 'agency story India'],
})

const timeline = [
  { year: '2021', event: 'Founded in Jaipur with 3 people and a camera.' },
  { year: '2022', event: 'First 20 clients onboarded — 100% word-of-mouth.' },
  { year: '2023', event: 'Full production studio; video department launched.' },
  { year: '2024', event: '150+ projects delivered by a deliberately small specialist team.' },
  { year: '2025', event: 'International client services — Jaipur to the world.' },
]

const values = [
  {
    title: 'Finished beats fancy',
    description:
      'A reel that ships this week beats a concept deck that ships next month. We optimise for delivered work, measured results.',
  },
  {
    title: 'One room, one pipeline',
    description:
      'Script, shoot, edit, post, ads — no handoffs between departments, because there are no departments. The person who wrote your hook grades your final cut.',
  },
  {
    title: 'Numbers or it didn’t happen',
    description:
      'Every case study on this site carries real figures from client accounts. If we can’t measure it, we won’t claim it.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-background pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <span className="text-secondary font-bold text-xs tracking-widest uppercase">
                Our Story
              </span>
              <h1
                className="mt-6 text-6xl md:text-8xl lg:text-[9rem] font-black text-white leading-[0.85] max-w-5xl"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Born{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--font-serif-accent)' }}
                >
                  Rogue.
                </span>
                <br />
                Built{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--font-serif-accent)' }}
                >
                  Different.
                </span>
              </h1>
              <p className="mt-10 text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Rogue Studio started in 2021 as a refusal — a refusal to accept mediocre
                marketing and cookie-cutter content. Five years later: 150+ projects,
                40M+ views, and clients who renew because the numbers say to.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface-container-low py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-4xl md:text-6xl font-black text-white mb-16"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Five years,{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--font-serif-accent)' }}
                >
                  fast-forwarded.
                </span>
              </h2>
            </AnimatedItem>
            <div className="border-t border-white/10">
              {timeline.map((t, i) => (
                <AnimatedCard key={t.year} delay={i * 0.06}>
                  <div className="grid grid-cols-12 items-baseline gap-4 border-b border-white/10 py-7">
                    <span
                      className="col-span-3 md:col-span-2 text-2xl md:text-4xl font-black text-primary-container"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {t.year}
                    </span>
                    <p className="col-span-9 md:col-span-10 text-base md:text-lg text-on-surface-variant">
                      {t.event}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-4xl md:text-6xl font-black mb-4"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                The people{' '}
                <span
                  className="italic font-normal"
                  style={{ fontFamily: 'var(--font-serif-accent)', color: '#aa3600' }}
                >
                  on your shoot.
                </span>
              </h2>
              <p className="max-w-xl text-on-tertiary-fixed-variant mb-16">
                A core team of specialists — plus the editors, shooters, and strategists
                they pull in per project.
              </p>
            </AnimatedItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-on-tertiary-fixed/15 border border-on-tertiary-fixed/15">
              {TEAM_MEMBERS.map((member, i) => (
                <AnimatedCard key={member.name} delay={i * 0.08}>
                  <div className="bg-tertiary-fixed p-10 h-full">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-xl font-black text-white"
                      style={{ background: '#aa3600', fontFamily: 'var(--font-headline)' }}
                      aria-hidden="true"
                    >
                      {member.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <h3
                      className="mt-6 text-xl font-black"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {member.name}
                    </h3>
                    <p className="font-bold text-sm mt-0.5" style={{ color: '#aa3600' }}>
                      {member.role}
                    </p>
                    <p className="text-on-tertiary-fixed-variant text-sm mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-4xl md:text-6xl font-black text-white mb-16"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                How we{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--font-serif-accent)' }}
                >
                  decide.
                </span>
              </h2>
            </AnimatedItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <AnimatedCard key={v.title} delay={i * 0.1}>
                  <div className="border-l-2 border-primary-container/50 pl-8 h-full">
                    <h3
                      className="text-xl font-bold text-white mb-3"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">{v.description}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-primary-container py-20 px-6 md:px-8 text-center">
        <h2
          className="text-3xl md:text-5xl font-black text-on-primary-fixed"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Ready to work with us?
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex bg-on-primary-fixed text-primary-container px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Book a Call →
        </Link>
      </section>
    </div>
  )
}
