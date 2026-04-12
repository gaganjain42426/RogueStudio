import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Insights, strategies, and creative thinking from the Rogue Studio team — your guide to social media, branding, and content production in India.',
  path: '/blog',
  keywords: ['social media blog India', 'creative agency insights', 'content strategy Jaipur'],
})

// Placeholder posts — replace with CMS data
const posts = [
  {
    slug: 'why-reels-still-win-in-2025',
    title: 'Why Reels Still Win in 2025',
    category: 'Social Strategy',
    date: 'April 1, 2026',
    excerpt:
      'Short-form video isn\'t going anywhere. Here\'s why brands doubling down on Reels are seeing 3x the organic reach.',
    readTime: '5 min read',
  },
  {
    slug: 'the-anatomy-of-a-viral-brand-moment',
    title: 'The Anatomy of a Viral Brand Moment',
    category: 'Content',
    date: 'March 20, 2026',
    excerpt:
      'Viral isn\'t an accident. We break down the common threads in 10 campaigns that exploded — and what you can steal.',
    readTime: '7 min read',
  },
  {
    slug: 'brand-identity-vs-brand-voice-the-difference',
    title: 'Brand Identity vs Brand Voice: The Difference',
    category: 'Branding',
    date: 'March 5, 2026',
    excerpt:
      'Colour palettes and logos are one thing. Your brand\'s voice is the personality behind the pixels. Here\'s why it matters more.',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">
            Insights
          </span>
          <h1
            className="mt-4 text-5xl md:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            The Rogue{' '}
            <span
              className="text-primary-container italic font-normal"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              Dispatch
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-surface-container-high rounded-lg overflow-hidden hover:bg-surface-bright transition-colors duration-300 h-full">
                {/* Placeholder image */}
                <div className="aspect-video bg-surface-container-highest" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-on-surface-variant text-xs">{post.readTime}</span>
                  </div>
                  <h2
                    className="text-xl font-black text-white mb-3 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{post.excerpt}</p>
                  <p className="text-on-surface-variant/50 text-xs mt-6">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-on-surface-variant">
            More articles coming soon. Subscribe to{' '}
            <span className="text-primary-container font-bold">The Rogue Dispatch</span> for updates.
          </p>
        </div>
      </div>
    </div>
  )
}
