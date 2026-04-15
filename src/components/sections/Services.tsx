'use client'

import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

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
            <motion.div key={svc.icon} variants={cardVariants}>
              <motion.div
                className="p-10 bg-surface-container-highest rounded-lg hover:bg-primary-container group transition-colors duration-500 h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
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
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
