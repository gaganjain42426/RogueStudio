import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Rogue Studio — Creative & Social Media Agency, Jaipur'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Site-wide Open Graph image, generated at the edge.
 * Replaces the /og/*.jpg files that 404'd on every social share.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0D0D0D',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top slate line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 44, height: 3, background: '#fa5c1b', display: 'flex' }} />
          <div
            style={{
              color: '#fa5c1b',
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Jaipur · Creative Studio
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            SCROLL-STOPPING
          </div>
          <div
            style={{
              color: '#fa5c1b',
              fontSize: 132,
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.05,
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            Content.
          </div>
        </div>

        {/* Bottom proof strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingTop: 34,
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 700, display: 'flex' }}>
            Rogue Studio
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 26,
              letterSpacing: 2,
              display: 'flex',
              gap: 34,
            }}
          >
            <span>200+ reels</span>
            <span>40M+ views</span>
            <span>10X peak ROAS</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
