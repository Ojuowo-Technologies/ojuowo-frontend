'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthCard } from '@/components/auth/auth-card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { verifyOtp, resendOtp } from '@/lib/api/auth'
import type { ApiError, SignupSessionData } from '@/lib/types/auth'

const RESEND_COOLDOWN = 60

export default function VerifyPage() {
  const router = useRouter()
  const [session, setSession] = useState<SignupSessionData | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN)

  useEffect(() => {
    const raw = sessionStorage.getItem('ojuowo_signup')
    if (!raw) {
      router.replace('/signup')
      return
    }
    try {
      setSession(JSON.parse(raw) as SignupSessionData)
    } catch {
      router.replace('/signup')
    }
  }, [router])

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  const submit = useCallback(
    async (value: string) => {
      if (!session || loading || locked) return
      setError(null)
      setLoading(true)
      try {
        const { tempToken } = await verifyOtp(session.sessionId, value)
        const updated: SignupSessionData = { ...session, tempToken }
        sessionStorage.setItem('ojuowo_signup', JSON.stringify(updated))
        router.push('/signup/pin')
      } catch (err) {
        const e = err as ApiError & { attemptsLeft?: number }
        setCode('')
        if (e.code === 'OTP_EXPIRED') {
          setError('Code expired. Request a new one.')
          setCooldown(0)
        } else if (e.code === 'TOO_MANY_ATTEMPTS') {
          setLocked(true)
          setError('Too many wrong attempts. Go back and try again.')
        } else if (e.code === 'INVALID_OTP') {
          const left = e.attemptsLeft ?? null
          setError(
            left !== null
              ? `Incorrect code. ${left} attempt${left === 1 ? '' : 's'} left.`
              : 'Incorrect code.',
          )
        } else {
          setError(e.message ?? 'Something went wrong. Try again.')
        }
      } finally {
        setLoading(false)
      }
    },
    [session, loading, locked, router],
  )

  useEffect(() => {
    if (code.length === 6) void submit(code)
  }, [code, submit])

  async function handleResend() {
    if (!session || cooldown > 0) return
    try {
      await resendOtp(session.sessionId)
      setCooldown(RESEND_COOLDOWN)
      setError(null)
      toast.success('Code resent')
    } catch (err) {
      const e = err as ApiError
      toast.error(e.message ?? 'Could not resend. Try again.')
    }
  }

  return (
    <AuthCard step={2}>
      <div style={{ marginBottom: '32px' }}>
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
          Check your phone
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.9rem',
            color: '#777',
            lineHeight: 1.55,
          }}
        >
          We sent a 6-digit code to{' '}
          <span style={{ color: '#0D0D0D', fontWeight: 600 }}>
            {session?.phone ?? '...'}
          </span>
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
        <InputOTP
          maxLength={6}
          value={code}
          onChange={setCode}
          disabled={loading || locked}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            background: '#FFF1F2',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.88rem',
            color: '#C0152A',
            lineHeight: 1.5,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
        {!locked && (
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: cooldown > 0 ? '#AAA' : '#5B4CF5',
              background: 'none',
              border: 'none',
              cursor: cooldown > 0 ? 'default' : 'pointer',
              padding: '8px 0',
            }}
          >
            {cooldown > 0
              ? `Resend code in 0:${String(cooldown).padStart(2, '0')}`
              : 'Resend code'}
          </button>
        )}

        <a
          href="/signup"
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.85rem',
            color: '#777',
            textDecoration: 'none',
          }}
        >
          Wrong number? Go back
        </a>
      </div>
    </AuthCard>
  )
}
