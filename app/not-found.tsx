import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/ui/logo'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 70% 60% at 20% 30%, rgba(100,80,255,0.28) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 80% 70%, rgba(40,25,160,0.4) 0%, transparent 60%),
          #0E0A2E
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px 80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
      }}
    >

      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Watermark arc lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4 }}
        viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
      >
        <path d="M -100 700 C 200 500 500 200 900 100 C 1050 60 1150 100 1300 60"
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -100 800 C 250 580 580 300 980 180 C 1120 130 1220 160 1300 140"
          fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeLinecap="round" />
        <path d="M -100 580 C 180 420 440 180 820 60 C 980 10 1100 50 1300 -20"
          fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeLinecap="round" />
      </svg>

      {/* Giant 404 watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -52%)',
          fontFamily: 'var(--font-display), system-ui, sans-serif',
          fontSize: 'clamp(180px, 28vw, 340px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        404
      </div>

      {/* Logo */}
      <div style={{ position: 'relative', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <LogoMark color="#FFFFFF" size={22} />
        </div>
        <span style={{
          fontFamily: 'var(--font-display), system-ui, sans-serif',
          fontWeight: 700, fontSize: '1.25rem',
          color: '#FFFFFF', letterSpacing: '-0.02em',
        }}>
          Ojúòwò
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '480px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          color: '#FFFFFF',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          marginBottom: '16px',
        }}>
          This Page Isn&apos;t<br />In The System.
        </h1>

        <p style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7, marginBottom: '36px',
        }}>
          Every well-run business has one missing order.
          This is ours. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'default' }), 'rounded-full h-auto')}
            style={{
              backgroundColor: '#FFFFFF', color: '#1A1140',
              fontFamily: 'var(--font-jakarta)', fontWeight: 700,
              fontSize: '0.95rem', padding: '14px 32px',
              textDecoration: 'none', letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/#waitlist"
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-jakarta)', fontWeight: 600,
              fontSize: '0.95rem', padding: '14px 32px',
              color: 'rgba(255,255,255,0.7)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: '9999px', textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              letterSpacing: '-0.01em',
            }}
          >
            Join the Waitlist
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        position: 'absolute', bottom: '28px',
        fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)',
        fontFamily: 'var(--font-jakarta)', letterSpacing: '0.03em',
      }}>
        Powered by Ojúòwò
      </p>

    </main>
  )
}
