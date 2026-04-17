'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Palette, Settings, TrendingUp } from 'lucide-react'
import type { PortfolioProject } from '@/types'
import BeforeAfterSlider from './BeforeAfterSlider'

interface VaultProjectPanelProps {
  project: PortfolioProject | null
  onClose: () => void
}

const protocolIcons = [
  { icon: Camera, label: 'Shoot' },
  { icon: Palette, label: 'Edit' },
  { icon: Settings, label: 'Manage' },
  { icon: TrendingUp, label: 'Grow' },
]

export default function VaultProjectPanel({ project, onClose }: VaultProjectPanelProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-lenis-prevent
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[80%] bg-surface-container-low overflow-y-auto"
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-background transition-colors"
              aria-label="Close panel"
            >
              <X size={20} />
            </button>

            <div className="max-w-4xl mx-auto px-8 py-16">
              {/* Header */}
              <div className="mb-12">
                {project.ref_code && (
                  <p className="text-xs tracking-[0.3em] uppercase text-secondary mb-3">
                    {project.ref_code}
                  </p>
                )}
                <h2
                  className="text-4xl md:text-6xl font-bold text-on-background mb-3"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-block px-3 py-1 text-xs tracking-[0.15em] uppercase border border-outline-variant/30 text-on-surface-variant">
                    {project.client}
                  </span>
                  <span className="inline-block px-3 py-1 text-xs tracking-[0.15em] uppercase bg-primary-container/20 text-secondary">
                    {project.category}
                  </span>
                </div>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-primary hover:underline"
                  >
                    View Live →
                  </a>
                )}
              </div>

              {/* Protocol */}
              <div className="mb-16">
                <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant mb-6">
                  Our Protocol
                </p>
                <div className="flex items-center gap-3 md:gap-6">
                  {protocolIcons.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-2 md:gap-3"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-secondary/40 flex items-center justify-center text-secondary">
                        <item.icon size={18} />
                      </div>
                      <span className="text-xs tracking-[0.1em] uppercase text-on-background hidden md:block">
                        {item.label}
                      </span>
                      {i < protocolIcons.length - 1 && (
                        <motion.div
                          className="w-6 md:w-12 h-px bg-secondary/30 hidden sm:block"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Strategy */}
              <div className="mb-16 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant mb-4">
                    Strategy &amp; Story
                  </p>
                  {project.tagline && (
                    <h3
                      className="text-2xl text-primary italic mb-4"
                      style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                    >
                      &ldquo;{project.tagline}&rdquo;
                    </h3>
                  )}
                  {project.description && (
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {project.description}
                    </p>
                  )}
                </div>
                {/* Stats column */}
                {project.stats && project.stats.length > 0 && (
                  <div className="flex flex-col gap-3 justify-center">
                    {project.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="w-full p-5 border border-secondary/30 text-center"
                      >
                        <p
                          className="text-3xl font-bold text-secondary"
                          style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-xs tracking-[0.2em] uppercase text-on-surface-variant mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              {project.services && project.services.length > 0 && (
                <div className="mb-16">
                  <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant mb-4">
                    Services Delivered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-4 py-1.5 text-xs tracking-[0.12em] uppercase border border-outline-variant/30 text-on-surface-variant"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* The Work grid */}
              <div className="mb-16">
                <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant mb-6">
                  The Work
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {/* Video placeholder */}
                  <div className="col-span-1 row-span-2 bg-surface-container rounded-sm flex items-center justify-center aspect-[9/16]">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border border-secondary/40 flex items-center justify-center mx-auto mb-2">
                        <div className="w-0 h-0 border-l-[8px] border-l-secondary border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-1" />
                      </div>
                      <p className="text-[10px] tracking-[0.15em] text-on-surface-variant uppercase">
                        Reel
                      </p>
                    </div>
                  </div>
                  {/* Gallery thumbnails */}
                  {(project.images && project.images.length > 0
                    ? project.images.slice(0, 6)
                    : Array.from({ length: 6 }).map(() => null)
                  ).map((img, i) => (
                    <div
                      key={i}
                      className="relative bg-surface-container rounded-sm aspect-square overflow-hidden flex items-center justify-center"
                    >
                      {img ? (
                        <Image
                          src={img}
                          alt={`${project.title} — ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      ) : (
                        <span className="text-[10px] text-on-surface-variant/30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After */}
              <div className="mb-16">
                <p className="text-xs tracking-[0.3em] uppercase text-on-surface-variant mb-6">
                  The Edit
                </p>
                <BeforeAfterSlider />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
