import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { ServiceCardClient } from '@/components/sections/ServiceCardClient'

/**
 * Services — Server Component.
 * H2 heading and section structure are server-rendered.
 * Animated service cards are isolated in ServiceCardClient (client island).
 */

const services = [
  {
    icon: 'hub',
    title: 'Social Media',
    description:
      'End-to-end management from content pillars to high-octane community engagement.',
  },
  {
    icon: 'videocam',
    title: 'Content Production',
    description:
      'Cinematic short-form video and photography that captures the essence of your brand.',
  },
  {
    icon: 'insights',
    title: 'Brand Strategy',
    description: 'Defining your voice, mission, and visual language to dominate your niche.',
  },
]

export default function Services() {
  return (
    <section className="bg-surface-container-low py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">
            OUR SERVICES
          </span>
          <h2
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-white max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            We believe great creative isn&apos;t just beautiful,{' '}
            <span
              className="italic font-normal"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              it works.
            </span>
          </h2>
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          staggerChildren={0.1}
        >
          {services.map((svc) => (
            <ServiceCardClient
              key={svc.icon}
              icon={svc.icon}
              title={svc.title}
              description={svc.description}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
