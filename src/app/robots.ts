import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Prefix match (no trailing slash) blocks both the index route and all
        // sub-paths — e.g. `/admin` also covers `/admin/clients`.
        disallow: ['/api/', '/admin', '/portal', '/client-login'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
