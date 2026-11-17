'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scissors, Cake, Sparkles, Package, Leaf, LayoutGrid } from 'lucide-react'
import { AuthCard } from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BackButton } from '@/components/auth/back-button'
import { setupBusiness } from '@/lib/api/auth'
import type { ApiError, SignupSessionData } from '@/lib/types/auth'

const BUSINESS_TYPES = [
  { id: 'tailoring',  label: 'Tailoring',      Icon: Scissors,   active: true  },
  { id: 'bakery',     label: 'Bakery',          Icon: Cake,       active: false },
  { id: 'salon',      label: 'Salon',           Icon: Sparkles,   active: false },
  { id: 'shoemaking', label: 'Shoemaking',      Icon: Package,    active: false },
  { id: 'farm',       label: 'Farm',            Icon: Leaf,       active: false },
  { id: 'other',      label: 'Other',           Icon: LayoutGrid, active: false },
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
  const [comingSoonNote, setComingSoonNote] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  function handleTypeSelect(id: string, active: boolean) {
    if (!active) {
      setComingSoonNote(true)
      return
    }
    setComingSoonNote(false)
    setSelectedType(id)
  }

  async function handleSubmit() {
    if (!tempToken || !businessName.trim() || !selectedType) return
    setError(null)
    setLoading(true)
    try {
      const { token } = await setupBusiness(tempToken, {
        businessName: businessName.trim(),
        businessType: selectedType,
      })
      localStorage.setItem('ojuowo_token', token)
      sessionStorage.removeItem('ojuowo_signup')
      router.replace('/dashboard')
    } catch (err) {
      const e = err as ApiError
      setError(e.message ?? 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = businessName.trim().length > 0 && selectedType !== null && !loading

  return (
    <AuthCard step={3}>
      <BackButton href="/signup/verify" label="Back" />

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
            placeholder="e.g. Amaka Couture"
            value={businessName}
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

        {/* Business type */}
        <div>
          <label style={labelStyle}>What type of business is it?</label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}
          >
            {BUSINESS_TYPES.map(({ id, label, Icon, active }) => {
              const isSelected = selectedType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTypeSelect(id, active)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '14px 14px 12px',
                    borderRadius: '12px',
                    border: isSelected
                      ? '2px solid #5B4CF5'
                      : '1.5px solid #E5E5EA',
                    background: isSelected ? 'rgba(91,76,245,0.05)' : '#FAFAFA',
                    cursor: active ? 'pointer' : 'default',
                    textAlign: 'left',
                    transition: 'border-color 0.15s, background 0.15s',
                    opacity: active ? 1 : 0.5,
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: isSelected ? '#5B4CF5' : active ? '#555' : '#AAA' }}
                    strokeWidth={1.75}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isSelected ? '#5B4CF5' : active ? '#1A1140' : '#AAA',
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </span>
                  {!active && (
                    <span
                      style={{
                        fontFamily: 'var(--font-jakarta)',
                        fontSize: '0.68rem',
                        color: '#BBB',
                        fontWeight: 500,
                      }}
                    >
                      Coming soon
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {comingSoonNote && (
            <p
              style={{
                marginTop: '10px',
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.82rem',
                color: '#777',
                lineHeight: 1.5,
              }}
            >
              We are starting with tailors. More business types are coming soon.
            </p>
          )}
        </div>

      </div>

      <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
