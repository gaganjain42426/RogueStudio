import type { NavLink, Project, Testimonial, ServiceTile, PricingPlan, TeamMember } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.roguestudio.in'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918003225164'

export const STUDIO_ADDRESS = {
  street: 'Sanganer',
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  pin: '302029',
  full: 'Sanganer, Jaipur, Rajasthan, India – 302029',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const PROJECTS: Project[] = [
  {
    id: 'sarvatra-energy',
    title: 'Sarvatra Energy',
    category: 'Brand Design',
    imageUrl: 'https://picsum.photos/seed/sarvatra/400/500',
    imageAlt: 'Sarvatra Energy – Brand Design project',
    tags: ['Brand'],
  },
  {
    id: 'vimla-loomcraft',
    title: 'Vimla LoomCraft',
    category: 'Social Strategy',
    imageUrl: 'https://picsum.photos/seed/vimla/400/500',
    imageAlt: 'Vimla LoomCraft – Social Strategy project',
    tags: ['Social'],
  },
  {
    id: 'naman-vaastu',
    title: 'Naman Vaastu',
    category: 'Digital Content',
    imageUrl: 'https://picsum.photos/seed/naman/400/500',
    imageAlt: 'Naman Vaastu – Digital Content project',
    tags: ['Video'],
  },
  {
    id: 'noble-vibes-clinic',
    title: 'Noble Vibes Clinic',
    category: 'Visual Identity',
    imageUrl: 'https://picsum.photos/seed/noble/400/500',
    imageAlt: 'Noble Vibes Clinic – Visual Identity project',
    tags: ['Brand'],
  },
  {
    id: 'lets-moveon-yoga',
    title: "Let's Moveon Yoga",
    category: 'Campaign',
    imageUrl: 'https://picsum.photos/seed/yoga/400/500',
    imageAlt: "Let's Moveon Yoga – Campaign project",
    tags: ['Social'],
  },
  {
    id: 'new-project',
    title: 'Coming Soon',
    category: 'Social Media',
    imageUrl: 'https://picsum.photos/seed/roguestudio6/400/500',
    imageAlt: 'New Rogue Studio project – coming soon',
    tags: ['Social'],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ananya',
    quote:
      'Rogue Studio completely transformed our visual presence. Our conversion rate increased by 40% after the rebrand.',
    author: 'Ananya Sharma',
    role: 'Founder',
    company: 'Jaipur Artisans',
  },
  {
    id: 'kabir',
    quote:
      "They don't just follow trends, they set them. Best creative investment we've made in years.",
    author: 'Kabir Singh',
    role: 'Marketing Director',
    company: 'LuxStay',
  },
  {
    id: 'meera',
    quote:
      'The storytelling in their video content is unmatched. Rogue really knows how to build emotional connections.',
    author: 'Meera Verma',
    role: 'CEO',
    company: 'Wellness Hub',
  },
]

export const SERVICE_TILES: ServiceTile[] = [
  { icon: 'terminal', label: 'Web Design' },
  { icon: 'movie', label: 'Reels Production' },
  { icon: 'brush', label: 'Branding' },
  { icon: 'ads_click', label: 'Paid Social' },
  { icon: 'edit_note', label: 'Copywriting' },
  { icon: 'groups', label: 'Community' },
  { icon: 'local_mall', label: 'E-commerce' },
  { icon: 'auto_awesome', label: 'AI Solutions' },
  { icon: 'camera', label: 'Photography' },
  { icon: 'podcasts', label: 'Podcast Ops' },
]

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
    imageUrl: 'https://picsum.photos/seed/gagan/400/400',
  },
  {
    name: 'Shruti Sharma',
    role: 'Head of Strategy',
    bio: 'The brain behind every content plan — she turns brand goals into strategies that actually convert.',
    imageUrl: 'https://picsum.photos/seed/shruti/400/400',
  },
  {
    name: 'Nikhil Singh',
    role: 'Lead Cinematographer',
    bio: 'Frames every shoot with intention — reels, brand films, and campaigns that stop the scroll.',
    imageUrl: 'https://picsum.photos/seed/nikhil/400/400',
  },
  {
    name: 'Bhuvanesh Jaiswal',
    role: 'Tech & Development',
    bio: 'Builds the digital backbone — websites, dashboards, and every line of code that powers the brand.',
    imageUrl: 'https://picsum.photos/seed/bhuvanesh/400/400',
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
