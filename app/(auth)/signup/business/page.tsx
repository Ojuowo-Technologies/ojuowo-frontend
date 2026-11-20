'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scissors, ChefHat, Wand2, Hammer, Wheat, Store } from 'lucide-react'
import { AuthCard } from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { joinWaitlist } from '@/lib/api/auth'
import type { ApiError, SignupSessionData } from '@/lib/types/auth'

const BUSINESS_TYPES = [
  { id: 'tailoring',  label: 'Tailoring',   Icon: Scissors },
  { id: 'baking',     label: 'Baking',       Icon: ChefHat  },
  { id: 'salon',      label: 'Salon',        Icon: Wand2    },
  { id: 'shoemaking', label: 'Shoemaking',   Icon: Hammer   },
  { id: 'farming',    label: 'Farming',      Icon: Wheat    },
  { id: 'other',      label: 'Other',        Icon: Store    },
]

const ACTIVE_TYPE = 'tailoring'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-jakarta)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  marginBottom: '8px',
}

export default function BusinessPage() {
  const router = useRouter()
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [otherDescription, setOtherDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [waitlistJoined, setWaitlistJoined] = useState(false)

  const nameError = nameTouched && businessName.trim().length === 0
    ? 'Business Name field cannot be empty'
    : null

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ojuowo_token') : null
    if (!token) { router.replace('/signup'); return }
    const raw = sessionStorage.getItem('ojuowo_signup')
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SignupSessionData
        setOwnerName(parsed.name?.split(' ')[0] ?? '')
        setOwnerEmail(parsed.email ?? '')
      } catch { /* ignore */ }
    }
  }, [router])

  function handleTypeSelect(id: string) {
    setSelectedType(id)
    setError(null)
    if (id !== 'other') setOtherDescription('')
  }

  async function handleSubmit() {
    if (!canSubmit) return

    // Non-tailoring types → call waitlist endpoint, then show confirmation
    if (selectedType !== ACTIVE_TYPE) {
      setLoading(true)
      try {
        await joinWaitlist({
          email: ownerEmail,
          businessType: selectedType,
          ...(selectedType === 'other' ? { otherBusinessType: otherDescription.trim() } : {}),
        })
      } catch { /* waitlist failure is non-blocking */ } finally {
        setLoading(false)
      }
      setWaitlistJoined(true)
      return
    }

    // Tailoring → go to dashboard (user is already authenticated from OTP verify)
    sessionStorage.removeItem('ojuowo_signup')
    router.replace('/dashboard')
  }

  const isWaitlist = selectedType !== null && selectedType !== ACTIVE_TYPE
  const nameValid = businessName.trim().length >= 2
  const typeValid = selectedType !== null
  const otherValid = selectedType !== 'other' || otherDescription.trim().length >= 2
  const canSubmit = nameValid && typeValid && otherValid && !loading

  const rawOther = otherDescription.trim()
  const capitalisedOther = rawOther ? rawOther.charAt(0).toUpperCase() + rawOther.slice(1) : ''
  const waitlistTypeName = selectedType === 'other'
    ? capitalisedOther || 'your business type'
    : BUSINESS_TYPES.find(t => t.id === selectedType)?.label ?? 'your business type'

  if (waitlistJoined) {
    return (
      <AuthCard>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(91,76,245,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5L10 17.5L19 8" stroke="#5B4CF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 1.55rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}>
            You&apos;re On The List!
          </h1>

          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.65,
            marginBottom: '32px',
          }}>
            {ownerName ? `Thanks, ${ownerName}. ` : ''}We&apos;re bringing Ojúòwò to{' '}
            <strong style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {waitlistTypeName}
            </strong>{' '}
            businesses soon.{' '}
            <strong style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {businessName.trim()}
            </strong>{' '}
            will be the first to know when it&apos;s ready.
          </p>

          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '50px',
              borderRadius: '9999px',
              background: 'var(--color-accent)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
            }}
          >
            Back to home
          </a>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard stepLabel="Step 2 of 2">
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 4vw, 1.65rem)',
            fontWeight: 700,
            color: '#0D0D0D',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          About Your Business
        </h1>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.9rem', color: '#777', lineHeight: 1.55 }}>
          Tell us a little about what you do.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Business name */}
        <div>
          <label style={labelStyle}>Business Name</label>
          <Input
            placeholder="Your business name"
            value={businessName}
            maxLength={100}
            onChange={(e) => setBusinessName(e.target.value)}
            onBlur={() => { setNameTouched(true); setBusinessName((v) => v.trim()) }}
            disabled={loading}
            aria-invalid={nameError ? true : undefined}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.95rem',
              height: '48px',
              paddingLeft: '16px',
              paddingRight: '16px',
              ...(nameTouched && !nameError && businessName.trim().length >= 2 ? { background: 'var(--color-field-valid-bg)' } : {}),
            }}
          />
          {nameError && (
            <p style={{
              marginTop: '4px',
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.8rem',
              color: 'var(--color-error)',
            }}>
              {nameError}
            </p>
          )}
        </div>

        {/* Business type grid */}
        <div>
          <label style={labelStyle}>What type of business is it?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {BUSINESS_TYPES.map(({ id, label, Icon }) => {
              const isSelected = selectedType === id
              const isActive = id === ACTIVE_TYPE
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTypeSelect(id)}
                  disabled={loading}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '6px',
                    padding: '14px 14px 12px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #5B4CF5' : '1.5px solid #E5E5EA',
                    background: isSelected ? 'rgba(91,76,245,0.05)' : '#FAFAFA',
                    cursor: loading ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'border-color 0.15s, background 0.15s',
                    outline: 'none',
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: isSelected ? '#5B4CF5' : '#555' }}
                    strokeWidth={1.75}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isSelected ? '#5B4CF5' : '#1A1140',
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </span>
                  {!isActive && (
                    <span style={{
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.63rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: isSelected ? '#5B4CF5' : '#AAA',
                    }}>
                      Coming soon
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Other — description input */}
          {selectedType === 'other' && (
            <div style={{ marginTop: '12px' }}>
              <Input
                placeholder="Describe your business type"
                value={otherDescription}
                maxLength={80}
                onChange={(e) => setOtherDescription(e.target.value)}
                disabled={loading}
                autoFocus
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.92rem',
                  height: '46px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
              />
              <p style={{
                marginTop: '6px',
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.78rem',
                color: '#AAA',
              }}>
                e.g. Photography studio, Laundry service, Event planning
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Errors */}
      <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {error && (
          <div
            role="alert"
            style={{
              background: 'var(--color-error-bg)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--color-error)',
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full rounded-full"
          style={{ height: '50px', fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: '0.95rem' }}
        >
          {loading ? 'Setting up...' : selectedType !== null && selectedType !== ACTIVE_TYPE ? 'Join the Waitlist' : 'Get Started'}
        </Button>
      </div>
    </AuthCard>
  )
}
