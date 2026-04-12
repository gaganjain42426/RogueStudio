export interface NavLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  category: string
  imageUrl: string
  imageAlt: string
  tags: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface ServiceTile {
  icon: string
  label: string
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
  imageUrl: string
}

export interface ContactFormData {
  name: string
  company: string
  email: string
  whatsapp: string
  service: string
  message: string
}
