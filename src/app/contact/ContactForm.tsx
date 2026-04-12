'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(1, 'Please enter your company name'),
  email: z.string().email('Please enter a valid email'),
  whatsapp: z.string().min(10, 'Please enter a valid WhatsApp number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please tell us about your project (min 10 chars)'),
})

const services = [
  'Social Media Management',
  'Content Production',
  'Brand Strategy',
  'Web Design',
  'Paid Social Ads',
  'Copywriting',
  'Photography',
  'Other',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // silent fail — form data still logged server-side
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-container/20 flex items-center justify-center mb-6">
          <span
            className="material-symbols-outlined text-primary-container text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h3
          className="text-3xl font-black text-on-tertiary-fixed"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          Message Received!
        </h3>
        <p className="mt-3 text-on-tertiary-fixed-variant">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Name */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          Full Name
        </label>
        <input
          {...register('name')}
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/20"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-error text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          Business Name
        </label>
        <input
          {...register('company')}
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/20"
          placeholder="Your Company"
        />
        {errors.company && (
          <p className="text-error text-xs mt-1">{errors.company.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/20"
          placeholder="hello@yourcompany.com"
        />
        {errors.email && (
          <p className="text-error text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          WhatsApp Number
        </label>
        <input
          {...register('whatsapp')}
          type="tel"
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/20"
          placeholder="+91 98000 00000"
        />
        {errors.whatsapp && (
          <p className="text-error text-xs mt-1">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Service */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          Service Interested In
        </label>
        <select
          {...register('service')}
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed appearance-none"
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
        {errors.service && (
          <p className="text-error text-xs mt-1">{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed/60">
          Your Vision
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full bg-transparent border-b-2 border-on-tertiary-fixed/10 py-4 focus:outline-none focus:border-primary-container transition-colors text-lg font-medium text-on-tertiary-fixed placeholder:text-on-tertiary-fixed/20 resize-none"
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="text-error text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-container text-on-primary-fixed py-5 rounded-full font-black text-lg hover:scale-[1.02] transition-transform duration-300 shadow-[0_40px_60px_-20px_rgba(250,92,27,0.3)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
      >
        {submitting ? 'Sending...' : 'Send Inquiry'}
        {!submitting && (
          <span className="material-symbols-outlined">arrow_forward</span>
        )}
      </button>
    </form>
  )
}
