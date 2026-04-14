'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { VAULT_CLIENTS, VAULT_FILTERS, type VaultClient, type VaultFilter } from '@/data/vault-clients'
import VaultMarquee from './VaultMarquee'
import VaultProjectPanel from './VaultProjectPanel'

export default function VaultGrid() {
  const [filter, setFilter] = useState<VaultFilter>('all')
  const [selectedClient, setSelectedClient] = useState<VaultClient | null>(null)

  const filtered =
    filter === 'all' ? VAULT_CLIENTS : VAULT_CLIENTS.filter((c) => c.category === filter)

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-surface/80 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black tracking-tighter text-on-background"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}>
              RS
            </Link>
            <span
              className="text-sm tracking-[0.2em] text-primary font-medium"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              THE VAULT
            </span>
          </div>

          {/* Filters desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {VAULT_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  filter === f.value
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-background'
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs tracking-[0.15em] uppercase text-on-surface-variant hover:text-on-background transition-colors duration-300"
            >
              About
            </Link>
            <span className="text-xs tracking-[0.2em] text-on-surface-variant hidden lg:block">
              Issue N°001
            </span>
          </div>
        </div>

        {/* Mobile filters */}
        <div className="md:hidden flex items-center gap-1 px-6 pb-3 overflow-x-auto">
          {VAULT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex-shrink-0 px-3 py-1.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 ${
                filter === f.value
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-background'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* Marquee */}
      <VaultMarquee />

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              className={`group relative overflow-hidden cursor-pointer bg-surface-container rounded-sm ${
                client.gridSpan === 'tall'
                  ? 'md:row-span-2'
                  : client.gridSpan === 'wide'
                  ? 'md:col-span-2'
                  : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelectedClient(client)}
            >
              {/* Thumbnail */}
              <Image
                src={client.thumbnail}
                alt={client.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-500 flex flex-col items-center justify-center">
                <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-6">
                  <h3
                    className="text-2xl text-white mb-1"
                    style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                  >
                    {client.name}
                  </h3>
                  <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4">
                    {client.industry}
                  </p>
                  <span className="inline-block px-5 py-2 bg-primary-container text-on-primary-fixed text-xs tracking-[0.15em] uppercase">
                    View Process →
                  </span>
                </motion.div>
              </div>

              {/* Always-visible bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                <span
                  className="text-sm text-white"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  {client.name}
                </span>
                <span className="text-[10px] tracking-[0.15em] text-white/60">
                  {client.ref.split(' ').pop()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Panel */}
      <VaultProjectPanel
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  )
}
