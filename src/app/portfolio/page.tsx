import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { buildMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/constants'
import { PORTFOLIO_CLIENTS, type ResolvedClient } from '@/data/portfolio'
import PortfolioExperience from './PortfolioExperience'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Real Rogue Studio clients, real results — case studies and reels for Sarvatra Energy, Naman Vaastu, Janta Bar, Noble Vibes Clinic, Vimla International and more, from Jaipur, India.',
  path: '/portfolio',
  keywords: [
    'creative agency portfolio Jaipur',
    'social media case studies India',
    'reels production portfolio',
    'Rogue Studio clients',
  ],
})

/** True when the file backing a /public path exists on disk. */
function existsInPublic(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', publicPath))
  } catch {
    return false
  }
}

/** Resolve every client's reels against the filesystem once, at render time. */
const resolvedClients: ResolvedClient[] = PORTFOLIO_CLIENTS.map((c) => {
  const reels = c.reels.map((src) => ({ src, available: existsInPublic(src) }))
  return {
    ...c,
    reels,
    liveReelCount: reels.filter((r) => r.available).length,
  }
})

export default function PortfolioPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/portfolio/#portfolio`,
    name: 'Rogue Studio Portfolio',
    url: `${SITE_URL}/portfolio`,
    about: PORTFOLIO_CLIENTS.filter((c) => !c.isInHouse).map((c) => ({
      '@type': 'CreativeWork',
      name: `${c.name} — ${c.industry}`,
      description: c.summary,
      creator: { '@id': `${SITE_URL}/#business` },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PortfolioExperience clients={resolvedClients} />
    </>
  )
}
