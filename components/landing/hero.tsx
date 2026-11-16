"use client"

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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
    <div style={{ ...CARD_STYLE, padding: '18px 20px', width: '260px' }}>
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
    <div style={{ ...CARD_STYLE, padding: '18px 20px', width: '240px' }}>
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
    <div style={{ ...CARD_STYLE, padding: '18px 20px', width: '230px' }}>
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
    <div style={{ ...CARD_STYLE, padding: '18px 20px', width: '250px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <CheckCircle2 size={18} color="#5B4CF5" />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0D0D0D' }}>Your order is ready</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#5B4CF5' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#5B4CF5' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5B4CF5', flexShrink: 0 }} />
      </div>
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
  const sectionRef = useRef<HTMLElement>(null)
  const [stage, setStage] = useState({ w: 1320, h: 900 })

  // Track actual hero dimensions so corner offsets are always pixel-accurate
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setStage({ w: r.width, h: r.height })
    }
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Single raw value; two springs with slightly different configs give natural stagger
  // between top pair (snappier) and bottom pair (fractionally heavier)
  const rawProgress = useMotionValue(0)
  const progressTop = useSpring(rawProgress, { stiffness: 82, damping: 22, mass: 0.50 })
  const progressBot = useSpring(rawProgress, { stiffness: 72, damping: 22, mass: 0.60 })

  const shouldReduceMotion = useReducedMotion()

  // Reveal text immediately on small screens or when user prefers reduced motion
  useEffect(() => {
    if (window.innerWidth <= 1200 || shouldReduceMotion) rawProgress.set(1)
  }, [rawProgress, shouldReduceMotion])

  // Corner destinations from center, computed from real stage dimensions.
  // All wrapper divs sit at left:50% top:50% translate(-50%,-50%), so the
  // motion.div adds the displacement to reach each card's design position.
  const { w, h } = stage
  //   TL  left:13.3%  top:28%
  const tlDx = (0.133 - 0.5) * w
  const tlDy = (0.280 - 0.5) * h
  //   TR  right:13.1% → left:86.9%  top:23.8%
  const trDx = (0.869 - 0.5) * w
  const trDy = (0.238 - 0.5) * h
  //   BL  left:14%  bottom:22% → top:78%
  const blDx = (0.140 - 0.5) * w
  const blDy = (0.780 - 0.5) * h
  //   BR  right:13.7% → left:86.3%  bottom:25.6% → top:74.4%
  const brDx = (0.863 - 0.5) * w
  const brDy = (0.744 - 0.5) * h

  // Top pair transforms
  const tlX     = useTransform(progressTop, [0, 1], [0, tlDx])
  const tlY     = useTransform(progressTop, [0, 1], [0, tlDy])
  const tlScale = useTransform(progressTop, [0, 1], [1.32, 1])
  const tlRot   = useTransform(progressTop, [0, 1], [-8, 0])

  const trX     = useTransform(progressTop, [0, 1], [0, trDx])
  const trY     = useTransform(progressTop, [0, 1], [0, trDy])
  const trScale = useTransform(progressTop, [0, 1], [1.32, 1])
  const trRot   = useTransform(progressTop, [0, 1], [8, 0])

  // Bottom pair transforms — lagging spring gives the curtain cascade effect
  const blX     = useTransform(progressBot, [0, 1], [0, blDx])
  const blY     = useTransform(progressBot, [0, 1], [0, blDy])
  const blScale = useTransform(progressBot, [0, 1], [1.30, 1])
  const blRot   = useTransform(progressBot, [0, 1], [5, 0])

  const brX     = useTransform(progressBot, [0, 1], [0, brDx])
  const brY     = useTransform(progressBot, [0, 1], [0, brDy])
  const brScale = useTransform(progressBot, [0, 1], [1.30, 1])
  const brRot   = useTransform(progressBot, [0, 1], [-5, 0])

  // Center text fades up as cards part
  const textOpacity = useTransform(progressTop, [0.3, 0.9], [0, 1])
  const textY       = useTransform(progressTop, [0.3, 0.9], [24, 0])

  // SVG lines and tiles trail the spread
  const svgOpacity   = useTransform(progressTop, [0.5, 1], [0, 1])
  const tilesOpacity = useTransform(progressBot, [0.6, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="hero-section"
      onMouseEnter={() => rawProgress.set(1)}
      onMouseLeave={() => rawProgress.set(0)}
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
      {/* Diamond mesh */}
      <div
        className="dot-grid hero-anim-dotgrid"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Radial gradient — clears the center so text reads cleanly */}
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

      {/* SVG hub-and-spoke — fades in with the spread */}
      <motion.svg
        className="hero-svg-lines"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, opacity: svgOpacity }}
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
      </motion.svg>

      {/* Four product cards — ALL anchored at the hero center, spring to corners on hover */}
      <div aria-hidden="true" className="hero-floating-cards" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        {/* z-indexes: TL on top of stack, BR at bottom */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 4 }}>
          <motion.div style={{ x: tlX, y: tlY, scale: tlScale, rotate: tlRot, willChange: 'transform' }}>
            <div className="float-a"><TaskCard /></div>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
          <motion.div style={{ x: trX, y: trY, scale: trScale, rotate: trRot, willChange: 'transform' }}>
            <div className="float-b"><OrderCard /></div>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <motion.div style={{ x: blX, y: blY, scale: blScale, rotate: blRot, willChange: 'transform' }}>
            <div className="float-c"><PaymentCard /></div>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <motion.div style={{ x: brX, y: brY, scale: brScale, rotate: brRot, willChange: 'transform' }}>
            <div className="float-d"><TrackingCard /></div>
          </motion.div>
        </div>
      </div>

      {/* Business-type tiles — appear once cards are mostly spread */}
      <motion.div
        aria-hidden="true"
        className="hero-business-tiles"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, opacity: tilesOpacity }}
      >
        {bizTiles.map((tile, i) => (
          <div
            key={tile.label}
            className={`hero-anim-tile-${i}`}
            style={{ position: 'absolute', ...tile.pos }}
          >
            <div className={tile.anim} style={{ ...TILE_INNER_STYLE }} title={tile.label}>
              <tile.Icon size={tile.iconSize ?? 20} strokeWidth={tile.strokeWidth ?? 2} color="#5B4CF5" />
              <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#5B4CF5', letterSpacing: '0.03em', fontFamily: 'var(--font-jakarta)' }}>
                {tile.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Center content — hidden behind the deck, revealed as cards part */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          maxWidth: '860px',
          padding: '0 12px',
          opacity: textOpacity,
          y: textY,
        }}
      >
        <Badge
          className="rounded-full h-auto gap-2 hero-badge"
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
          Now open for early access
        </Badge>

        <h1
          className="hero-headline"
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
            <span style={{ position: 'relative', display: 'inline-block', color: '#5B4CF5' }}>
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
                <path d="M 2 11 C 45 6, 95 16, 145 8 C 168 5, 185 11, 198 8" stroke="#F97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 3 25 C 48 19, 102 30, 152 21 C 172 17, 186 24, 197 20" stroke="#F97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.65,
            color: '#666',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Manage orders, staff, and payments in one place.<br />
          Customers track progress on their own, so your phone stops ringing.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
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
      </motion.div>
    </section>
  )
}
