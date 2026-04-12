import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rogue Studio',
    short_name: 'Rogue',
    description: 'Creative & Social Media Agency — Jaipur, India',
    start_url: '/',
    display: 'standalone',
    background_color: '#131313',
    theme_color: '#fa5c1b',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
