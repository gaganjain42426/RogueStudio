import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { buildMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/constants'
import { PORTFOLIO_CLIENTS, type ResolvedClient } from '@/data/portfolio'
import { getBunnyReels, reelBelongsTo } from '@/lib/bunny'
import PortfolioExperience from './PortfolioExperience'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Real Rogue Studio clients, real results — case studies and reels for Sarvatra Energy, Naman Vaastu & Designs, Avera Clothing, Kairos Atelier, Nikhil Shah and more, from Jaipur, India.',
  path: '/portfolio',
  keywords: [
    'creative agency portfolio Jaipur',
    'social media case studies India',
    'reels production portfolio',
    'Rogue Studio clients',
  ],
})

/** True when a reel is playable: a remote URL (e.g. Bunny Stream), or a local
 *  /public path that actually exists on disk. */
function reelIsAvailable(src: string): boolean {
  if (/^https?:\/\//i.test(src)) return true
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', src))
  } catch {
    return false
  }
}

/**
 * Resolve every client's media: their local reels, plus any Bunny Stream uploads
 * whose filename matches the client's `bunnyMatch`. Adding a video in Bunny is
 * therefore all it takes for it to show up here.
 */
async function resolveClients(): Promise<ResolvedClient[]> {
  const bunnyReels = await getBunnyReels()

  return PORTFOLIO_CLIENTS.map((c) => {
    const fromBunny = c.bunnyMatch
      ? bunnyReels.filter((r) => reelBelongsTo(r, c.bunnyMatch!)).map((r) => r.fullSrc)
      : []

    // Local files first — those clients have hand-picked, ordered selections.
    const sources = [...c.reels, ...fromBunny]
    const reels = sources.map((src) => ({ src, available: reelIsAvailable(src) }))

    return { ...c, reels, liveReelCount: reels.filter((r) => r.available).length }
  })
}

export default async function PortfolioPage() {
  const resolvedClients = await resolveClients()

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
