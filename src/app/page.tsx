import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import ReelsCarousel from '@/components/sections/ReelsCarousel'
import WhatWeDo from '@/components/sections/WhatWeDo'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Results from '@/components/sections/Results'
import Pricing from '@/components/sections/Pricing'
import ServicesGrid from '@/components/sections/ServicesGrid'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Rogue Studio — Creative & Social Media Agency Jaipur',
  description:
    'Rogue Studio is a creative and social media marketing agency based in Jaipur, India. Cinematic brands, scroll-stopping content, and growth-driven strategies.',
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
    description: 'Cinematic brands, scroll-stopping content, and strategies that grow business.',
    url: 'https://roguestudio.in',
    images: [{ url: '/og/home-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
  alternates: { canonical: 'https://roguestudio.in' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ReelsCarousel />
      <WhatWeDo />
      <Services />
      <FeaturedWork />
      <Results />
      <Pricing />
      <ServicesGrid />
      <About />
      <Testimonials />
      <FinalCTA />
    </>
  )
}


