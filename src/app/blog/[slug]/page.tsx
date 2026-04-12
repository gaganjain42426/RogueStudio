import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Placeholder — replace with CMS/MDX integration
const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  'why-reels-still-win-in-2025': {
    title: 'Why Reels Still Win in 2025',
    date: 'April 1, 2026',
    category: 'Social Strategy',
    content: 'Full article content coming soon. This is a placeholder for the blog post body.',
  },
  'the-anatomy-of-a-viral-brand-moment': {
    title: 'The Anatomy of a Viral Brand Moment',
    date: 'March 20, 2026',
    category: 'Content',
    content: 'Full article content coming soon. This is a placeholder for the blog post body.',
  },
  'brand-identity-vs-brand-voice-the-difference': {
    title: 'Brand Identity vs Brand Voice: The Difference',
    date: 'March 5, 2026',
    category: 'Branding',
    content: 'Full article content coming soon. This is a placeholder for the blog post body.',
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: `${post.title} | Rogue Studio Blog`,
    description: `${post.category} insight from Rogue Studio — ${post.title}`,
    alternates: { canonical: `https://roguestudio.in/blog/${slug}` },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-on-surface-variant hover:text-white transition-colors text-sm flex items-center gap-2 mb-12"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Blog
        </Link>

        <span className="text-secondary text-xs font-bold uppercase tracking-widest">
          {post.category}
        </span>
        <h1
          className="mt-4 text-4xl md:text-6xl font-black text-white leading-tight"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          {post.title}
        </h1>
        <p className="mt-4 text-on-surface-variant text-sm">{post.date}</p>

        <div className="mt-16 aspect-video bg-surface-container-high rounded-lg" />

        <div className="mt-12 prose max-w-none">
          <p className="text-on-surface-variant text-lg leading-relaxed">{post.content}</p>
        </div>
      </div>
    </div>
  )
}
