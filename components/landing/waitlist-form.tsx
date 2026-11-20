'use client'

import { useState, useTransition, useRef } from 'react'
import { joinWaitlist } from '@/app/actions/waitlist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LogoMark } from '@/components/ui/logo'
import { FadeUp } from './animate'
import { CheckCircle } from 'lucide-react'

const BUSINESS_TYPES = [
  { value: 'tailoring',   label: 'Tailoring'   },
  { value: 'baking',       label: 'Baking'      },
  { value: 'salon',        label: 'Salon'       },
  { value: 'shoe-making',  label: 'Shoe Making'  },
  { value: 'laundromat',   label: 'Laundromat'   },
  { value: 'farming',      label: 'Farming'      },
  { value: 'other',       label: 'Others'      },
]

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [otherText, setOtherText] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const otherInputRef = useRef<HTMLInputElement>(null)

  const isOther = businessType === 'other'
  const effectiveBusinessType = isOther ? otherText.trim() : businessType
  const canSubmit = !!email && !!effectiveBusinessType

  const handlePillClick = (value: string) => {
    if (businessType === value) {
      setBusinessType('')
      setOtherText('')
    } else {
      setBusinessType(value)
      if (value === 'other') {
        setTimeout(() => otherInputRef.current?.focus(), 50)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSubmit) return

    startTransition(async () => {
      const result = await joinWaitlist(email, effectiveBusinessType, honeypot)
      if (result.ok) {
        setStatus('success')
        setMessage(result.message)
        setEmail('')
        setBusinessType('')
        setOtherText('')
      } else {
        setStatus('error')
        setMessage(result.message)
      }
    })
  }

  return (
    <section
      id="waitlist"
      aria-label="Join the waitlist"
      style={{ padding: '80px 12px', maxWidth: '1320px', margin: '0 auto' }}
    >
      <div>

        {/* CTA card — contained, same width constraint as other sections */}
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
            <path
              d="M -80 480 C 180 340 460 100 820 20 C 980 -15 1100 30 1280 -10"
              fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" strokeLinecap="round"
            />
            <path
              d="M -80 560 C 200 400 500 180 860 80 C 1020 30 1150 55 1280 70"
              fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" strokeLinecap="round"
            />
            <path
              d="M -80 380 C 160 270 400 60 740 -30 C 900 -65 1060 -10 1280 -60"
              fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeLinecap="round"
            />
            <path
              d="M -60 80 C 40 160 60 300 20 420"
              fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeLinecap="round"
            />
          </svg>

          {/* Logo watermark */}
          <div style={{
            position: 'absolute', right: '-80px', bottom: '-80px',
            opacity: 0.04, pointerEvents: 'none', transform: 'rotate(-8deg)',
          }}>
            <LogoMark color="#FFFFFF" size={380} />
          </div>

          {/* Aurora flow blobs */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute',
              width: '560px', height: '460px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(205,188,255,0.46) 0%, rgba(158,135,255,0.20) 45%, transparent 70%)',
              filter: 'blur(72px)',
              animation: 'wlAurora1 14s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute',
              width: '400px', height: '340px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(225,208,255,0.38) 0%, rgba(175,152,255,0.17) 50%, transparent 70%)',
              filter: 'blur(88px)',
              animation: 'wlAurora1 14s ease-in-out infinite',
              animationDelay: '-7s',
            }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative' }}>

            {/* Heading — narrow centered */}
            <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.72rem', fontWeight: 700,
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  marginBottom: '20px', fontFamily: 'var(--font-jakarta)',
                }}
              >
                Early access
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#FFFFFF',
                  lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '16px',
                }}
              >
                Get Early Access<br />Before We Open To Everyone
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)', fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '36px',
                }}
              >
                Sign up and we&apos;ll invite you before we open to the public. Free during early access, with a personal setup session.
              </p>
            </div>

            {status === 'success' ? (
              <div style={{
                maxWidth: '480px', margin: '0 auto', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                padding: '8px 24px 32px',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <CheckCircle size={26} color="#FFFFFF" strokeWidth={2} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)', color: '#FFFFFF',
                  lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0,
                }}>
                  You&apos;re On The List!
                </h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta)', fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0,
                }}>
                  {message || "We'll reach out before we open to the public."}{' '}
                  Expect an invite before anyone else.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-label="Join the waitlist">

                {/* Honeypot — invisible to humans, bots fill it */}
                <input
                  name="website"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                {/* Business type pills */}
                <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-jakarta)', fontSize: '0.85rem',
                    fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '12px',
                  }}>
                    What kind of business do you run?
                  </p>
                  <div className="waitlist-pills-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {BUSINESS_TYPES.map((type) => {
                      const selected = businessType === type.value
                      return (
                        <button
                          key={type.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => handlePillClick(type.value)}
                          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1140]"
                          style={{
                            padding: '14px 16px', borderRadius: '9999px',
                            whiteSpace: 'nowrap',
                            border: selected
                              ? '1.5px solid rgba(255,255,255,0.85)'
                              : '1px solid rgba(255,255,255,0.18)',
                            backgroundColor: selected
                              ? 'rgba(255,255,255,0.18)'
                              : 'rgba(255,255,255,0.07)',
                            color: selected ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                            fontFamily: 'var(--font-jakarta)',
                            fontWeight: selected ? 700 : 500,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            outline: 'none',
                          }}
                        >
                          {type.label}
                        </button>
                      )
                    })}
                  </div>

                  {isOther && (
                    <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
                      <input
                        ref={otherInputRef}
                        type="text"
                        value={otherText}
                        onChange={e => setOtherText(e.target.value)}
                        placeholder="e.g. Photography, Catering, Printing…"
                        maxLength={80}
                        aria-label="Your business type"
                        disabled={isPending}
                        style={{
                          width: '100%', maxWidth: '360px',
                          padding: '12px 18px',
                          borderRadius: '9999px',
                          border: '1.5px solid rgba(255,255,255,0.35)',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-jakarta)',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                        className="placeholder:text-white/35 focus:border-white/60"
                      />
                    </div>
                  )}
                </div>

                {/* Email + submit */}
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                  {status === 'error' && (
                    <p style={{
                      marginBottom: '12px', fontSize: '0.85rem', textAlign: 'center',
                      color: '#FF7070', fontFamily: 'var(--font-jakarta)',
                    }}>
                      {message}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Input
                      type="email"
                      aria-label="Email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={isPending}
                      className="rounded-full border-white/20 focus-visible:border-white/55 focus-visible:ring-white/10 bg-white/12 text-white placeholder:text-white/35 h-auto"
                      style={{
                        flex: '1 1 260px', maxWidth: '340px',
                        padding: '14px 20px', fontSize: '0.95rem',
                        fontFamily: 'var(--font-jakarta)',
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={isPending || !canSubmit}
                      title={!canSubmit ? 'Select your business type above first' : undefined}
                      className="rounded-full h-auto whitespace-nowrap bg-white hover:bg-white/92 text-[#3A2DB5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1140]"
                      style={{
                        padding: '14px 32px', fontFamily: 'var(--font-jakarta)',
                        fontWeight: 700, fontSize: '0.95rem',
                        opacity: !canSubmit ? 0.5 : 1,
                        transition: 'opacity 0.15s ease, transform 0.15s ease, box-shadow 0.2s ease',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      }}
                    >
                      {isPending ? 'Joining…' : 'Get early access'}
                    </Button>
                  </div>
                </div>
              </form>
            )}

          </div>

        </div>
        </FadeUp>
      </div>

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
