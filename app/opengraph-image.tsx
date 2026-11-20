import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #100A44 0%, #2A1E98 50%, #1A1060 100%)',
          backgroundColor: '#1E1660',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Concentric rings — centred on canvas */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: 'absolute', top: 0, left: 0, display: 'flex' }}
        >
          <circle cx="600" cy="315" r="176" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="600" cy="315" r="260" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" />
          <circle cx="600" cy="315" r="348" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
          <circle cx="600" cy="315" r="440" fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="1" />

          {/* Accent dots on ring intersections */}
          <circle cx="776" cy="315" r="5" fill="rgba(255,255,255,0.5)" />
          <circle cx="424" cy="315" r="5" fill="rgba(255,255,255,0.5)" />
          <circle cx="600" cy="139" r="4" fill="rgba(255,255,255,0.4)" />
          <circle cx="600" cy="491" r="4" fill="rgba(255,255,255,0.3)" />

          {/* Diamond accents */}
          <path d="M 724 203 L 726.8 198 L 730 203 L 726.8 208 Z" fill="rgba(255,255,255,0.45)" />
          <path d="M 476 427 L 478.8 422 L 482 427 L 478.8 432 Z" fill="rgba(255,255,255,0.35)" />
          <path d="M 816 410 L 819 405 L 822 410 L 819 415 Z" fill="rgba(255,255,255,0.3)" />
          <path d="M 378 220 L 381 215 L 384 220 L 381 225 Z" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '64px',
            textAlign: 'center',
          }}
        >
          {/* Logomark circle */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            OJ
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-4px',
              marginBottom: '24px',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            Ojúòwò
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.65)',
              textAlign: 'center',
              maxWidth: '760px',
              lineHeight: 1.5,
              display: 'flex',
            }}
          >
            The operating system for order-based businesses
          </div>

          {/* Domain pill */}
          <div
            style={{
              marginTop: '40px',
              padding: '12px 32px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              fontSize: '20px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              letterSpacing: '0.02em',
            }}
          >
            ojuowo.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
