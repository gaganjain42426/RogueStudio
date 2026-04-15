'use client'

import { motion } from 'framer-motion'
import { SERVICE_TILES } from '@/lib/constants'
import StaggerContainer from '@/components/animations/StaggerContainer'

const tileVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

export default function ServicesGrid() {
  return (
    <section className="bg-background py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          staggerChildren={0.05}
        >
          {SERVICE_TILES.map((tile) => (
            <motion.div key={tile.label} variants={tileVariants}>
              <div className="bg-surface-container-high p-6 md:p-8 rounded-lg flex flex-col items-center text-center hover:bg-surface-bright transition-colors duration-300 cursor-default">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">
                  {tile.icon}
                </span>
                <span
                  className="font-bold text-sm text-on-surface"
                  style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                >
                  {tile.label}
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
