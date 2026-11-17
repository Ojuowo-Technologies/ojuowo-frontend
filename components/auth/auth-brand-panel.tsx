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
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 60% at 38% 55%, rgba(91,76,245,0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top: logo + beta badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        <a href="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <Logo variant="default" />
        </a>
        <span
          style={{
            background: 'rgba(91,76,245,0.28)',
            color: '#C4B9FF',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(91,76,245,0.4)',
          }}
        >
          Beta
        </span>
      </div>

      {/* Middle: headline + floating cards */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Headline */}
        <div style={{ marginBottom: '28px' }}>
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
            Every order.<br />
            Every stitch.<br />
            Every payout.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.92rem',
              color: 'rgba(196,185,255,0.75)',
              lineHeight: 1.65,
              marginTop: '14px',
              maxWidth: '280px',
            }}
          >
            One place to manage your craft business — from intake to invoice.
          </p>
        </div>

        {/* Floating cards stage */}
        <div style={{ position: 'relative', flex: 1, minHeight: '280px' }}>

          {/* Card 1: Order card */}
          <div
            className="float-b"
            style={{
              position: 'absolute',
              top: '14%',
              left: '0',
              width: '238px',
              background: 'rgba(255,255,255,0.97)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
              transform: 'rotate(-2.5deg)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '7px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#AAA',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Order #0042
              </span>
              <span
                style={{
                  background: '#FFF7ED',
                  color: '#B45309',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '999px',
                }}
              >
                In Progress
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#0D0D0D',
                marginBottom: '10px',
              }}
            >
              Ade&apos;s Wedding Suit
            </div>
            <div
              style={{ height: '1px', background: '#F0F0F5', marginBottom: '10px' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.75rem',
                  color: '#AAA',
                }}
              >
                Due Dec 24
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#5B4CF5',
                }}
              >
                ₦85,000
              </span>
            </div>
          </div>

          {/* Card 2: Task card */}
          <div
            className="float-a"
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '196px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
              transform: 'rotate(3.5deg)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '9px',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
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
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  EO
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#0D0D0D',
                    lineHeight: 1.2,
                  }}
                >
                  Emeka Okafor
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '0.65rem',
                    color: '#AAA',
                  }}
                >
                  Tailor
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#1A1140',
                marginBottom: '9px',
              }}
            >
              Cut &amp; Sew Jacket
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.68rem',
                  color: '#BBB',
                }}
              >
                Due Fri
              </span>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '999px',
                }}
              >
                ✓ Done
              </span>
            </div>
          </div>

          {/* Card 3: Payment chip */}
          <div
            className="float-c"
            style={{
              position: 'absolute',
              bottom: '8%',
              left: '8%',
              background: '#ECFDF5',
              border: '1px solid rgba(5,150,105,0.2)',
              borderRadius: '999px',
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
              transform: 'rotate(-1.5deg)',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#059669',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#065F46',
              }}
            >
              ₦45,000 received
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.75rem',
                color: '#6EE7B7',
              }}
            >
              just now
            </span>
          </div>
        </div>
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
