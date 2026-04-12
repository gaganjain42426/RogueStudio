import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WorkClient from './WorkClient'

export const metadata: Metadata = buildMetadata({
  title: 'Our Work',
  description:
    'Browse Rogue Studio\'s portfolio of brand design, social strategy, video production, and digital campaigns — crafted in Jaipur, India.',
  path: '/work',
  keywords: ['portfolio', 'brand design portfolio Jaipur', 'social media campaigns India'],
})

export default function WorkPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-4">
          <span className="text-secondary text-xs font-bold tracking-widest uppercase">
            Portfolio
          </span>
          <h1
            className="mt-4 text-6xl md:text-8xl font-black text-white leading-tight"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Our{' '}
            <span
              className="text-primary-container italic font-normal"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              Work
            </span>
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-xl mx-auto">
            Projects that pushed limits, broke rules, and delivered results.
          </p>
        </div>

        <WorkClient />
      </div>
    </div>
  )
}
