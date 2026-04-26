'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

interface ProjectCardClientProps {
  id: string
  imageUrl: string
  imageAlt: string
  category: string
  title: string
}

/**
 * ProjectCardClient — animated project card with stagger-variants + hover effect.
 * Extracted from FeaturedWork.tsx so the section H2 can be server-rendered.
 */
export function ProjectCardClient({ id, imageUrl, imageAlt, category, title }: ProjectCardClientProps) {
  return (
    <motion.div key={id} variants={cardVariants}>
      <Link href="/work" className="block">
        <motion.div
          className="aspect-[4/5] relative rounded-lg overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              {category}
            </span>
            <h4
              className="text-white text-2xl font-bold mt-1"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              {title}
            </h4>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
