export interface NavLink {
  label: string
  href: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface PricingPlan {
  name: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  ctaLabel: string
  featured?: boolean
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface ContactFormData {
  name: string
  company: string
  email: string
  whatsapp: string
  service: string
  budget?: string
  message: string
}
