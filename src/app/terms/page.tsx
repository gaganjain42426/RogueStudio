import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Rogue Studio',
  description: 'Terms of Service for Rogue Studio — the rules and guidelines governing use of our website and services.',
  alternates: { canonical: 'https://www.roguestudio.in/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-on-surface-variant text-sm mb-12">Last updated: April 26, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Rogue Studio website at{' '}
              <a href="https://www.roguestudio.in" className="text-primary-container hover:underline">
                www.roguestudio.in
              </a>
              , you agree to be bound by these Terms of Service. If you do not agree, please do not
              use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Services</h2>
            <p>
              Rogue Studio provides creative services including social media management, content
              production, and brand strategy. Specific service terms, deliverables, timelines, and
              payment schedules are defined in individual client agreements/proposals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and videos — is the
              property of Rogue Studio and protected by applicable copyright law. You may not
              reproduce, distribute, or create derivative works without prior written consent.
            </p>
            <p className="mt-2">
              Content produced for clients under a paid engagement is transferred to the client upon
              receipt of full payment, as detailed in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Transmit harmful, offensive, or misleading content via our contact forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              Rogue Studio shall not be liable for any indirect, incidental, or consequential damages
              arising from your use of this website. Our total liability for any claim shall not
              exceed the amount paid by you for services in the three months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Third-Party Links</h2>
            <p>
              Our website may link to third-party websites. We have no control over and accept no
              responsibility for the content or practices of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur,
              Rajasthan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. The date at the top of this
              page reflects the most recent revision. Your continued use of the site constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a href="mailto:hello@roguestudio.in" className="text-primary-container hover:underline">
                hello@roguestudio.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
