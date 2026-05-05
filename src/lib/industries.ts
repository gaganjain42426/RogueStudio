export interface Industry {
  slug: string
  name: string
  icon: string
  desc: string
  heroDescription: string
}

export interface Reel {
  src: string
  label: string
}

export interface IndustryClient {
  name: string
  services: string[]
  deliverables: string[]
  outcomes: string[]
  reels: Reel[]
}

export const industries: Industry[] = [
  {
    slug: 'interior-design',
    name: 'Interior Design',
    icon: 'chair',
    desc: 'Spaces that sell before clients walk in.',
    heroDescription:
      'We help interior designers build a digital presence as premium as the spaces they create.',
  },
  {
    slug: 'architecture',
    name: 'Architecture',
    icon: 'architecture',
    desc: 'Portfolios as grand as the structures you build.',
    heroDescription:
      'From concept renders to completed projects — we make your portfolio unmissable.',
  },
  {
    slug: 'solar-energy',
    name: 'Solar & Energy',
    icon: 'solar_power',
    desc: 'Clean energy, powerful digital presence.',
    heroDescription:
      'We turn clean energy expertise into content that educates, builds trust, and drives leads.',
  },
  {
    slug: 'wellness-clinic',
    name: 'Wellness & Clinics',
    icon: 'health_and_safety',
    desc: 'Build trust before the first appointment.',
    heroDescription:
      'Patient-first content that communicates care, credibility, and expertise.',
  },
  {
    slug: 'yoga-fitness',
    name: 'Yoga & Fitness',
    icon: 'self_improvement',
    desc: 'Content that moves as much as your classes.',
    heroDescription: 'Mindful content strategy that builds community around your practice.',
  },
  {
    slug: 'coaching',
    name: 'Coaching & Education',
    icon: 'school',
    desc: 'Authority content for thought leaders.',
    heroDescription: 'Positioning you as the go-to authority in your coaching niche.',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & Cafes',
    icon: 'restaurant',
    desc: 'Make them hungry before they arrive.',
    heroDescription: 'Scroll-stopping food content that fills tables and grows followers.',
  },
  {
    slug: 'fashion',
    name: 'Fashion & Apparel',
    icon: 'checkroom',
    desc: 'Visual storytelling for brands that dress culture.',
    heroDescription: 'Editorial-grade content for brands that set trends, not follow them.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'apartment',
    desc: 'Listings that look like luxury experiences.',
    heroDescription: 'Property content that creates desire and drives enquiries.',
  },
  {
    slug: 'gyms',
    name: 'Gyms & Sports',
    icon: 'fitness_center',
    desc: 'High-energy content for high-performance brands.',
    heroDescription: 'Hype-driven content that builds culture, community, and conversions.',
  },
  {
    slug: 'hospitals',
    name: 'Hospitals & Healthcare',
    icon: 'local_hospital',
    desc: 'Sensitive, trust-first healthcare communication.',
    heroDescription: 'Sensitive, accurate healthcare content that earns patient trust.',
  },
  {
    slug: 'schools',
    name: 'Schools & Institutions',
    icon: 'menu_book',
    desc: 'Enrolment-driving content for educators.',
    heroDescription:
      "Content that communicates your institution's values and drives admissions.",
  },
]

export const industryClients: Record<string, IndustryClient[]> = {
  'interior-design': [
    {
      name: 'Naman Vaastu & Designs',
      services: [
        'Social Media Management',
        'Content Strategy',
        'Brand Voice',
        'Instagram Growth',
      ],
      deliverables: [
        'Monthly Content Calendar',
        'Custom Post Designs',
        'Reel Concepts & Scripts',
      ],
      outcomes: [
        'Premium Brand Presence Built',
        'Multi-Platform Identity Established',
        'Content System Launched',
      ],
      reels: [
        { src: '/reels/interior1.mp4', label: 'Interior Showcase' },
        { src: '/reels/interior2.mp4', label: 'Space Reveal' },
        { src: '/reels/interior3.MP4', label: 'Design Details' },
        { src: '/reels/interior4.MP4', label: 'Project Walkthrough' },
        { src: '/reels/naman1.mp4', label: 'Talking Head' },
        { src: '/reels/naman2.mp4', label: 'Talking Head' },
        { src: '/reels/naman3.mp4', label: 'Talking Head' },
        { src: '/reels/naman4.MP4', label: 'Work in Progress' },
      ],
    },
  ],
  architecture: [
    {
      name: 'Naman Vaastu & Designs',
      services: [
        'Social Media Management',
        'Content Strategy',
        'Brand Voice',
        'Instagram Growth',
      ],
      deliverables: [
        'Monthly Content Calendar',
        'Custom Post Designs',
        'Reel Concepts & Scripts',
      ],
      outcomes: [
        'Premium Brand Presence Built',
        'Multi-Platform Identity Established',
        'Content System Launched',
      ],
      reels: [
        { src: '/reels/interior1.mp4', label: 'Interior Showcase' },
        { src: '/reels/interior2.mp4', label: 'Space Reveal' },
        { src: '/reels/interior3.MP4', label: 'Design Details' },
        { src: '/reels/interior4.MP4', label: 'Project Walkthrough' },
        { src: '/reels/naman1.mp4', label: 'Talking Head' },
        { src: '/reels/naman2.mp4', label: 'Talking Head' },
        { src: '/reels/naman3.mp4', label: 'Talking Head' },
        { src: '/reels/naman4.MP4', label: 'Work in Progress' },
      ],
    },
  ],
  'solar-energy': [
    {
      name: 'Sarvatra Energy',
      services: [
        'Social Media Strategy',
        'SEO Audit & Website Optimization',
        'Content Creation',
        'LinkedIn Growth',
      ],
      deliverables: [
        'SEO-Optimized Website',
        'Social Media Content Plan',
        'Local Keyword Strategy',
      ],
      outcomes: [
        'SEO Foundation Set',
        'Organic Growth Strategy Launched',
        'B2B & B2C Audience Reached',
      ],
      reels: [
        { src: '/reels/sarvatra1.mp4', label: 'Installation Reel' },
        { src: '/reels/sarvatra2.mp4', label: 'Brand Story' },
        { src: '/reels/sarvatra3.mp4', label: 'Team Spotlight' },
      ],
    },
  ],
  'wellness-clinic': [
    {
      name: 'Noble Vibes Clinic',
      services: [
        'Social Media Management',
        'Healthcare Content',
        'Brand Tone & Voice',
        'Patient Education Content',
      ],
      deliverables: ['Monthly Calendar', 'Awareness Posts', 'Reel Concepts'],
      outcomes: [
        'Trust-First Positioning Built',
        'Patient Education Content Live',
        'Consistent Brand Voice Established',
      ],
      reels: [
        { src: '/reels/noblevibes1.mp4', label: 'Clinic Reel' },
        { src: '/reels/noblevibes2.mp4', label: 'Patient Education' },
      ],
    },
  ],
  'yoga-fitness': [
    {
      name: 'Lets Moveon Yoga',
      services: ['Social Media Management', 'Content Strategy', 'Community Growth'],
      deliverables: ['Content Calendar', 'Reel Concepts', 'Caption Copywriting'],
      outcomes: [
        'Community Growth Strategy Launched',
        'Brand Identity Sharpened',
        'Consistent Posting Live',
      ],
      reels: [],
    },
  ],
  coaching: [],
  restaurants: [],
  fashion: [
    {
      name: 'Vimla LoomCraft Experience',
      services: [
        'Brand Positioning',
        'Instagram Strategy',
        'Persona Development',
        'GTM Planning',
      ],
      deliverables: [
        '180-Day Go-To-Market Roadmap',
        'Audience Persona Profiles',
        'Instagram Content Themes',
      ],
      outcomes: [
        'Heritage Narrative Built',
        'Tourism Market Targeted',
        'Cultural Brand Positioning Done',
      ],
      reels: [
        { src: '/reels/vimla1.mp4', label: 'Collection Reel' },
        { src: '/reels/vimla2.mp4', label: 'Heritage Story' },
      ],
    },
  ],
  'real-estate': [],
  gyms: [],
  hospitals: [],
  schools: [],
}
