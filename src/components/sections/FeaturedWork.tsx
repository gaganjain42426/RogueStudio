import Link from 'next/link'
import { PROJECTS } from '@/lib/constants'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { ProjectCardClient } from '@/components/sections/ProjectCardClient'

/**
 * FeaturedWork â€” Server Component.
 * H2 heading + "All Projects" link are server-rendered.
 * Each project card (hover animation + stagger-variant) is a client island.
 */
export default function FeaturedWork() {
  return (
    <section className="bg-[#822800] py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Featured{' '}
              <span
                className="italic font-normal"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Work
              </span>
            </h2>
            <Link
              href="/work"
              className="hidden md:inline-flex border border-white/20 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              All Projects â†’
            </Link>
          </div>
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerChildren={0.08}
        >
          {PROJECTS.map((project) => (
            <ProjectCardClient
              key={project.id}
              id={project.id}
              imageUrl={project.imageUrl}
              imageAlt={project.imageAlt}
              category={project.category}
              title={project.title}
            />
          ))}
        </StaggerContainer>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/work"
            className="inline-flex border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            All Projects â†’
          </Link>
        </div>
      </div>
    </section>
  )
}
