'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, PORTFOLIO_FILTERS } from '@/lib/constants'
import type { PortfolioFilter } from '@/lib/constants'

export default function WorkClient() {
  const [active, setActive] = useState<PortfolioFilter>('All')

  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active))

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 justify-center mt-12 mb-16">
        {PORTFOLIO_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              active === f
                ? 'bg-primary-container text-on-primary-fixed scale-105'
                : 'border border-outline-variant/30 text-on-surface hover:bg-surface-container'
            }`}
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/work`} className="block">
                <div className="aspect-[4/5] relative rounded-lg overflow-hidden group">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
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
                  {/* Always visible bottom */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h4
                      className="text-white text-xl font-bold mt-0.5"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {project.title}
                    </h4>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
