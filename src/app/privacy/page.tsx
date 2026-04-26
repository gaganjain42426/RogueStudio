import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Rogue Studio',
  description: 'Privacy Policy for Rogue Studio — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://www.roguestudio.in/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-on-surface-variant hover:text-white transition-colors text-sm flex items-center gap-2 mb-12"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>

        <h1
          className="text-4xl md:text-5xl font-black text-white mb-4"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant text-sm mb-12">Last updated: April 26, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
            <p>
              Rogue Studio (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a creative and social media marketing agency
              operating from Malviya Nagar, Jaipur, Rajasthan, India – 302017. You can reach us at{' '}
              <a href="mailto:hello@roguestudio.in" className="text-primary-container hover:underline">
                hello@roguestudio.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name and contact details submitted via our contact form</li>
              <li>Business information shared during project enquiries</li>
              <li>Usage data collected via Google Analytics 4 (anonymised)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your enquiries and provide our services</li>
              <li>Improve our website and user experience</li>
              <li>Communicate updates about our services (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personal information to third parties. We may
              share data with trusted service providers (such as Supabase for data storage) solely to
              operate our business, bound by confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Cookies & Analytics</h2>
            <p>
              We use Google Analytics 4 to understand how visitors interact with our site. This
              service may set cookies and collect anonymised usage data. You may opt out via your
              browser settings or the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-container hover:underline"
              >
                Google Analytics opt-out browser add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>
              Under applicable Indian law and, where relevant, GDPR principles, you have the right
              to access, correct, or request deletion of your personal data. To exercise these rights,
              contact us at{' '}
              <a href="mailto:hello@roguestudio.in" className="text-primary-container hover:underline">
                hello@roguestudio.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The date at the top of this page
              reflects the most recent revision. Continued use of our site constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Contact Us</h2>
            <p>
              Questions? Email us at{' '}
              <a href="mailto:hello@roguestudio.in" className="text-primary-container hover:underline">
                hello@roguestudio.in
              </a>{' '}
              or write to us at: Malviya Nagar, Jaipur, Rajasthan, India – 302017.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
