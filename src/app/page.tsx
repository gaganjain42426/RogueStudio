import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getBunnyReels, shuffleReels } from '@/lib/bunny'
import Hero from '@/components/sections/Hero'
import ProofTicker from '@/components/sections/ProofTicker'
import FeaturedWork from '@/components/sections/FeaturedWork'
import ReelsCarousel from '@/components/sections/ReelsCarousel'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Studio from '@/components/sections/Studio'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Rogue Studio — Creative & Social Media Agency Jaipur',
  description:
    'Rogue Studio is a creative and social media agency in Jaipur, India. 200+ reels, 40M+ views, 10X peak ROAS — content production, social management, and performance ads from one studio.',
  keywords: [
    'social media agency Jaipur',
    'creative agency Rajasthan',
    'content production Jaipur',
    'brand strategy India',
    'digital marketing Jaipur',
    'reels production Jaipur',
  ],
  openGraph: {
    title: 'Rogue Studio — Creative Agency Jaipur',
    description: '200+ reels, 40M+ views, 10X peak ROAS. Content that turns scrolls into customers.',
    url: SITE_URL,
    type: 'website',
    locale: 'en_IN',
  },
  alternates: { canonical: SITE_URL },
}

export default async function HomePage() {
  const reels = await getBunnyReels()

  // Curated counts per surface — enough to feel endless, few enough to stay fast.
  const heroReels = shuffleReels(reels).slice(0, 12)
  const carouselReels = shuffleReels(reels).slice(0, 14)

  return (
    <>
      <Hero reels={heroReels} />
      <ProofTicker />
      <FeaturedWork />
      <ReelsCarousel reels={carouselReels} />
      <Services />
      <Process />
      <Studio />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </>
  )
}
