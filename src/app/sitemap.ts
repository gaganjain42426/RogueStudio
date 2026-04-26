import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const lastModified = new Date('2026-04-26')

  const routes = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/work', priority: 0.9 },
    { path: '/services', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/blog', priority: 0.7 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    priority,
  }))
}
