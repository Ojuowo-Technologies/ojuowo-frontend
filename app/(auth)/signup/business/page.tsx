'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scissors, Cake, Sparkles, Package, Leaf, LayoutGrid } from 'lucide-react'
import { AuthCard } from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { setupBusiness } from '@/lib/api/auth'
import type { ApiError, SignupSessionData } from '@/lib/types/auth'

const BUSINESS_TYPES = [
  { id: 'tailoring',  label: 'Tailoring',   Icon: Scissors   },
  { id: 'baking',     label: 'Baking',       Icon: Cake       },
  { id: 'salon',      label: 'Salon',        Icon: Sparkles   },
  { id: 'shoemaking', label: 'Shoemaking',   Icon: Package    },
  { id: 'farming',    label: 'Farming',      Icon: Leaf       },
  { id: 'other',      label: 'Other',        Icon: LayoutGrid },
]

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-jakarta)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: '8px',
}

export default function BusinessPage() {
  const router = useRouter()
  const [tempToken, setTempToken] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [otherDescription, setOtherDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('ojuowo_signup')
    if (!raw) { router.replace('/signup'); return }
    try {
      const parsed = JSON.parse(raw) as SignupSessionData
      if (!parsed.tempToken) { router.replace('/signup'); return }
      setTempToken(parsed.tempToken)
    } catch {
      router.replace('/signup')
    }
  }, [router])

  function handleTypeSelect(id: string) {
    setSelectedType(id)
    setError(null)
    if (id !== 'other') setOtherDescription('')
  }

  async function handleSubmit() {
    if (!tempToken || !canSubmit) return
    setError(null)
    setSessionExpired(false)
    setLoading(true)

    const resolvedType =
      selectedType === 'other' ? otherDescription.trim() : selectedType!

    try {
      const { token } = await setupBusiness(tempToken, {
        businessName: businessName.trim(),
        businessType: resolvedType,
      })
      localStorage.setItem('ojuowo_token', token)
      sessionStorage.removeItem('ojuowo_signup')
      router.replace('/dashboard')
    } catch (err) {
      const e = err as ApiError
      if (e.code === 'TOKEN_EXPIRED' || e.code === 'UNAUTHORIZED') {
        setSessionExpired(true)
      } else {
        setError(e.message ?? 'Something went wrong. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const nameValid = businessName.trim().length >= 2
  const typeValid = selectedType !== null
  const otherValid = selectedType !== 'other' || otherDescription.trim().length >= 2
  const canSubmit = nameValid && typeValid && otherValid && !loading

  return (
    <AuthCard step={3}>
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
            disabled={loading}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.95rem',
              height: '48px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          />
        </div>

        {/* Business type grid */}
        <div>
          <label style={labelStyle}>What type of business is it?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {BUSINESS_TYPES.map(({ id, label, Icon }) => {
              const isSelected = selectedType === id
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
                    gap: '8px',
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
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
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
        {sessionExpired && (
          <div
            role="alert"
            style={{
              background: '#FFF7ED',
              borderRadius: '10px',
              padding: '12px 16px',
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#92400E',
              lineHeight: 1.5,
            }}
          >
            Your session expired.{' '}
            <a
              href="/signup/verify"
              style={{ color: '#B45309', fontWeight: 700, textDecoration: 'underline' }}
            >
              Go back to re-verify your number.
            </a>
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              background: '#FFF1F2',
              borderRadius: '10px',
              padding: '12px 16px',
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#C0152A',
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
          {loading ? 'Setting up...' : 'Get Started'}
        </Button>
      </div>
    </AuthCard>
  )
}
