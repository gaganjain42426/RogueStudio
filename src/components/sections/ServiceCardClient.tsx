'use client'

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

interface ServiceCardClientProps {
  icon: string
  title: string
  description: string
}

/**
 * ServiceCardClient — the animated service card.
 * Uses motion.div for stagger-variant animation (from StaggerContainer parent)
 * and whileHover for the scale interaction.
 */
export function ServiceCardClient({ icon, title, description }: ServiceCardClientProps) {
  return (
    <motion.div variants={cardVariants}>
      <motion.div
        className="p-10 bg-surface-container-highest rounded-lg hover:bg-primary-container group transition-colors duration-500 h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <span className="material-symbols-outlined text-primary-container group-hover:text-white text-5xl transition-colors">
          {icon}
        </span>
        <h3
          className="mt-8 text-2xl font-bold text-white"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          {title}
        </h3>
        <p className="mt-4 text-on-surface-variant group-hover:text-white/80 transition-colors leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  )
}
