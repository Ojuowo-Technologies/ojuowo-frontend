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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5B4CF5 0%, #3A2DB5 58%, #1A1140 100%)',
          padding: '64px',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background:
              'radial-gradient(ellipse 60% 60% at 20% 30%, rgba(142,122,255,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-3px',
            marginBottom: '28px',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          Ojúòwò
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            color: 'rgba(255,255,255,0.72)',
            textAlign: 'center',
            maxWidth: '840px',
            lineHeight: 1.45,
            display: 'flex',
          }}
        >
          Orders, Staff Tasks & Worker Pay for Nigerian Small Businesses
        </div>

        {/* Waitlist pill */}
        <div
          style={{
            marginTop: '40px',
            padding: '12px 32px',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.14)',
            border: '1.5px solid rgba(255,255,255,0.28)',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            display: 'flex',
          }}
        >
          Join the waitlist · ojuowo.com
        </div>
      </div>
    ),
    { ...size },
  )
}
