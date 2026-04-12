import Link from 'next/link'
import { NAV_LINKS, STUDIO_ADDRESS } from '@/lib/constants'
import NewsletterForm from '@/components/layout/NewsletterForm'

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
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Rogue Studio
            </div>
            <p className="text-white/60 leading-relaxed mb-8 text-sm max-w-xs">
              Disruptive creative solutions for brands that dare to be different. Jaipur to the
              world.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'public', href: 'https://roguestudio.in', label: 'Website' },
                { icon: 'alternate_email', href: 'mailto:hello@roguestudio.in', label: 'Email' },
                { icon: 'camera', href: 'https://instagram.com/roguestudio', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-container font-bold mb-6 uppercase text-xs tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/client-login"
                  className="text-white/60 hover:text-white transition-colors text-sm"
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
              {[
                'Social Management',
                'Video Production',
                'Brand Strategy',
                'Content Studio',
                'Web Design',
                'Paid Social',
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary-container font-bold mb-6 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <p className="text-white/60 mb-4 text-sm">
              Subscribe to our monthly newsletter &ldquo;The Rogue Dispatch&rdquo;
            </p>
            <NewsletterForm />
            <div className="mt-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Studio</p>
              <p className="text-white/60 text-sm leading-relaxed">{STUDIO_ADDRESS.full}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/40 text-xs gap-4">
          <p>© {year} Rogue Studio. Jaipur, India.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/client-login" className="hover:text-white transition-colors">
              Client Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
