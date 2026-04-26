import type { Metadata } from 'next'
import { Epilogue, Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import MotionMain from '@/components/MotionMain'
import { SITE_URL } from '@/lib/constants'

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--loaded-epilogue',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--loaded-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400', '700'],
  variable: '--loaded-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rogue Studio — Creative & Social Media Agency Jaipur',
  description:
    'Rogue Studio is a creative and social media marketing agency based in Jaipur, India. We build cinematic brands, scroll-stopping content, and growth-driven strategies.',
  keywords: [
    'social media agency Jaipur',
    'creative agency Rajasthan',
    'content production Jaipur',
    'brand strategy India',
    'digital marketing Jaipur',
  ],
  openGraph: {
    title: 'Rogue Studio — Creative Agency Jaipur',
    description:
      'Cinematic brands, scroll-stopping content, and growth-driven strategies from Jaipur, India.',
    url: SITE_URL,
    siteName: 'Rogue Studio',
    images: [{ url: '/og/default-og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rogue Studio — Creative Agency Jaipur',
    description: 'Cinematic brands and scroll-stopping content from Jaipur.',
    images: ['/og/default-og.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        {/* Schema.org JSON-LD — LocalBusiness + ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['LocalBusiness', 'ProfessionalService'],
              '@id': `${SITE_URL}/#business`,
              name: 'Rogue Studio',
              description: 'Creative and social media marketing agency based in Jaipur, India. Specialising in social media management, cinematic content production, and brand strategy.',
              url: SITE_URL,
              email: 'hello@roguestudio.in',
              foundingDate: '2021',
              priceRange: '₹₹–₹₹₹',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
                width: 200,
                height: 60,
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Malviya Nagar',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302017',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.8574,
                longitude: 75.8022,
              },
              areaServed: [
                { '@type': 'City', name: 'Jaipur' },
                { '@type': 'State', name: 'Rajasthan' },
                { '@type': 'Country', name: 'India' },
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '10:00',
                  closes: '19:00',
                },
              ],
              sameAs: [
                'https://instagram.com/roguestudio',
                'https://linkedin.com/company/roguestudio',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Creative Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Production' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Strategy' } },
                ],
              },
            }),
          }}
        />
        {/* Schema.org JSON-LD — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              name: 'Rogue Studio',
              url: SITE_URL,
              publisher: { '@id': `${SITE_URL}/#business` },
            }),
          }}
        />
        {/* Schema.org JSON-LD — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: 'Rogue Studio',
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
                width: 200,
                height: 60,
              },
              sameAs: [
                'https://instagram.com/roguestudio',
                'https://linkedin.com/company/roguestudio',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${epilogue.variable} ${inter.variable} ${playfairDisplay.variable} bg-background text-on-surface font-body overflow-x-hidden antialiased selection:bg-primary-container selection:text-on-primary-fixed`}
      >
        <SmoothScroll>
          <Navbar />
          <MotionMain>{children}</MotionMain>
          <Footer />
        </SmoothScroll>

        {/* TODO: Add GA4 measurement ID — replace G-XXXXXXXXXX */}
        {ga4Id && ga4Id !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
