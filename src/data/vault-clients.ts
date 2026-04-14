export interface VaultClient {
  id: string
  name: string
  industry: string
  category: 'commercial' | 'wellness' | 'industrial'
  thumbnail: string
  ref: string
  tagline: string
  caseStudy: string
  stat: { label: string; value: string }
  gridSpan: 'tall' | 'wide' | 'normal'
}

export const VAULT_CLIENTS: VaultClient[] = [
  {
    id: 'janta-bar',
    name: 'Janta Bar',
    industry: 'Hospitality & Nightlife',
    category: 'commercial',
    thumbnail: 'https://picsum.photos/seed/janta/600/800',
    ref: 'Ref. RGS-2026-J01',
    tagline: 'Surrogate Marketing, Amplified',
    caseStudy:
      'Janta Bar needed to cut through the noise of surrogate marketing restrictions. We built a visual identity that speaks volumes without saying a word — cinematic reels, moody lighting, and a content strategy that turned every post into an experience. The result? A brand that people recognize by vibe alone.',
    stat: { label: 'Reach Growth', value: '+340%' },
    gridSpan: 'tall',
  },
  {
    id: 'sarvatra-energy',
    name: 'Sarvatra Energy',
    industry: 'Renewable Energy',
    category: 'industrial',
    thumbnail: 'https://picsum.photos/seed/sarvatra/800/400',
    ref: 'Ref. RGS-2026-S02',
    tagline: 'Powering Perception',
    caseStudy:
      'Sarvatra Energy had the tech but not the story. We reframed their solar solutions from technical specs to human impact — families powered, communities lit up, futures brightened. Every frame we shot carried weight and purpose.',
    stat: { label: 'Engagement', value: '+280%' },
    gridSpan: 'wide',
  },
  {
    id: 'erudite-acutraa',
    name: 'Erudite / Acutraa',
    industry: 'EdTech & Innovation',
    category: 'commercial',
    thumbnail: 'https://picsum.photos/seed/erudite/600/600',
    ref: 'Ref. RGS-2026-E03',
    tagline: 'Knowledge, Visualized',
    caseStudy:
      'For Erudite and Acutraa, education needed to feel exciting. We created a visual language that made learning look aspirational — clean graphics, dynamic reels, and a content calendar that kept students engaged and coming back for more.',
    stat: { label: 'Followers', value: '+12K' },
    gridSpan: 'normal',
  },
  {
    id: 'naman-vastu',
    name: 'Naman Vastu',
    industry: 'Real Estate & Vastu',
    category: 'wellness',
    thumbnail: 'https://picsum.photos/seed/naman/600/600',
    ref: 'Ref. RGS-2026-N04',
    tagline: 'Spaces That Speak',
    caseStudy:
      'Naman Vastu bridges ancient wisdom with modern living. We built their digital presence around trust and authority — warm tones, architectural photography, and testimonial-driven content that positions them as the go-to Vastu consultant.',
    stat: { label: 'Inquiries', value: '+190%' },
    gridSpan: 'normal',
  },
  {
    id: 'choudhary-nursery',
    name: 'Choudhary Nursery',
    industry: 'Agriculture & Green Living',
    category: 'wellness',
    thumbnail: 'https://picsum.photos/seed/choudhary/600/800',
    ref: 'Ref. RGS-2026-C05',
    tagline: 'Rooted in Story',
    caseStudy:
      'Choudhary Nursery wasn\'t just selling plants — they were selling a lifestyle. We leaned into organic storytelling: golden-hour shoots in the nursery, close-ups of soil and leaves, and reels that made gardening feel like meditation. The audience didn\'t just follow — they felt it.',
    stat: { label: 'Organic Reach', value: '+420%' },
    gridSpan: 'tall',
  },
  {
    id: 'vimla-international',
    name: 'Vimla International',
    industry: 'Export & Trade',
    category: 'industrial',
    thumbnail: 'https://picsum.photos/seed/vimla/800/400',
    ref: 'Ref. RGS-2026-V06',
    tagline: 'Global Presence, Local Craft',
    caseStudy:
      'Vimla International needed to look world-class for international buyers. We elevated their brand from a local exporter to a global player — professional product photography, corporate reels, and a LinkedIn strategy that opened doors across continents.',
    stat: { label: 'B2B Leads', value: '+85%' },
    gridSpan: 'wide',
  },
]

export type VaultFilter = 'all' | 'commercial' | 'wellness' | 'industrial'

export const VAULT_FILTERS: { label: string; value: VaultFilter }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Industrial', value: 'industrial' },
]
