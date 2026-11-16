'use client'

import { LogoMark } from '@/components/ui/logo'
import { FadeUp } from './animate'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SignupCTA() {
  return (
    <section
      id="get-started"
      aria-label="Get started with Ojúòwò"
      style={{ padding: '80px 12px', maxWidth: '1320px', margin: '0 auto' }}
    >
      <FadeUp>
        <div
          className="waitlist-cta-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            textAlign: 'center',
            background: `
              radial-gradient(ellipse 55% 80% at 12% 45%, rgba(142,122,255,0.55) 0%, transparent 65%),
              radial-gradient(ellipse 45% 55% at 88% 18%, rgba(55,40,180,0.7) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 90% 92%, rgba(20,12,90,0.85) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 50% 108%, rgba(45,30,155,0.5) 0%, transparent 60%),
              #3E30B8
            `,
          }}
        >

          {/* SVG ribbons */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M -80 480 C 180 340 460 100 820 20 C 980 -15 1100 30 1280 -10" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M -80 560 C 200 400 500 180 860 80 C 1020 30 1150 55 1280 70" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" strokeLinecap="round" />
            <path d="M -80 380 C 160 270 400 60 740 -30 C 900 -65 1060 -10 1280 -60" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeLinecap="round" />
            <path d="M -60 80 C 40 160 60 300 20 420" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeLinecap="round" />
          </svg>

          {/* Logo watermark */}
          <div style={{
            position: 'absolute', right: '-80px', bottom: '-80px',
            opacity: 0.04, pointerEvents: 'none', transform: 'rotate(-8deg)',
          }}>
            <LogoMark color="#FFFFFF" size={380} />
          </div>

          {/* Aurora blobs */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute', width: '560px', height: '460px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(205,188,255,0.46) 0%, rgba(158,135,255,0.20) 45%, transparent 70%)',
              filter: 'blur(72px)', animation: 'wlAurora1 14s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', width: '400px', height: '340px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(225,208,255,0.38) 0%, rgba(175,152,255,0.17) 50%, transparent 70%)',
              filter: 'blur(88px)', animation: 'wlAurora1 14s ease-in-out infinite', animationDelay: '-7s',
            }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', padding: '16px 24px' }}>
            <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#FFFFFF',
                lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '16px',
              }}>
                Your Whole Business.<br />One Place.
              </h2>

              <p style={{
                fontFamily: 'var(--font-jakarta)', fontSize: '1rem',
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '40px',
              }}>
                Sign up in minutes. Set up your business, invite your team, and start taking orders today.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <a
                  href="/signup"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'rounded-full h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1140]'
                  )}
                  style={{
                    padding: '16px 44px',
                    fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: '1rem',
                    textDecoration: 'none',
                    backgroundColor: '#FFFFFF', color: '#3A2DB5',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  }}
                >
                  Create your account
                </a>
              </div>
            </div>
          </div>

        </div>
      </FadeUp>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes wlAurora1 {
            0%   { transform: translate(-52%, 22%); }
            25%  { transform: translate(8%,  -28%); }
            50%  { transform: translate(68%, 32%); }
            75%  { transform: translate(12%, 68%); }
            100% { transform: translate(-52%, 22%); }
          }
        }
      `}</style>
    </section>
  )
}
