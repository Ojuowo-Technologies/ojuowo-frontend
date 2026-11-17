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
      {/* Static ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 60% at 38% 55%, rgba(91,76,245,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbiting glow orb */}
      <div
        className="auth-glow-orbit"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(91,76,245,0.32) 0%, rgba(155,138,255,0.14) 45%, transparent 70%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Abstract blob shapes */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large ambient blob — lower left */}
        <path
          d="M-60 580 C20 500, 160 480, 220 560 C280 640, 240 760, 140 800 C40 840, -80 760, -100 680 C-120 600, -140 660, -60 580Z"
          fill="rgba(91,76,245,0.22)"
          style={{ filter: 'blur(32px)' }}
        />
        {/* Medium blob — upper right */}
        <path
          d="M300 60 C380 40, 460 100, 450 200 C440 300, 360 320, 280 280 C200 240, 180 160, 220 100 C260 40, 220 80, 300 60Z"
          fill="rgba(155,138,255,0.18)"
          style={{ filter: 'blur(28px)' }}
        />
        {/* Small accent blob — center */}
        <path
          d="M180 340 C230 300, 300 320, 310 390 C320 460, 260 500, 200 480 C140 460, 120 400, 180 340Z"
          fill="rgba(190,160,255,0.12)"
          style={{ filter: 'blur(20px)' }}
        />
        {/* Thin ring accent — top left area */}
        <circle
          cx="80"
          cy="180"
          r="90"
          fill="none"
          stroke="rgba(91,76,245,0.18)"
          strokeWidth="1.5"
        />
        {/* Smaller ring — lower right */}
        <circle
          cx="370"
          cy="680"
          r="60"
          fill="none"
          stroke="rgba(155,138,255,0.14)"
          strokeWidth="1"
        />
        {/* Dot cluster — mid right */}
        <circle cx="390" cy="400" r="4" fill="rgba(155,138,255,0.35)" />
        <circle cx="406" cy="420" r="2.5" fill="rgba(155,138,255,0.25)" />
        <circle cx="378" cy="430" r="2" fill="rgba(155,138,255,0.2)" />
      </svg>

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
