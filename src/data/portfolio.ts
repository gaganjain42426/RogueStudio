/**
 * Portfolio data — real Rogue Studio clients.
 *
 * Media resolution:
 *   • `reels`      → local mp4s under /public/reels (best videos, play inline + lightbox)
 *   • `dashboards` → screenshot SLOTS. Drop a file at the given `src` path and it
 *                    renders automatically (server checks existence in page.tsx).
 *   • `workSamples`→ image SLOTS for posts/designs, same drop-in behaviour.
 *
 * Metrics policy: REAL numbers only (from client notes). Where no figure exists,
 * we show qualitative `highlights` instead of inventing percentages.
 */

export type PortfolioTag =
  | 'Hospitality'
  | 'Real Estate'
  | 'Healthcare'
  | 'Solar & Energy'
  | 'Export'
  | 'In-House'

export interface Metric {
  value: string
  label: string
}

/** A media slot that resolves to a real file if present, else a labeled placeholder. */
export interface MediaSlot {
  /** Intended public path. Drop a file here and it appears automatically. */
  src: string
  /** What this slot represents (shown on the placeholder + as alt text). */
  label: string
}

export interface PortfolioClient {
  id: string
  name: string
  slug: string
  logo: string
  /** Subtle glow / accent used behind the logo and on hover states. */
  accent: string
  industry: string
  tag: PortfolioTag
  instagram: string
  instagramHandle: string
  /** Short punchy line under the name. */
  tagline: string
  /** One-line summary of the engagement. */
  summary: string
  /** What we actually handle for them. */
  scope: string[]
  /** Longer narrative. */
  caseStudy: string
  /** REAL figures only. May be empty. */
  metrics: Metric[]
  /** Qualitative wins shown when metrics are sparse. */
  highlights: string[]
  /** Local mp4 reels (already in /public/reels). */
  reels: string[]
  /** Dashboard screenshot slots (drop-in). */
  dashboards: MediaSlot[]
  /** Work-sample image slots (drop-in). */
  workSamples: MediaSlot[]
  /** Rogue's own subsidiary brand, not a paying client. */
  isInHouse?: boolean
  /** Notes file was empty — copy is minimal, flag for the team to expand. */
  needsContext?: boolean
}

export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  {
    id: 'sarvatra-energy',
    name: 'Sarvatra Energy',
    slug: 'sarvatra-energy',
    logo: '/clients/sarvatra.jpg',
    accent: '#f5a524',
    industry: 'Solar & Renewable Energy',
    tag: 'Solar & Energy',
    instagram: 'https://www.instagram.com/sarvatraenergy/',
    instagramHandle: '@sarvatraenergy',
    tagline: 'Founder-led content that sells solar.',
    summary:
      'With them since day one — building founder-led content and running performance ads that turn trust into qualified leads.',
    scope: [
      'Founder-Led Content',
      'Brand Storytelling',
      'Meta Ads Management',
      'Lead Generation',
    ],
    caseStudy:
      "We've been with Sarvatra from the very start of the brand. We built engaging, founder-led content that shows how they actually do business — the kind of transparency that builds real trust in a high-consideration purchase like solar. Alongside the content, we run their Meta ads end-to-end, consistently pulling qualified leads at under ₹15 each and returning roughly 10X on ad spend.",
    metrics: [
      { value: '10X', label: 'Return on ad spend' },
      { value: '<₹15', label: 'Cost per qualified lead' },
    ],
    highlights: ['Brand built from day one', 'Founder-led trust content', 'Qualified lead pipeline'],
    reels: ['/reels/sarvatra1.mp4', '/reels/sarvatra2.mp4', '/reels/sarvatra3.mp4'],
    dashboards: [
      { src: '/clients/sarvatra/dashboard-ads.jpg', label: 'Meta Ads Manager — cost per lead' },
      { src: '/clients/sarvatra/dashboard-leads.jpg', label: 'Lead volume & ROI dashboard' },
    ],
    workSamples: [
      { src: '/clients/sarvatra/work-1.jpg', label: 'Founder content still' },
      { src: '/clients/sarvatra/work-2.jpg', label: 'Ad creative' },
    ],
  },
  {
    id: 'naman-vaastu',
    name: 'Naman Vaastu Designs',
    slug: 'naman-vaastu',
    logo: '/clients/naman-vaastu.jpg',
    accent: '#c9a24b',
    industry: 'Architecture & Vaastu',
    tag: 'Real Estate',
    instagram: 'https://www.instagram.com/namanvaastudesigns/',
    instagramHandle: '@namanvaastudesigns',
    tagline: 'One-stop studio. Script to lead.',
    summary:
      'A true one-stop engagement — personal branding for all three founders, on-site shoots, and Meta ads delivering 5X ROI.',
    scope: [
      'Personal Branding (×3 Founders)',
      'Client Testimonials',
      'On-Site Shoot Coverage',
      'Meta Ads & Lead Gen',
    ],
    caseStudy:
      'For Naman Vaastu we run the entire engine. We post consistent organic content across multiple pillars — personal branding for all three founders, captured client testimonials, and on-site shoot coverage from groundbreaking to completion. On top of that we manage their Meta ads and lead generation. From scripting to shooting to editing to posting to pushing ads, we own the full pipeline and deliver at least a 5X return.',
    metrics: [{ value: '5X', label: 'Minimum ROI delivered' }],
    highlights: [
      'Personal branding for 3 founders',
      'Client testimonial capture',
      'On-site shoot coverage',
      'Full script-to-lead pipeline',
    ],
    reels: [
      '/reels/naman1.mp4',
      '/reels/naman2.mp4',
      '/reels/naman3.mp4',
      '/reels/naman4.mp4',
      '/reels/interior1.mp4',
      '/reels/interior2.mp4',
      '/reels/interior3.mp4',
      '/reels/interior4.mp4',
    ],
    dashboards: [
      { src: '/clients/naman-vaastu/dashboard-ads.jpg', label: 'Meta Ads — 5X ROI view' },
      { src: '/clients/naman-vaastu/dashboard-reach.jpg', label: 'Instagram reach & growth' },
    ],
    workSamples: [
      { src: '/clients/naman-vaastu/work-1.jpg', label: 'Founder branding still' },
      { src: '/clients/naman-vaastu/work-2.jpg', label: 'On-site shoot frame' },
    ],
  },
  {
    id: 'janta-bar',
    name: 'Janta Bar',
    slug: 'janta-bar',
    logo: '/clients/janta-bar.jpg',
    accent: '#d6453a',
    industry: 'Hospitality & Nightlife',
    tag: 'Hospitality',
    instagram: 'https://www.instagram.com/jantabar.jaipur/',
    instagramHandle: '@jantabar.jaipur',
    tagline: 'From shoot to footfall.',
    summary:
      'Engaging content for one of Jaipur’s buzzing restaurant-bars — showcasing top-tier service and driving real footfall.',
    scope: [
      'Content Shoots',
      'Social Media Management',
      'Influencer Collaborations',
      'Footfall Marketing',
    ],
    caseStudy:
      "We create engaging content for Janta Bar's Instagram, focused on showcasing their top-tier service and the energy of the restaurant itself. Our role spans the full funnel — from shooting the content to driving real business through influencer collaborations and a social presence that keeps the venue front of mind.",
    metrics: [],
    highlights: [
      'Full-funnel content',
      'Influencer collaborations',
      'Service & venue storytelling',
      'Shoot-to-footfall pipeline',
    ],
    reels: ['/reels/jantabar1.mp4', '/reels/jantabar2.mp4'],
    dashboards: [
      { src: '/clients/janta-bar/dashboard-reach.jpg', label: 'Instagram reach & engagement' },
    ],
    workSamples: [
      { src: '/clients/janta-bar/work-1.jpg', label: 'Venue content still' },
      { src: '/clients/janta-bar/work-2.jpg', label: 'Influencer collab post' },
    ],
  },
  {
    id: 'noble-vibes-clinic',
    name: 'Noble Vibes Clinic',
    slug: 'noble-vibes-clinic',
    logo: '/clients/noble-vibes.jpg',
    accent: '#3fa7a0',
    industry: 'Healthcare & Wellness',
    tag: 'Healthcare',
    instagram: 'https://www.instagram.com/noblevibesclinic/',
    instagramHandle: '@noblevibesclinic',
    tagline: 'Putting specialists on screen.',
    summary:
      'In-house personal-branding videos featuring every available specialist doctor at the clinic.',
    scope: ['Personal Branding', 'Doctor Features', 'In-House Production', 'Reels'],
    caseStudy:
      'For Noble Vibes Clinic we produce personal-branding videos that put their specialists front and centre — capturing each available doctor in a way that builds patient trust and authority. Everything, from concept to final edit, is done in-house.',
    metrics: [],
    highlights: [
      'Doctor personal branding',
      'Specialist features',
      '100% in-house production',
    ],
    reels: ['/reels/noblevibes1.mp4', '/reels/noblevibes2.mp4'],
    dashboards: [
      { src: '/clients/noble-vibes/dashboard-reach.jpg', label: 'Instagram reach & growth' },
    ],
    workSamples: [
      { src: '/clients/noble-vibes/work-1.jpg', label: 'Doctor feature still' },
    ],
  },
  {
    id: 'vimla-international',
    name: 'Vimla International',
    slug: 'vimla-international',
    logo: '/clients/vimla.webp',
    accent: '#8b6fc9',
    industry: 'Export & Trade',
    tag: 'Export',
    instagram: 'https://www.instagram.com/vimla_international/',
    instagramHandle: '@vimla_international',
    tagline: 'Organic content, AI-powered visuals.',
    summary:
      'Organic content built over time, plus AI image-generation services for fresh, scalable visuals.',
    scope: ['Organic Content', 'AI Image Generation', 'Product Storytelling'],
    caseStudy:
      "We've produced organic content for Vimla International over a sustained period, and layered in AI image-generation services to give them a steady stream of fresh, scalable visuals — blending real content craft with new generative tooling.",
    metrics: [],
    highlights: ['Sustained organic content', 'AI image generation', 'Product storytelling'],
    reels: ['/reels/vimla1.mp4', '/reels/vimla2.mp4'],
    dashboards: [
      { src: '/clients/vimla-international/dashboard-reach.jpg', label: 'Instagram reach & growth' },
    ],
    workSamples: [
      { src: '/clients/vimla-international/work-1.jpg', label: 'Organic content still' },
      { src: '/clients/vimla-international/work-2.jpg', label: 'AI-generated visual' },
    ],
  },
  {
    id: 'solaroof-solutions',
    name: 'Solaroof Solutions',
    slug: 'solaroof-solutions',
    logo: '/clients/solaroof.jpg',
    accent: '#2f80ed',
    industry: 'Solar & Renewable Energy',
    tag: 'Solar & Energy',
    instagram: '',
    instagramHandle: '',
    tagline: 'Solar brand content.',
    summary: 'Content partnership for a solar solutions brand.',
    scope: ['Content Production', 'Social Media'],
    caseStudy:
      'Content partnership for Solaroof Solutions, a solar brand. [Add the engagement details — pillars, ads, results — to fill this case study out.]',
    metrics: [],
    highlights: ['Solar brand content'],
    reels: ['/reels/solaroof1.mp4'],
    dashboards: [],
    workSamples: [{ src: '/clients/solaroof-solutions/work-1.jpg', label: 'Brand content still' }],
    needsContext: true,
  },
  {
    id: 'secret-grapher',
    name: 'The Secret Grapher',
    slug: 'secret-grapher',
    logo: '/clients/secret-grapher.jpg',
    accent: '#d96a8f',
    industry: 'Wedding Films & Content',
    tag: 'In-House',
    instagram: 'https://www.instagram.com/the.secret.grapher/',
    instagramHandle: '@the.secret.grapher',
    tagline: 'Our wedding-content lab.',
    summary:
      'Rogue’s own subsidiary brand, dedicated to wedding films and content — with reels that have crossed millions of views.',
    scope: ['Wedding Films', 'Short-Form Content', 'Cinematic Storytelling'],
    caseStudy:
      'The Secret Grapher is our in-house subsidiary brand, focused entirely on wedding content and everything around it. It’s our proving ground for cinematic storytelling — home to some of our most-watched work, with reels that have crossed views in the millions.',
    metrics: [{ value: '1M+', label: 'Views on top reels' }],
    highlights: ['In-house subsidiary brand', 'Cinematic wedding films', 'Millions of views'],
    reels: ['/reels/secretgrapher1.mp4', '/reels/secretgrapher2.mp4'],
    dashboards: [],
    workSamples: [
      { src: '/clients/secret-grapher/work-1.jpg', label: 'Wedding film still' },
      { src: '/clients/secret-grapher/work-2.jpg', label: 'Cinematic frame' },
    ],
    isInHouse: true,
  },
]

export const PORTFOLIO_FILTERS: { label: string; value: PortfolioTag | 'All' }[] = [
  { label: 'All Work', value: 'All' },
  { label: 'Solar & Energy', value: 'Solar & Energy' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Export', value: 'Export' },
  { label: 'In-House', value: 'In-House' },
]

/** Aggregate, de-duplicated reel list for the "reel wall" section. */
export const ALL_REELS: { src: string; client: string }[] = PORTFOLIO_CLIENTS.flatMap((c) =>
  c.reels.map((src) => ({ src, client: c.name })),
)

/* ── Resolved shapes (built in the server page after on-disk existence checks) ── */

export interface ResolvedMedia extends MediaSlot {
  /** True if the file exists in /public — render it; otherwise show a placeholder. */
  available: boolean
}

export interface ResolvedReel {
  src: string
  available: boolean
}

export interface ResolvedClient
  extends Omit<PortfolioClient, 'dashboards' | 'workSamples' | 'reels'> {
  reels: ResolvedReel[]
  dashboards: ResolvedMedia[]
  workSamples: ResolvedMedia[]
  /** Count of reels that actually exist on disk. */
  liveReelCount: number
}

/** Lightbox payload. */
export interface ActiveReel {
  src: string
  client: string
  instagram: string
}
