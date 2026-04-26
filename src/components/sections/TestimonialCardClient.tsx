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

interface TestimonialCardClientProps {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

/**
 * TestimonialCardClient — animated card with stagger-variant from StaggerContainer.
 * Accepts testimonial data as props so it can be driven from a server component.
 */
export function TestimonialCardClient({ id, quote, author, role, company }: TestimonialCardClientProps) {
  return (
    <motion.div key={id} variants={cardVariants}>
      <div className="bg-surface-container-low p-10 rounded-lg border border-outline-variant/5 h-full flex flex-col">
        {/* Stars */}
        <div className="flex text-primary-container mb-6 gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <span
              key={j}
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          ))}
        </div>
        {/* Quote */}
        <p className="text-lg italic text-on-surface leading-relaxed flex-grow">
          &ldquo;{quote}&rdquo;
        </p>
        {/* Author */}
        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">
              person
            </span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">{author}</p>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
