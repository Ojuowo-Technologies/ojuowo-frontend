import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5B4CF5 0%, #3A2DB5 60%, #1A1140 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            fontSize: '96px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-4px',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size },
  )
}
