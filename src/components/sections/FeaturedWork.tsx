import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/lib/constants'
import { AnimatedSection, AnimatedCard } from '@/components/ui/AnimatedSection'

export default function FeaturedWork() {
  return (
    <section className="bg-[#822800] py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <AnimatedCard key={project.id} delay={i * 0.08}>
                <Link href={`/work`} className="block">
                  <div className="aspect-[4/5] relative rounded-lg overflow-hidden group cursor-pointer">
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
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/work"
              className="inline-flex border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              All Projects →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
