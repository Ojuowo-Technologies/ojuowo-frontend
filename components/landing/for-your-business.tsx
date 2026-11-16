'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { ComponentType } from 'react'
import { Scissors, Hammer, ChefHat, Wand2, Wheat, Shirt, Store } from 'lucide-react'
import { FadeUp } from './animate'

// ── Business data ─────────────────────────────────────────────────────────────

type LucideIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>

interface Business {
  id: string
  Icon: LucideIcon
  name: string
  tagline: string
  features: [string, string, string]
  // Path under /public — null triggers a gradient fallback
  image: string | null
  // object-position: anchor subject's head; always bias toward top (y = 0–15%)
  imagePos: string
}

const BUSINESSES: Business[] = [
  {
    id: 'tailoring',
    Icon: Scissors,
    name: 'Tailoring',
    tagline: 'Every measurement, every stage, every customer. One place.',
    features: [
      'Measurement snapshot saved per order',
      'Cut → Sew → Iron → Ready stage tracking',
      'Customer tracking link shared via WhatsApp',
    ],
    image: '/images/businesses/tailoring.png',
    imagePos: '50% 0%',
  },
  {
    id: 'shoe-making',
    Icon: Hammer,
    name: 'Shoe Making',
    tagline: 'Every size, spec, and due date tracked from start to finished pair.',
    features: [
      'Size and material specs stored per order',
      'Production stage tracking per pair',
      'Worker task assignment and task completion tracking',
    ],
    image: '/images/businesses/shoe-making.png',
    // Left 35% avoids the dark gradient on the right; y=0% anchors to top so head stays in frame
    imagePos: '30% 0%',
  },
  {
    id: 'bakery',
    Icon: ChefHat,
    name: 'Baking',
    tagline: 'Custom orders, flavour notes, and pickup times. Zero confusion.',
    features: [
      'Custom cake specs and flavour notes stored',
      'Pickup schedule with customer reminders',
      'Deposit and balance tracked per order',
    ],
    image: '/images/businesses/bakery.png',
    imagePos: '50% 0%',
  },
  {
    id: 'hair-styling',
    Icon: Wand2,
    name: 'Salon',
    tagline: 'Bookings, stylist queues, and service records. One screen.',
    features: [
      'Appointment scheduling per stylist',
      'Service and product history per customer',
      'Stylist pay calculated from approved work',
    ],
    image: '/images/businesses/hair-styling.png',
    imagePos: '50% 10%',
  },
  {
    id: 'laundromat',
    Icon: Shirt,
    name: 'Laundromat',
    tagline: 'From drop-off to pickup, every wash order tracked and customers notified.',
    features: [
      'Item count and care notes per drop-off',
      'Customer notified by link when laundry is ready',
      'Payment and balance tracked per order',
    ],
    image: '/images/businesses/laundromat.png',
    imagePos: '45% 0%',
  },
  {
    id: 'farming',
    Icon: Wheat,
    name: 'Farming',
    tagline: 'Produce orders, harvest dates, and delivery routes. All in one place.',
    features: [
      'Produce orders with quantities and variety',
      'Harvest and delivery date tracking',
      'Customer payment history per season',
    ],
    image: '/images/businesses/farming.png',
    imagePos: '50% 0%',
  },
  {
    id: 'and-more',
    Icon: Store,
    name: 'Your Business',
    tagline: 'You take orders. You manage people. Ojúòwò was built for exactly that.',
    features: [
      'Any product or service tracked from order to delivery',
      'Your team\'s tasks, wages, and performance in one place',
      'Your brand on every customer-facing page',
    ],
    image: '/images/businesses/and-more.png',
    // Overhead flat-lay — bias slightly upward to show top hands clearly
    imagePos: '50% 25%',
  },
]

// ── Animation ─────────────────────────────────────────────────────────────────

const DWELL_MS = 4500
const SPRING   = { type: 'spring', stiffness: 40, damping: 18, mass: 1.1 } as const

// Full ±100% travel on enter AND exit — creates the split-colour midpoint wipe
const wipeVariants = {
  enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
  center: { x: '0%', transition: SPRING },
  exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', transition: SPRING }),
}

// ── Main component ────────────────────────────────────────────────────────────

export function ForYourBusiness() {
  const [current,    setCurrent]    = useState(0)
  const [tick,       setTick]       = useState(0)
  const [paused,     setPaused]     = useState(false)
  const [mobile,     setMobile]     = useState(false)
  const [inView,     setInView]     = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  const dirRef     = useRef(1)
  const sectionRef = useRef<HTMLElement>(null)

  const goTo = useCallback((idx: number, d: number) => {
    dirRef.current = d
    setCurrent(idx)
    setTick(t => t + 1)
  }, [])

  const goNext = useCallback(() => {
    goTo((current + 1) % BUSINESSES.length, 1)
  }, [current, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + BUSINESSES.length) % BUSINESSES.length, -1)
  }, [current, goTo])

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Once in view, wait for the FadeUp card animation to settle, then unlock the slider
  useEffect(() => {
    if (!inView || hasEntered) return
    const t = setTimeout(() => {
      setHasEntered(true)
      setTick(n => n + 1) // kick off the first progress bar fill
    }, 950) // matches FadeUp duration (0.8s) + delay (0.1s) + small buffer
    return () => clearTimeout(t)
  }, [inView, hasEntered])

  useEffect(() => {
    if (paused || !hasEntered) return
    const t = setTimeout(goNext, DWELL_MS)
    return () => clearTimeout(t)
  }, [current, paused, hasEntered, goNext])

  const biz     = BUSINESSES[current]
  const BizIcon = biz.Icon as ComponentType<{ size: number; color: string; strokeWidth: number }>
  const dir     = dirRef.current

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      aria-label="Who it's for"
      style={{ padding: '80px 0', scrollMarginTop: '100px', background: 'rgba(91,76,245,0.025)' }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 12px' }}>

      {/* ── Section header ── */}
      <FadeUp><div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{
          display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
          color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.12em',
          marginBottom: '16px', fontFamily: 'var(--font-jakarta)',
        }}>
          Who it helps
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#0D0D0D',
          lineHeight: 1.15, letterSpacing: '-0.025em',
        }}>
          Built For Any Business<br />That Takes Orders
        </h2>
      </div></FadeUp>

      {/* ── Slider shell ──
          Background #F2F2F7 matches the left neumorphic panel so they read
          as one unified card. The outer shadow provides the neumorphic lift. ── */}
      <FadeUp delay={0.1}>
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: '28px',
          background: '#F2F2F7',
          height: mobile ? '680px' : undefined,
          minHeight: mobile ? undefined : '500px',
          userSelect: 'none',
          // Neumorphic outer shadow — consistent with the product cards
          boxShadow: '6px 6px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.50)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence custom={dir} mode="sync">
          <motion.div
            key={current}
            custom={dir}
            variants={wipeVariants}
            initial={hasEntered ? 'enter' : false}
            animate="center"
            exit="exit"
            style={{
              position: 'absolute', inset: 0,
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
            }}
          >

            {/* ── LEFT panel: neumorphic card — text content ── */}
            {/* Background inherits from parent (#F2F2F7) — no fill needed. */}
            {/* A thin white right-border acts as the neumorphic inset highlight. */}
            <div style={{
              flex: mobile ? '1' : '0 0 50%',
              padding: mobile ? '28px 28px 28px' : '56px 52px 56px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: mobile ? 'flex-start' : 'center',
              position: 'relative',
              overflow: 'hidden',
              // Thin white edge — separates panel from photo with a neumorphic highlight
              borderRight: mobile ? 'none' : '1.5px solid rgba(255,255,255,0.75)',
              borderBottom: mobile ? '1.5px solid rgba(255,255,255,0.75)' : 'none',
              // Dot-grid texture
              backgroundImage: 'radial-gradient(rgba(91,76,245,0.18) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}>

              {/* Ghost business icon */}
              <div style={{
                position: 'absolute',
                right: '4%', bottom: '-6%',
                color: '#5B4CF5',
                opacity: 0.07,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                <BizIcon size={mobile ? 130 : 160} color="#5B4CF5" strokeWidth={0.8} />
              </div>

              {/* Icon badge */}
              <div style={{
                width: '50px', height: '50px', borderRadius: '14px',
                background: 'rgba(91,76,245,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '22px',
              }}>
                <BizIcon size={23} color="#5B4CF5" strokeWidth={1.75} />
              </div>

              {/* Business name */}
              <div style={{
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                fontSize: mobile
                  ? 'clamp(1.7rem, 6vw, 2.1rem)'
                  : 'clamp(1.7rem, 2.1vw, 2.2rem)',
                color: '#0D0D0D',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}>
                {biz.name}
              </div>

              {/* Tagline */}
              <div style={{
                fontSize: '0.93rem', color: 'rgba(0,0,0,0.45)',
                fontFamily: 'var(--font-jakarta)', lineHeight: 1.68,
                marginBottom: '28px', maxWidth: '380px',
              }}>
                {biz.tagline}
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {biz.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#5B4CF5', flexShrink: 0, marginTop: '7px',
                      boxShadow: '0 0 0 3px rgba(91,76,245,0.12)',
                    }} />
                    <span style={{
                      fontSize: '0.87rem', color: 'rgba(0,0,0,0.55)',
                      fontFamily: 'var(--font-jakarta)', lineHeight: 1.55,
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT panel: full-bleed photo, clean — no card overlay ── */}
            <div style={{
              flex: mobile ? 'none' : 1,
              height: mobile ? '260px' : 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {biz.image ? (
                <Image
                  src={biz.image}
                  alt={biz.name}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: biz.imagePos }}
                  priority={biz.id === 'tailoring'}
                />
              ) : (
                // Placeholder until hair-styling.png is added to /public/images/businesses/
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, #DDD4F5 0%, #C5B0EE 50%, #E0C8F0 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: '0.78rem', color: 'rgba(91,76,245,0.5)',
                    fontFamily: 'var(--font-jakarta)', fontWeight: 600,
                    letterSpacing: '0.08em',
                  }}>
                    Photo coming soon
                  </span>
                </div>
              )}

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Click zones — left 12% / right 12% of slider */}
        {!mobile && (
          <>
            <button
              aria-label="Previous business"
              onClick={goPrev}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '12%', background: 'transparent', border: 'none', cursor: 'w-resize', zIndex: 10 }}
            />
            <button
              aria-label="Next business"
              onClick={goNext}
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '12%', background: 'transparent', border: 'none', cursor: 'e-resize', zIndex: 10 }}
            />
          </>
        )}
      </div>

      {/* ── Progress dots ── */}
      <div style={{ display: 'flex', gap: '7px', marginTop: '20px' }}>
        {BUSINESSES.map((b, i) => (
          <button
            key={b.id}
            aria-label={`Show ${b.name}`}
            onClick={() => { if (i === current) return; goTo(i, i > current ? 1 : -1) }}
            style={{
              flex: 1, height: '3px', padding: 0, border: 'none', cursor: 'pointer',
              background: i < current ? '#5B4CF5' : 'rgba(91,76,245,0.12)',
              borderRadius: '99px', overflow: 'hidden', position: 'relative',
            }}
          >
            {i === current && (
              <div
                key={tick}
                style={{
                  position: 'absolute', inset: 0,
                  background: '#5B4CF5', borderRadius: '99px',
                  transformOrigin: 'left',
                  animation: `fybProg ${DWELL_MS}ms linear forwards`,
                }}
              />
            )}
          </button>
        ))}
      </div>
      </FadeUp>

      <style>{`
        @keyframes fybProg {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      </div>
    </section>
  )
}
