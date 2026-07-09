'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import Icon from '@/components/ui/Icon'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(1, 'Please enter your company name'),
  email: z.string().email('Please enter a valid email'),
  whatsapp: z.string().min(10, 'Please enter a valid WhatsApp number'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please tell us about your project (min 10 chars)'),
})

const services = [
  'Content Production',
  'Social Media Management',
  'Performance Ads',
  'Web Design',
  'Brand Strategy',
  'Other',
]

const budgets = ['Under ₹40,000/mo', '₹40,000–₹1,00,000/mo', '₹1,00,000+/mo', 'One-off project']

function buildWhatsAppText(data: ContactFormData): string {
  return (
    `*New Inquiry — Rogue Studio Website*\n\n` +
    `*Name:* ${data.name}\n` +
    `*Business:* ${data.company}\n` +
    `*Email:* ${data.email}\n` +
    `*WhatsApp:* ${data.whatsapp}\n` +
    `*Service:* ${data.service}\n` +
    (data.budget ? `*Budget:* ${data.budget}\n` : '') +
    `\n*Message:*\n${data.message}`
  )
}

const inputClass =
  'w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/30'
const labelClass =
  'block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/70'

export default function ContactForm() {
  const [sent, setSent] = useState<ContactFormData | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const waLink = (data: ContactFormData) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppText(data))}`

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)

    // Log the inquiry server-side first so nothing is ever silently lost —
    // then hand off to WhatsApp. Failure to log must not block the visitor.
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {
      /* the WhatsApp handoff below still carries the lead */
    }

    setSent(data)
    setSubmitting(false)

    // Same-tab navigation on a user gesture — cannot be popup-blocked.
    // WhatsApp (app or web) opens; Back returns to the confirmation screen.
    window.location.assign(waLink(data))
  }

  const copyMessage = async () => {
    if (!sent) return
    try {
      await navigator.clipboard.writeText(buildWhatsAppText(sent).replace(/\*/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — links below still work */
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-container/20 flex items-center justify-center mb-6">
          <Icon name="check" size={36} className="text-primary-container" />
        </div>
        <h3
          className="text-3xl font-black text-on-tertiary-fixed"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Inquiry ready
        </h3>
        <p className="mt-3 max-w-sm text-on-tertiary-fixed-variant">
          WhatsApp should have opened with your message pre-filled — just hit send.
          If it didn&rsquo;t, use either option below. We reply within 4 working hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={waLink(sent)}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed px-7 py-3.5 rounded-full font-bold text-sm"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            <Icon name="chat" size={16} />
            Open WhatsApp
          </a>
          <a
            href={`mailto:hello@roguestudio.in?subject=${encodeURIComponent('Project inquiry — ' + sent.company)}&body=${encodeURIComponent(buildWhatsAppText(sent).replace(/\*/g, ''))}`}
            className="inline-flex items-center gap-2 border-2 border-on-tertiary-fixed/25 text-on-tertiary-fixed px-7 py-3.5 rounded-full font-bold text-sm hover:border-on-tertiary-fixed transition-colors"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            <Icon name="mail" size={16} />
            Email instead
          </a>
        </div>
        <button
          onClick={copyMessage}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed/60 hover:text-on-tertiary-fixed transition-colors"
        >
          {copied ? 'Copied ✓' : 'Copy my message'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Name */}
      <div className="space-y-1">
        <label htmlFor="contact-name" className={labelClass}>
          Full Name
        </label>
        <input id="contact-name" {...register('name')} className={inputClass} placeholder="Your name" />
        {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Company */}
      <div className="space-y-1">
        <label htmlFor="contact-company" className={labelClass}>
          Business Name
        </label>
        <input id="contact-company" {...register('company')} className={inputClass} placeholder="Your company" />
        {errors.company && <p className="text-error text-xs mt-1">{errors.company.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="contact-email" className={labelClass}>
          Email Address
        </label>
        <input
          id="contact-email"
          {...register('email')}
          type="email"
          className={inputClass}
          placeholder="hello@yourcompany.com"
        />
        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* WhatsApp */}
      <div className="space-y-1">
        <label htmlFor="contact-whatsapp" className={labelClass}>
          WhatsApp Number
        </label>
        <input
          id="contact-whatsapp"
          {...register('whatsapp')}
          type="tel"
          className={inputClass}
          placeholder="+91 98000 00000"
        />
        {errors.whatsapp && <p className="text-error text-xs mt-1">{errors.whatsapp.message}</p>}
      </div>

      {/* Service */}
      <div className="space-y-1">
        <label htmlFor="contact-service" className={labelClass}>
          Service Interested In
        </label>
        <select
          id="contact-service"
          {...register('service')}
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s} value={s} className="bg-tertiary-fixed text-on-tertiary-fixed">
              {s}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-error text-xs mt-1">{errors.service.message}</p>}
      </div>

      {/* Budget — optional qualifier */}
      <div className="space-y-1">
        <label htmlFor="contact-budget" className={labelClass}>
          Monthly Budget <span className="normal-case font-medium">(optional)</span>
        </label>
        <select
          id="contact-budget"
          {...register('budget')}
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="">Prefer not to say</option>
          {budgets.map((b) => (
            <option key={b} value={b} className="bg-tertiary-fixed text-on-tertiary-fixed">
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="contact-message" className={labelClass}>
          Your Project
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="What are you making, and what should it achieve?"
        />
        {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-container text-on-primary-fixed py-5 rounded-full font-black text-lg hover:scale-[1.02] transition-transform duration-300 shadow-[0_40px_60px_-20px_rgba(250,92,27,0.3)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {submitting ? 'Sending…' : 'Send via WhatsApp'}
        {!submitting && <Icon name="arrow-right" size={20} />}
      </button>
      <p className="text-center text-xs text-on-tertiary-fixed/60">
        Opens WhatsApp with your message pre-filled. We reply within 4 working hours.
      </p>
    </form>
  )
}
