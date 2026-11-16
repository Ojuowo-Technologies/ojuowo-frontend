'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Camera } from 'lucide-react'
import { FadeUp } from './animate'

// ─── Placeholder screens ──────────────────────────────────────────────────────

function ScreenOrderIntake() {
  return (
    <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '9px', fontFamily: 'var(--font-jakarta)' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>New Order</div>

      <div style={{ background: '#F2F2F7', borderRadius: '12px', padding: '11px 13px' }}>
        <div style={{ fontSize: '0.56rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Customer</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E8E0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: '#5B4CF5', flexShrink: 0 }}>F</div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D0D0D' }}>Funmi Adeyemi</div>
            <div style={{ fontSize: '0.62rem', color: '#888' }}>0801 234 5678</div>
          </div>
        </div>
      </div>

      <div style={{ background: '#F2F2F7', borderRadius: '12px', padding: '11px 13px' }}>
        <div style={{ fontSize: '0.56rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Items</div>
        {[
          { name: 'Ankara Dress', detail: '2 yards · Size M' },
          { name: 'Head Wrap', detail: 'Matching fabric' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i === 0 ? '5px' : 0 }}>
            <span style={{ fontSize: '0.74rem', color: '#0D0D0D' }}>{item.name}</span>
            <span style={{ fontSize: '0.62rem', color: '#888' }}>{item.detail}</span>
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: '0.56rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Fabric Photos</div>
        <div style={{ display: 'flex', gap: '7px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: '50px', height: '50px', borderRadius: '10px', flexShrink: 0,
              background: i < 2 ? '#E8E0FF' : 'rgba(91,76,245,0.08)',
              border: i === 2 ? '1.5px dashed #5B4CF5' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {i < 2
                ? <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#D4C8F0' }} />
                : <Camera size={13} color="#5B4CF5" />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#5B4CF5', borderRadius: '11px', padding: '11px', textAlign: 'center', color: '#fff', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>
        Confirm Order
      </div>
    </div>
  )
}

function ScreenAssignWork() {
  return (
    <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '9px', fontFamily: 'var(--font-jakarta)' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>Assign Tasks</div>

      <div style={{ background: 'rgba(91,76,245,0.08)', borderRadius: '10px', padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#5B4CF5' }}>Order #038 · Funmi A.</span>
        <span style={{ fontSize: '0.62rem', color: '#888' }}>2 tasks</span>
      </div>

      {[
        { task: 'Sew Ankara Dress', worker: 'Emeka', selected: true, bg: '#FEF3C7', color: '#D97706' },
        { task: 'Stitch Head Wrap', worker: 'Bisi', selected: false, bg: '#E8E0FF', color: '#5B4CF5' },
      ].map((t, i) => (
        <div key={i} style={{
          background: t.selected ? 'rgba(91,76,245,0.06)' : '#F2F2F7',
          border: t.selected ? '1.5px solid #5B4CF5' : '1.5px solid transparent',
          borderRadius: '12px', padding: '11px 13px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0D0D0D' }}>{t.task}</div>
            <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '2px' }}>Assigned to</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.56rem', fontWeight: 800, color: t.color }}>{t.worker[0]}</div>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#0D0D0D' }}>{t.worker}</span>
          </div>
        </div>
      ))}

      <div style={{ background: '#5B4CF5', borderRadius: '11px', padding: '11px', textAlign: 'center', color: '#fff', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>
        Notify Staff
      </div>
    </div>
  )
}

function ScreenCustomerTracking() {
  return (
    <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-jakarta)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#5B4CF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.56rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>✂</div>
        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0D0D0D' }}>Elegance Couture</span>
      </div>

      <div style={{ background: '#F2F2F7', borderRadius: '14px', padding: '14px 13px' }}>
        <div style={{ fontSize: '0.62rem', color: '#888', marginBottom: '3px' }}>Your order</div>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0D0D0D', marginBottom: '14px' }}>Funmi · Order #038</div>

        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ position: 'absolute', top: '7px', left: '8px', right: '8px', height: '2px', background: '#E0DCFF' }} />
          <div style={{ position: 'absolute', top: '7px', left: '8px', width: '55%', height: '2px', background: '#5B4CF5' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {['Received', 'In Work', 'Ready', 'Done'].map((stage, i) => (
              <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: i < 2 ? '#5B4CF5' : '#fff',
                  border: i < 2 ? 'none' : i === 2 ? '2px solid #5B4CF5' : '2px solid #DDD',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i < 2 && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />}
                </div>
                <span style={{ fontSize: '0.5rem', color: i <= 2 ? '#5B4CF5' : '#AAA', fontWeight: i === 1 ? 700 : 500 }}>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(91,76,245,0.07)', borderRadius: '11px', padding: '11px 13px' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#5B4CF5' }}>Ready by Dec 18</div>
        <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '2px' }}>No need to call. This link updates automatically.</div>
      </div>

      <div style={{ background: '#F2F2F7', borderRadius: '10px', padding: '9px 13px', fontSize: '0.6rem', color: '#AAA', textAlign: 'center' }}>
        Powered by Ojúòwò
      </div>
    </div>
  )
}

function ScreenRecordPayment() {
  return (
    <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '9px', fontFamily: 'var(--font-jakarta)' }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>Invoice #042</div>

      <div style={{ background: '#F2F2F7', borderRadius: '14px', padding: '13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '11px' }}>
          <div>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>Customer</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D0D0D' }}>Funmi Adeyemi</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>Total</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D0D0D' }}>₦90,000</div>
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', marginBottom: '5px' }}>
            <span style={{ color: '#888' }}>Paid</span>
            <span style={{ color: '#5B4CF5', fontWeight: 600 }}>₦45,000</span>
          </div>
          <div style={{ height: '5px', background: 'rgba(91,76,245,0.12)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: '#5B4CF5', borderRadius: '99px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
          <span style={{ color: '#888' }}>Balance</span>
          <span style={{ fontWeight: 700, color: '#D97706' }}>₦45,000</span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.56rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '7px' }}>Recent Payments</div>
        <div style={{ background: '#F2F2F7', borderRadius: '10px', padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0D0D0D' }}>Cash · Dec 15</div>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>Deposit</div>
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#16A34A' }}>+₦45,000</span>
        </div>
      </div>

      <div style={{ background: '#5B4CF5', borderRadius: '11px', padding: '11px', textAlign: 'center', color: '#fff', fontSize: '0.78rem', fontWeight: 700, marginTop: '2px' }}>
        Record Payment
      </div>
    </div>
  )
}

// ─── Phone mockup ─────────────────────────────────────────────────────────────

const SCREENS = [
  <ScreenOrderIntake key="order" />,
  <ScreenAssignWork key="assign" />,
  <ScreenCustomerTracking key="track" />,
  <ScreenRecordPayment key="payment" />,
]

function PhoneMockup({ active, fading }: { active: number; fading: boolean }) {
  return (
    <div style={{
      width: '268px',
      flexShrink: 0,
      background: '#111',
      borderRadius: '44px',
      padding: '10px',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
      position: 'relative',
    }}>
      {/* Side buttons */}
      <div style={{ position: 'absolute', left: '-3px', top: '72px', width: '3px', height: '28px', background: '#333', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: '-3px', top: '110px', width: '3px', height: '44px', background: '#333', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: '-3px', top: '162px', width: '3px', height: '44px', background: '#333', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', right: '-3px', top: '110px', width: '3px', height: '64px', background: '#333', borderRadius: '0 2px 2px 0' }} />

      <div style={{ background: '#fff', borderRadius: '36px', overflow: 'hidden' }}>
        {/* Status bar */}
        <div style={{ background: '#FAFAFA', padding: '11px 18px 7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-jakarta)' }}>9:41</span>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5px', alignItems: 'flex-end', height: '8px' }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: '2.5px', height: `${h}px`, background: i < 3 ? '#0D0D0D' : '#CCC', borderRadius: '1px' }} />
              ))}
            </div>
            <div style={{ width: '14px', height: '7px', border: '1.5px solid #0D0D0D', borderRadius: '2px', display: 'flex', alignItems: 'center', padding: '1px', marginLeft: '3px' }}>
              <div style={{ width: '75%', height: '100%', background: '#0D0D0D', borderRadius: '1px' }} />
            </div>
          </div>
        </div>

        {/* App header */}
        <div style={{ background: '#fff', padding: '7px 14px 11px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#5B4CF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '0.42rem', color: '#fff', fontWeight: 800, letterSpacing: '-0.03em' }}>OJ</span>
          </div>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-display)' }}>Ojúòwò</span>
        </div>

        {/* Screen content */}
        <div style={{
          minHeight: '380px',
          paddingTop: '12px',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(6px)' : 'translateY(0)',
        }}>
          {SCREENS[active]}
        </div>

        {/* Home indicator */}
        <div style={{ padding: '10px 0 14px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '90px', height: '4px', background: '#0D0D0D', borderRadius: '99px', opacity: 0.12 }} />
        </div>
      </div>
    </div>
  )
}

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Take The Order',
    body: 'Add the customer, items, fabric photos and measurements. Everything saved before you leave the counter.',
  },
  {
    number: '02',
    title: 'Assign The Work',
    body: 'Pick the right worker for each job. Staff see only their own tasks on their phones, nothing else.',
  },
  {
    number: '03',
    title: 'The Customer Tracks It',
    body: 'Send one WhatsApp link. The customer follows their order, stage by stage. No calls needed.',
  },
  {
    number: '04',
    title: 'Record Payment',
    body: 'Record cash or transfers as they come in. See who has paid, who owes and how much. Always.',
  },
]

const STEP_DURATION = 4500

// ─── Main section ─────────────────────────────────────────────────────────────

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Respect prefers-reduced-motion — start paused if user prefers reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true)
    }
  }, [])

  const goTo = useCallback((index: number) => {
    setFading(true)
    setTimeout(() => {
      setActive(index)
      setProgressKey(k => k + 1)
      setFading(false)
    }, 220)
  }, [])

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % STEPS.length
        setFading(true)
        setTimeout(() => {
          setActive(next)
          setProgressKey(k => k + 1)
          setFading(false)
        }, 220)
        return prev
      })
    }, STEP_DURATION)
  }, [])

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, startInterval])

  const handleStepClick = (i: number) => {
    if (i === active) return
    goTo(i)
    if (!paused) startInterval()
  }

  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="hiw-section"
      style={{
        backgroundColor: 'transparent',
        scrollMarginTop: '100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(91,76,245,0.2) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative' }}>

        {/* Section header */}
        <FadeUp><div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
            color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.12em',
            marginBottom: '16px', fontFamily: 'var(--font-jakarta)',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#0D0D0D',
            lineHeight: 1.15, letterSpacing: '-0.025em',
          }}>
            From Order To Delivery<br />In Four Steps
          </h2>
        </div></FadeUp>

        {/* Two-column layout */}
        <div className="hiw-layout">

          {/* Left — phone mockup */}
          <FadeUp delay={0.12}>
            <PhoneMockup active={active} fading={fading} />
          </FadeUp>

          {/* Right — steps */}
          <FadeUp delay={0.26} style={{ flex: 1, minWidth: '300px', maxWidth: '520px', position: 'relative' }}>

            {/* Pause / play toggle */}
            <button
              onClick={() => setPaused(p => !p)}
              aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
              style={{
                position: 'absolute', top: 0, right: 0,
                width: '32px', height: '32px', borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', color: '#5B4CF5', zIndex: 2,
                transition: 'opacity 0.15s ease',
              }}
            >
              {paused ? '▶' : '⏸'}
            </button>

            {/* Vertical track line */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '16px',
              bottom: '16px',
              width: '2px',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: '99px',
            }} />

            {STEPS.map((step, i) => {
              const isActive = i === active
              return (
                <div
                  key={step.number}
                  role="button"
                  tabIndex={0}
                  aria-label={`Step ${step.number}: ${step.title}`}
                  onClick={() => handleStepClick(i)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleStepClick(i)
                    }
                  }}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-4 rounded-xl"
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                    marginBottom: i < STEPS.length - 1 ? '36px' : 0,
                    cursor: isActive ? 'default' : 'pointer',
                    transition: 'opacity 0.2s ease',
                    opacity: isActive ? 1 : 0.55,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.opacity = '0.8' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.opacity = '0.55' }}
                >
                  {/* Step dot on track */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isActive ? '#5B4CF5' : 'rgba(0,0,0,0.04)',
                    border: isActive ? 'none' : '2px solid rgba(0,0,0,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                    position: 'relative',
                    boxShadow: isActive ? '0 0 0 6px rgba(91,76,245,0.18)' : 'none',
                  }}>
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 800,
                      color: isActive ? '#fff' : 'rgba(0,0,0,0.3)',
                      fontFamily: 'var(--font-jakarta)',
                    }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Step content */}
                  <div style={{ paddingTop: '4px', flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '1.1rem', color: '#0D0D0D',
                      marginBottom: '6px', letterSpacing: '-0.015em',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-jakarta)', fontSize: '0.875rem',
                      lineHeight: 1.65, color: '#666',
                      marginBottom: isActive ? '14px' : 0,
                    }}>
                      {step.body}
                    </p>

                    {/* Auto-advance progress bar — hidden when paused */}
                    {isActive && !paused && (
                      <div style={{ height: '2px', background: 'rgba(0,0,0,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div
                          key={progressKey}
                          style={{
                            height: '100%',
                            background: '#5B4CF5',
                            borderRadius: '99px',
                            animationName: 'fill-progress',
                            animationDuration: `${STEP_DURATION}ms`,
                            animationTimingFunction: 'linear',
                            animationFillMode: 'forwards',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
