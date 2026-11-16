'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { setPin as savePin } from '@/lib/api/auth'
import type { ApiError, SignupSessionData } from '@/lib/types/auth'

const WEAK_PINS = new Set([
  '000000', '111111', '222222', '333333', '444444',
  '555555', '666666', '777777', '888888', '999999',
  '123456', '654321', '012345', '234567', '345678',
  '456789', '567890',
])

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-jakarta)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: '8px',
}

const pinInputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta)',
  height: '48px',
  paddingLeft: '16px',
  paddingRight: '16px',
  fontSize: '1.4rem',
  textAlign: 'center',
  letterSpacing: '0.4em',
}

export default function PinPage() {
  const router = useRouter()
  const [tempToken, setTempToken] = useState<string | null>(null)
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('ojuowo_signup')
    if (!raw) {
      router.replace('/signup')
      return
    }
    try {
      const parsed = JSON.parse(raw) as SignupSessionData
      if (!parsed.tempToken) {
        router.replace('/signup')
        return
      }
      setTempToken(parsed.tempToken)
    } catch {
      router.replace('/signup')
    }
  }, [router])

  async function handleSubmit() {
    setError(null)
    if (pin.length < 6) {
      setError('Enter a 6-digit PIN.')
      return
    }
    if (WEAK_PINS.has(pin)) {
      setError('Choose a stronger PIN. Avoid sequential or repeated digits.')
      return
    }
    if (pin !== confirmPin) {
      setError('PINs do not match.')
      return
    }
    if (!tempToken) return

    setLoading(true)
    try {
      const { token } = await savePin(tempToken, pin)
      localStorage.setItem('ojuowo_token', token)
      sessionStorage.removeItem('ojuowo_signup')
      router.replace('/dashboard')
    } catch (err) {
      const e = err as ApiError
      setPin('')
      setConfirmPin('')
      setError(e.message ?? 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = pin.length === 6 && confirmPin.length === 6 && !loading

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
          Set Your PIN
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.9rem',
            color: '#777',
            lineHeight: 1.55,
          }}
        >
          You will use this to log in on this device.
        </p>
      </div>

      {/* Fields — same 16px gap as signup screen */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>PIN</label>
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="••••••"
            disabled={loading}
            style={pinInputStyle}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label style={labelStyle}>Confirm PIN</label>
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="••••••"
            disabled={loading}
            style={pinInputStyle}
            autoComplete="new-password"
          />
        </div>
      </div>

      {/* Error + button — same 28px gap as signup screen */}
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
          style={{
            height: '50px',
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}
        >
          {loading ? 'Setting up...' : 'Finish setup'}
        </Button>
      </div>
    </AuthCard>
  )
}
