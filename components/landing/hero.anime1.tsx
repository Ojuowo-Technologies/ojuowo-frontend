import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CheckCircle2, Clock, User,
  Scissors, ChefHat, Wand2, Hammer, Wheat, Plus,
} from 'lucide-react'

const CARD_STYLE = {
  background: '#F2F2F7',
  border: '1.5px solid rgba(255,255,255,0.88)',
  borderRadius: '20px',
  boxShadow:
    '5px 5px 16px rgba(0,0,0,0.09), -2px -2px 8px rgba(255,255,255,0.72), inset 0 1px 0 rgba(255,255,255,0.45)',
} as const

const TILE_INNER_STYLE = {
  background: '#F2F2F7',
  border: '1.5px solid rgba(255,255,255,0.88)',
  borderRadius: '18px',
  boxShadow:
    '4px 4px 12px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.7), inset 0 1px 0 rgba(255,255,255,0.4)',
  width: '64px',
  height: '68px',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
}

const bizTiles: {
  Icon: React.ComponentType<{ size: number; color: string; strokeWidth?: number }>
  label: string; anim: string; pos: React.CSSProperties
  iconSize?: number; strokeWidth?: number
}[] = [
  { Icon: Scissors, label: 'Tailors',  anim: 'float-a', pos: { bottom: '22%', left: '29%'  } },
  { Icon: ChefHat,  label: 'Bakery',   anim: 'float-c', pos: { bottom: '14%', left: '36%'  } },
  { Icon: Wand2,    label: 'Salons',   anim: 'float-b', pos: { bottom: '8%',  left: '44%'  } },
  { Icon: Hammer,   label: 'Cobblers', anim: 'float-d', pos: { bottom: '8%',  right: '44%' } },
  { Icon: Wheat,    label: 'Farms',    anim: 'float-a', pos: { bottom: '14%', right: '36%' } },
  { Icon: Plus,     label: 'More',     anim: 'float-c', pos: { bottom: '22%', right: '29%' }, iconSize: 20, strokeWidth: 2.5 },
]

function OrderCard() {
  return (
    <div className="sway-tr" style={{ ...CARD_STYLE, padding: '18px 20px', width: '260px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#5B4CF5' }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Order #038
        </span>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>Funmi A.</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>3 items · Standard order</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5B4CF5', backgroundColor: 'rgba(91,76,245,0.1)', padding: '4px 10px', borderRadius: '9999px' }}>
          In Progress
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#888' }}>
          <Clock size={12} /> Dec 18
        </span>
      </div>
    </div>
  )
}

function TaskCard() {
  return (
    <div className="sway-tl" style={{ ...CARD_STYLE, padding: '18px 20px', width: '240px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(91,76,245,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={16} color="#5B4CF5" />
        </div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0D0D0D' }}>Emeka</div>
          <div style={{ fontSize: '0.72rem', color: '#888' }}>Assigned staff</div>
        </div>
      </div>
      <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: '12px' }}>Complete item 2 of 3 · Order #038</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ flex: 1, height: '4px', backgroundColor: 'rgba(91,76,245,0.12)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', backgroundColor: '#5B4CF5', borderRadius: '9999px' }} />
        </div>
        <span style={{ fontSize: '0.72rem', color: '#5B4CF5', fontWeight: 600 }}>65%</span>
      </div>
    </div>
  )
}

function PaymentCard() {
  return (
    <div className="sway-bl" style={{ ...CARD_STYLE, padding: '18px 20px', width: '230px' }}>
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Invoice #42
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.02em' }}>₦90,000</div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', marginBottom: '6px' }}>
          <span>Paid</span><span style={{ color: '#5B4CF5', fontWeight: 600 }}>₦45,000</span>
        </div>
        <div style={{ height: '4px', backgroundColor: 'rgba(91,76,245,0.12)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', backgroundColor: '#5B4CF5', borderRadius: '9999px' }} />
        </div>
      </div>
      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#D97706', backgroundColor: 'rgba(217,119,6,0.1)', padding: '3px 10px', borderRadius: '9999px' }}>
        Balance ₦45,000
      </span>
    </div>
  )
}

function TrackingCard() {
  return (
    <div className="sway-br" style={{ ...CARD_STYLE, padding: '18px 20px', width: '250px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <CheckCircle2 size={18} color="#5B4CF5" />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0D0D0D' }}>Your order is ready</span>
      </div>
      {/* Dots + connectors — single row, flex-1 lines guaranteed to touch each dot */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#5B4CF5' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#5B4CF5' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
      </div>
      {/* Labels — separate row so they never push dots apart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        {['Received', 'Working', 'Ready'].map(stage => (
          <span key={stage} style={{ fontSize: '0.6rem', color: '#5B4CF5', fontWeight: 500 }}>{stage}</span>
        ))}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#666' }}>
        Pick up at <strong>your business address</strong>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="hero-section"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '48px',
        paddingBottom: '48px',
        border: '1px solid rgba(91,76,245,0.12)',
      }}
    >
      {/* Diamond mesh — full opacity, radial overlay creates the fade-at-center effect */}
      <div
        className="dot-grid hero-anim-dotgrid"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Radial gradient — fades dot-grid at center so the text reads cleanly on white */}
      <div
        className="hero-anim-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(240,240,244,0.97) 0%, rgba(240,240,244,0.75) 45%, transparent 78%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* SVG hub-and-spoke connecting lines — hidden on tablet/mobile via hero-svg-lines class */}
      {/* Paths run center→corner so rope-fold-* d-property animation can reference reversed coords */}
      <svg
        className="hero-svg-lines"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
        viewBox="0 0 1440 820"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="hero-rope-tl" d="M 720 410 L 418 315 L 192 230"  stroke="#5B4CF5" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path className="hero-rope-tr" d="M 720 410 L 988 304 L 1252 195" stroke="#5B4CF5" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path className="hero-rope-bl" d="M 720 410 L 430 538 L 201 640"  stroke="#5B4CF5" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <path className="hero-rope-br" d="M 720 410 L 1001 520 L 1243 610" stroke="#5B4CF5" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
        <circle className="hero-dot-tl" cx="192"  cy="230" r="4"   fill="#5B4CF5" />
        <circle className="hero-dot-tr" cx="1252" cy="195" r="4"   fill="#5B4CF5" />
        <circle className="hero-dot-bl" cx="201"  cy="640" r="4"   fill="#5B4CF5" />
        <circle className="hero-dot-br" cx="1243" cy="610" r="4"   fill="#5B4CF5" />
        <circle className="hero-hub" cx="720" cy="410" r="8"   fill="none" stroke="#5B4CF5" strokeWidth="1.5" />
        <circle className="hero-hub" cx="720" cy="410" r="3.5" fill="#5B4CF5" />
      </svg>

      {/* Four corner product cards — centered on SVG dots at fixed % with preserveAspectRatio="none" */}
      <div aria-hidden="true" className="hero-floating-cards" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        <div className="hero-anim-card-tl" style={{ position: 'absolute', left: '13.3%', top: '28%',    transform: 'translate(-50%, -50%)' }}><TaskCard /></div>
        <div className="hero-anim-card-tr" style={{ position: 'absolute', right: '13.1%', top: '23.8%', transform: 'translate(50%, -50%)'  }}><OrderCard /></div>
        <div className="hero-anim-card-bl" style={{ position: 'absolute', left: '14%',   bottom: '22%', transform: 'translate(-50%, 50%)'  }}><PaymentCard /></div>
        <div className="hero-anim-card-br" style={{ position: 'absolute', right: '13.7%', bottom: '25.6%', transform: 'translate(50%, 50%)' }}><TrackingCard /></div>
      </div>

      {/* Business-type tiles — arc along the bottom, Quso.ai-style */}
      <div aria-hidden="true" className="hero-business-tiles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        {bizTiles.map((tile, i) => (
          <div
            key={tile.label}
            className={`hero-anim-tile-${i}`}
            style={{ position: 'absolute', ...tile.pos }}
          >
            <div
              className={tile.anim}
              style={{ ...TILE_INNER_STYLE }}
              title={tile.label}
            >
              <tile.Icon size={tile.iconSize ?? 20} strokeWidth={tile.strokeWidth ?? 2} color="#5B4CF5" />
              <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#5B4CF5', letterSpacing: '0.03em', fontFamily: 'var(--font-jakarta)' }}>
                {tile.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          maxWidth: '860px',
          padding: '0 12px',
        }}
      >
        <Badge
          className="rounded-full h-auto gap-2 hero-badge hero-anim-badge"
          style={{
            backgroundColor: 'rgba(91,76,245,0.08)',
            border: '1px solid rgba(91,76,245,0.18)',
            padding: '6px 16px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#5B4CF5',
            fontFamily: 'var(--font-jakarta)',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
          Coming soon · Join the waitlist
        </Badge>

        <h1
          className="hero-headline hero-anim-h1"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#0D0D0D',
            marginBottom: '24px',
          }}
        >
          Run Your Business<br />
          <span className="inline-block sm:whitespace-nowrap">
            Without The{' '}
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                color: '#5B4CF5',
              }}
            >
              Notebook
              <svg
                viewBox="0 0 200 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: '100%',
                  height: '0.65em',
                  transform: 'translateY(-50%) rotate(-1.5deg)',
                  pointerEvents: 'none',
                  overflow: 'hidden',
                }}
              >
                {/* Top rough cancellation stroke */}
                <path
                  d="M 2 11 C 45 6, 95 16, 145 8 C 168 5, 185 11, 198 8"
                  stroke="#FF5733"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Bottom rough cancellation stroke (double strike) */}
                <path
                  d="M 3 25 C 48 19, 102 30, 152 21 C 172 17, 186 24, 197 20"
                  stroke="#FF5733"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p
          className="hero-anim-p"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.65,
            color: '#666',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Manage jobs, staff, and payments in one place,<br />
          while customers track orders by link so your phone stops ringing.
        </p>

        <div className="hero-anim-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <a
            href="#waitlist"
            className={cn(buttonVariants({ variant: 'default' }), 'cta-btn rounded-full h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2')}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '16px 40px',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            Join The Waitlist
          </a>
        </div>
      </div>
    </section>
  )
}
