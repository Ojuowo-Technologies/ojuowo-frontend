import { Logo } from '@/components/ui/logo'
import { AuthTestimonialCarousel } from '@/components/auth/auth-testimonial-carousel'

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
      {/* Two aurora blobs — exact same technique as CTA wlAurora1.
          Both start at top:0 left:0; keyframe translates drive positions.
          Blob 2 offset by -7s (half of 14s) so it starts at the 50% waypoint = bottom-left. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '680px', height: '580px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(155,135,255,0.11) 0%, rgba(110,90,220,0.05) 50%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'authBrandBlob 14s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute',
          width: '560px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(175,158,255,0.09) 0%, rgba(130,110,240,0.04) 55%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'authBrandBlob 14s ease-in-out infinite',
          animationDelay: '-7s',
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

      {/* Bottom: rotating industry testimonials */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
        <AuthTestimonialCarousel />
      </div>
    </div>
  )
}
