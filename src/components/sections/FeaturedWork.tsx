import Link from 'next/link'
import { PROJECTS } from '@/lib/constants'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { ProjectCardClient } from '@/components/sections/ProjectCardClient'

/**
 * FeaturedWork — Server Component.
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
              All Projects →
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
            All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

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
              All Projects →
            </Link>
          </div>
        </FadeInUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerChildren={0.08}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Link href="/work" className="block">
                <motion.div
                  className="aspect-[4/5] relative rounded-lg overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h4
                      className="text-white text-2xl font-bold mt-1"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {project.title}
                    </h4>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/work"
            className="inline-flex border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
