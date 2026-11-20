'use client'

import { Logo } from '@/components/ui/logo'
import { FadeUp } from './animate'
import DataPixelArc from '@/components/originkit/ui/data-pixel-arc'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features',     href: '#features'     },
  { label: 'FAQs',         href: '#faq'           },
]

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#FAFAFA' }}>

      {/* ── Content area ──────────────────────────────────────────────── */}
      <FadeUp>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px 12px 0' }}>
        <div className="footer-grid">

          {/* Left — brand */}
          <div>
            <Logo />
            <p style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.9rem',
              color: '#888',
              maxWidth: '340px',
              lineHeight: 1.7,
              marginTop: '16px',
              marginBottom: '28px',
            }}>
              The eyes of your business. Orders, customers, and workers. One place.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <XIcon />,         label: 'X (Twitter)'  },
                { icon: <InstagramIcon />, label: 'Instagram'    },
                { icon: <LinkedInIcon />,  label: 'LinkedIn'     },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#777', textDecoration: 'none',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                  className="hover:!bg-[rgba(91,76,245,0.08)] hover:!text-[#5B4CF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — navigation */}
          <div className="footer-nav">
            <div>
              <p style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.65rem', fontWeight: 700,
                color: '#BBB', textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                Explore
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.9rem', color: '#666',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                      padding: '4px 8px',
                      margin: '-4px -8px',
                      borderRadius: '6px',
                    }}
                    className="hover:!text-[#5B4CF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2 focus-visible:bg-[rgba(91,76,245,0.06)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Copyright — z-index keeps it visible above the terrain that overlaps up */}
        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          marginTop: '48px', paddingTop: '20px', paddingBottom: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
          flexWrap: 'wrap',
          position: 'relative', zIndex: 2,
        }}>
          <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.78rem', color: '#CCC' }}>
            © 2026 Ojúòwò. All rights reserved.
          </p>
          <a
            href="/privacy"
            style={{
              fontFamily: 'var(--font-jakarta)', fontSize: '0.78rem',
              color: '#CCC', textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            className="hover:!text-[#5B4CF5]"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      </FadeUp>

      {/* ── WebGL pixel-arc terrain ───────────────────────────────────── */}
      {/*
        Three layers stacked inside a fixed-height container:
        1. DataPixelArc canvas (background #FAFAFA so the opaque WebGL canvas
           blends seamlessly with the footer bg)
        2. "Ojúòwò" wordmark as an HTML overlay (font renders correctly here,
           unlike SVG text which can't load a Next.js CSS font variable)
        3. CSS gradient overlay that dissolves the top edge into the footer bg
      */}
      <div
        className="footer-terrain"
        style={{
          marginTop: '-18px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Layer 1 — WebGL animated dot arc.
            center: 0 places the arc at the very bottom edge so only the
            upward-fading half of the bell curve is visible — dots are dense
            at the bottom and dissolve going up, same as the original SVG layers.
            background is faintly purple-tinted so low-intensity dots stay in
            lavender territory instead of going gray. */}
        <DataPixelArc
          background="#FAFAFA"
          baseColor="#5048D0"
          accentColor="#8B7FDD"
          highlight="#8B80F0"
          density={89}
          dotSize={62}
          speed={100}
          hover={0}
          arc={{ center: 100, drop: 0, falloff: 600, thickness: 95 }}
          style={{ position: 'absolute', inset: 0, minWidth: 0, minHeight: 0 }}
        />

        {/* Layer 2 — wordmark */}
        <div
          aria-hidden="true"
          className="footer-wordmark"
          style={{
            position: 'absolute',
            bottom: '28px',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'rgba(58,45,181,0.75)',
            letterSpacing: '-0.03em',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Ojúòwò
        </div>

        {/* Layer 3 — dissolve gradient: fades top edge into footer bg */}
        <div
          aria-hidden="true"
          className="footer-terrain-gradient"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      </div>

    </footer>
  )
}
