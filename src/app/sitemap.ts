import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const lastModified = new Date('2026-06-13')

  const routes = [
    { path: '', priority: 1.0 },
    { path: '/portfolio', priority: 0.95 },
    { path: '/services', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/blog', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    // Keyword-targeted SEO landing pages
    { path: '/social-media-agency-jaipur', priority: 0.85 },
    { path: '/reels-production-jaipur', priority: 0.85 },
    { path: '/digital-marketing-jaipur', priority: 0.85 },
    { path: '/instagram-marketing-jaipur', priority: 0.85 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    priority,
  }))
}
