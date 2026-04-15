'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  staggerChildren?: number
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
})

export default function StaggerContainer({
  children,
  className = '',
  staggerChildren = 0.1,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
