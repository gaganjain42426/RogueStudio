import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { TEAM_MEMBERS } from '@/lib/constants'
import { AnimatedSection, AnimatedItem, AnimatedCard } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'Learn the Rogue Studio origin story — a creative agency born in Jaipur with global ambitions. Meet the team of designers, strategists, and storytellers.',
  path: '/about',
  keywords: ['about Rogue Studio', 'creative team Jaipur', 'agency story India'],
})

const timeline = [
  { year: '2021', event: 'Rogue Studio founded in Jaipur with 3 obsessed creatives.' },
  { year: '2022', event: 'First 20 clients onboarded. 100% word-of-mouth growth.' },
  { year: '2023', event: 'Expanded to full content production studio. Launched video department.' },
  { year: '2024', event: '150+ projects delivered. Team grew to 12+ specialists.' },
  { year: '2025', event: 'Launched international client services. India to the world.' },
]

const values = [
  {
    icon: 'diamond',
    title: 'Uncompromising Quality',
    description:
      'We treat every deliverable like a film frame — every pixel, every word, every strategy is deliberate.',
  },
  {
    icon: 'bolt',
    title: 'Raw Velocity',
    description:
      'We move fast without losing precision. Speed and quality are not opposites in our studio.',
  },
  {
    icon: 'handshake',
    title: 'Client First',
    description:
      'Your growth is our KPI. We win when you win — aligned incentives, honest communication.',
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
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Born{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  Rogue.
                </span>
                <br />
                Built{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  Different.
                </span>
              </h1>
              <p className="mt-10 text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Rogue Studio started as a refusal — a refusal to accept mediocre marketing, cookie-cutter content, and agencies that treat creativity as a commodity. We are the alternative.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <AnimatedItem>
              <h2
                className="text-4xl md:text-6xl font-black mb-16"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Meet the{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  Visionaries
                </span>
              </h2>
            </AnimatedItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member, i) => (
                <AnimatedCard key={member.name} delay={i * 0.1}>
                  <div className="group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-surface mb-6">
                      <Image
                        src={member.imageUrl}
                        alt={`${member.name} — ${member.role}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="25vw"
                      />
                    </div>
                    <h3
                      className="text-xl font-black text-on-tertiary-fixed"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-primary-container font-bold text-sm mt-0.5">{member.role}</p>
                    <p className="text-on-tertiary-fixed-variant text-sm mt-2 leading-relaxed">
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
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Our{' '}
                <span
                  className="text-primary-container italic font-normal"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  Values
                </span>
              </h2>
            </AnimatedItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <AnimatedCard key={v.title} delay={i * 0.1}>
                  <div className="bg-surface-container-high p-10 rounded-lg h-full">
                    <span className="material-symbols-outlined text-primary-container text-4xl">
                      {v.icon}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mt-6 mb-3"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
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
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          Ready to work with us?
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-flex bg-on-primary-fixed text-primary-container px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          Book a Call →
        </Link>
      </section>
    </div>
  )
}
