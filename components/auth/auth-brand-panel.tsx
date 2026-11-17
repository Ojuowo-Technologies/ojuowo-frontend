import { Logo } from '@/components/ui/logo'

export function AuthBrandPanel() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #1A1140 0%, #251560 55%, #1A1140 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Two aurora blobs — top-right and bottom-left, same motion as CTA card */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Blob 1 — top-right anchor */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-15%',
          width: '380px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(91,76,245,0.22) 0%, rgba(155,138,255,0.09) 45%, transparent 70%)',
          filter: 'blur(72px)',
          animation: 'authBrandBlob 16s ease-in-out infinite',
          willChange: 'transform',
        }} />
        {/* Blob 2 — bottom-left anchor, opposite phase */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-15%',
          width: '320px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(120,100,255,0.18) 0%, rgba(91,76,245,0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'authBrandBlob 16s ease-in-out infinite',
          animationDelay: '-8s',
          willChange: 'transform',
        }} />
      </div>

      {/* Top: logo */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginBottom: '48px',
        }}
      >
        <a href="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <Logo variant="light" />
        </a>
      </div>

      {/* Middle: headline */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 2.6vw, 2.4rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Every Order.<br />
          Every Task.<br />
          Every Payout.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.92rem',
            color: 'rgba(196,185,255,0.75)',
            lineHeight: 1.65,
            marginTop: '14px',
            maxWidth: '300px',
          }}
        >
          One place to run your business. Take orders, track your team, send invoices, and get paid without the back-and-forth.
        </p>
      </div>

      {/* Bottom: testimonial */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            fontStyle: 'italic',
            marginBottom: '14px',
          }}
        >
          &ldquo;Running three orders at once felt impossible until Ojuowo.&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5B4CF5, #9B8AFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              TA
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Taiwo Adeyemi
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.72rem',
                color: 'rgba(196,185,255,0.65)',
              }}
            >
              Bespoke Tailor, Lagos
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
