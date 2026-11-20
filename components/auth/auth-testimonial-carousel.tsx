'use client'

import { useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    quote: 'I can see every order, every payment, and what every tailor is working on. Right from my phone.',
    name: 'Taiwo Adeyemi',
    role: 'Owner, S.I.G Clothing',
    initials: 'TA',
  },
  {
    quote: 'Assigning work to the team used to take my whole morning. Now I do it in minutes.',
    name: 'Kemi Okafor',
    role: 'Manager, S.I.G Clothing',
    initials: 'KO',
  },
  {
    quote: 'I open the app and I know exactly what I\'m sewing today. No more waiting to be briefed.',
    name: 'Musa Ibrahim',
    role: 'Tailor, S.I.G Clothing',
    initials: 'MI',
  },
  {
    quote: 'I could see my dress going from cutting to finishing. I knew exactly when to pick it up.',
    name: 'Ngozi Obi',
    role: 'Customer, S.I.G Clothing',
    initials: 'NO',
  },
]

export function AuthTestimonialCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = TESTIMONIALS[index]

  return (
    <div
      style={{
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Slide-in on key change */}
      <div key={index} className="auth-testimonial-in">
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
          &ldquo;{t.quote}&rdquo;
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
              {t.initials}
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
              {t.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.72rem',
                color: 'rgba(196,185,255,0.65)',
              }}
            >
              {t.role}
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '16px',
        }}
      >
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? '18px' : '6px',
              height: '6px',
              borderRadius: '999px',
              background: i === index ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
