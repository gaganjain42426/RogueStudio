import type { Metadata } from 'next'
import { SITE_URL } from './constants'

interface MetaOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetaOptions): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title: `${title} | Rogue Studio — Creative Agency Jaipur`,
    description,
    keywords: [
      'social media agency Jaipur',
      'creative agency Rajasthan',
      'content production Jaipur',
      'brand strategy India',
      ...keywords,
    ],
    openGraph: {
      title: `${title} | Rogue Studio`,
      description,
      url,
      siteName: 'Rogue Studio',
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Rogue Studio`,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
