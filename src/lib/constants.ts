import type { NavLink, Testimonial, PricingPlan, TeamMember } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.roguestudio.in'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918003225164'

export const STUDIO_ADDRESS = {
  street: 'Malviya Nagar',
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  pin: '302017',
  full: 'Malviya Nagar, Jaipur, Rajasthan, India – 302017',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Real client quotes only — same policy as the portfolio metrics.
 *
 * Emptied deliberately: the previous three entries were template placeholders
 * (Jaipur Artisans / LuxStay / Wellness Hub) for companies that are not clients.
 * Add real quotes here, then restore <Testimonials /> in app/page.tsx.
 */
export const TESTIMONIALS: Testimonial[] = []

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '₹40,000',
    description: 'Essential social presence',
    features: ['12 Reels per month', 'Basic Community Mgmt', 'Creative Direction'],
    ctaLabel: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₹95,000',
    description: 'High-velocity content scaling',
    features: [
      '25 Reels + Static Content',
      'Strategy & Growth Audit',
      'Dedicated Manager',
      'Ad Creative Pack',
    ],
    ctaLabel: 'Go Growth',
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹2,20,000+',
    description: 'Full digital takeover',
    features: [
      'Unlimited Production',
      'Web + CRO Design',
      'Weekly Analytics Sync',
      'Influencer Campaign Mgmt',
    ],
    ctaLabel: 'Custom Plan',
  },
]

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Gagan Jain',
    role: 'Operations',
    bio: 'Keeps the studio running — from client onboarding to delivery, nothing falls through the cracks.',
  },
  {
    name: 'Shruti Sharma',
    role: 'Head of Strategy',
    bio: 'The brain behind every content plan — she turns brand goals into strategies that actually convert.',
  },
  {
    name: 'Nikhil Singh',
    role: 'Lead Cinematographer',
    bio: 'Frames every shoot with intention — reels, brand films, and campaigns that stop the scroll.',
  },
]

export const SERVICES_LIST = [
  'Social Media Management',
  'Content Production',
  'Brand Strategy',
  'Web Design',
  'Paid Social Ads',
  'Copywriting',
]

export const PORTFOLIO_FILTERS = ['All', 'Social', 'Video', 'Brand', 'Strategy'] as const
export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number]
