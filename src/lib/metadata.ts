import type { Metadata } from 'next'
import { SITE_URL } from './constants'

interface MetaOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = '/og/default-og.jpg',
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
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Rogue Studio`,
      description,
      images: [ogImage],
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
