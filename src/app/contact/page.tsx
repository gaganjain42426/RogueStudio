import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { STUDIO_ADDRESS, WHATSAPP_NUMBER } from '@/lib/constants'
import ContactForm from './ContactForm'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Rogue Studio — the creative and social media agency in Jaipur. Book a call or drop us a message to start your project.',
  path: '/contact',
  keywords: ['contact creative agency Jaipur', 'hire social media agency India'],
})

export default function ContactPage() {
  return (
    <div className="bg-tertiary-fixed text-on-tertiary-fixed min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — info */}
          <div className="space-y-16">
            <div>
              <span className="text-secondary font-bold text-xs tracking-widest uppercase">
                Let&apos;s Talk
              </span>
              <h1
                className="mt-4 text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Let&apos;s build something{' '}
                <br className="hidden md:block" />
                <span
                  className="italic font-normal text-primary-container"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  remembered.
                </span>
              </h1>
            </div>

            <div className="space-y-10">
              {/* WhatsApp */}
              <div>
                <p className="text-xs font-bold text-on-tertiary-fixed/40 uppercase tracking-widest mb-4">
                  Chat with us
                </p>
                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-on-tertiary-fixed text-tertiary-fixed px-10 py-5 rounded-full hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-300"
                >
                  <span className="material-symbols-outlined">chat</span>
                  <span
                    className="font-bold text-xl"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    WhatsApp Us
                  </span>
                </Link>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs font-bold text-on-tertiary-fixed/40 uppercase tracking-widest mb-4">
                  Visit the Studio
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold leading-tight max-w-sm"
                  style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                >
                  {STUDIO_ADDRESS.street},<br />
                  {STUDIO_ADDRESS.city}, {STUDIO_ADDRESS.state},<br />
                  {STUDIO_ADDRESS.country}. {STUDIO_ADDRESS.pin}
                </p>
              </div>

              {/* Timezone */}
              <div>
                <p className="text-xs font-bold text-on-tertiary-fixed/40 uppercase tracking-widest mb-2">
                  Timezone
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                >
                  IST (GMT+5:30)
                </p>
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <div className="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-2xl border border-white/20 shadow-[0_40px_60px_-15px_rgba(14,14,14,0.06)]">
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-40 bg-surface text-on-surface py-20 rounded-xl px-6 md:px-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2
                className="text-3xl md:text-4xl font-black tracking-tighter"
                style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
              >
                Locate the{' '}
                <span
                  className="italic font-normal text-primary-container"
                  style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
                >
                  Rogue
                </span>
              </h2>
              <p className="text-on-surface-variant mt-2">
                Come over for a coffee in the Pink City.
              </p>
            </div>
          </div>
          {/* Google Maps embed */}
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-outline-variant/20 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe
              title="Rogue Studio location — Sanganer, Jaipur"
              src="https://maps.google.com/maps?q=26.8191641,75.7659513&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}
