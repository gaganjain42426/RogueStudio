import Link from 'next/link'
import { NAV_LINKS, STUDIO_ADDRESS, WHATSAPP_NUMBER } from '@/lib/constants'
import Icon from '@/components/ui/Icon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low pt-20 pb-10 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="text-3xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Rogue Studio
            </div>
            <p className="text-white/65 leading-relaxed mb-8 text-sm max-w-xs">
              200+ reels, 40M+ views, 10X peak return on ad spend — shot, edited,
              and shipped from Jaipur.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/roguestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-white/80 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-300"
              >
                <Icon name="instagram" size={16} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-white/80 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-300"
              >
                <Icon name="chat" size={16} />
              </a>
              <a
                href="mailto:hello@roguestudio.in"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-white/80 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-300"
              >
                <Icon name="mail" size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-container font-bold mb-6 uppercase text-xs tracking-widest">
              Studio
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/client-login"
                  className="text-white/65 hover:text-white transition-colors text-sm"
                >
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-container font-bold mb-6 uppercase text-xs tracking-widest">
              Services
            </h4>
            <ul className="space-y-4 text-sm">
              {['Content Production', 'Social Media Management', 'Performance Ads', 'Web Design'].map(
                (s) => (
                  <li key={s}>
                    <Link
                      href="/services"
                      className="text-white/65 hover:text-white transition-colors"
                    >
                      {s}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Latest work + address */}
          <div>
            <h4 className="text-primary-container font-bold mb-6 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <p className="text-white/65 mb-4 text-sm max-w-xs">
              The newest work always lands on Instagram first.
            </p>
            <a
              href="https://instagram.com/roguestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/5 transition-colors"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              <Icon name="instagram" size={15} />
              @roguestudio
            </a>
            <div className="mt-8">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Studio</p>
              <p className="text-white/65 text-sm leading-relaxed">{STUDIO_ADDRESS.full}</p>
              <p className="text-white/50 text-xs mt-2">We reply within 4 working hours.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/50 text-xs gap-4">
          <p>© {year} Rogue Studio. Jaipur, India.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
