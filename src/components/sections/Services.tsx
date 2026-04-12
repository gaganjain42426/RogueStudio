import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

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
        <AnimatedSection>
          <AnimatedItem>
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
          </AnimatedItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {services.map((svc, i) => (
              <AnimatedItem key={svc.icon}>
                <div
                  className="p-10 bg-surface-container-highest rounded-lg hover:bg-primary-container group transition-colors duration-500 h-full"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="material-symbols-outlined text-primary-container group-hover:text-white text-5xl transition-colors">
                    {svc.icon}
                  </span>
                  <h3
                    className="mt-8 text-2xl font-bold text-white"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-4 text-on-surface-variant group-hover:text-white/80 transition-colors leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
