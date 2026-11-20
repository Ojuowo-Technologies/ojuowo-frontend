'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { AuthCard } from '@/components/auth/auth-card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/api/auth'
import type { ApiError } from '@/lib/types/auth'

const schema = z.object({
  identifier: z.string()
    .min(1, 'Email field cannot be empty'),
  password: z.string()
    .min(1, 'Password field cannot be empty'),
})

type FormValues = z.infer<typeof schema>

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta)',
  fontSize: '0.95rem',
  height: '48px',
  paddingLeft: '16px',
  paddingRight: '16px',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
}

const successBg = { background: 'var(--color-field-valid-bg)' } as const

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function safeRedirect(redirect: string | null): string {
  if (!redirect) return '/dashboard'
  // Prevent open redirect — only allow relative paths that start with / but not //
  if (/^\/[^/]/.test(redirect)) return redirect
  return '/dashboard'
}

// Inner component — isolated so useSearchParams satisfies Next.js Suspense requirement
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const reason = searchParams.get('reason')
  const redirectTo = safeRedirect(searchParams.get('redirect'))

  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverTraceId, setServerTraceId] = useState<string | null>(null)
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [suspended, setSuspended] = useState(false)
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)

  // Countdown ticker for lockout
  useEffect(() => {
    if (!lockedUntil) return
    function tick() {
      const diff = Math.ceil((lockedUntil!.getTime() - Date.now()) / 1000)
      if (diff <= 0) {
        setLockedUntil(null)
        setSecondsLeft(0)
        setServerError(null)
      } else {
        setSecondsLeft(diff)
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [lockedUntil])

  const isLocked = lockedUntil !== null && secondsLeft > 0

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { identifier: '', password: '' },
  })

  const isSubmitting = form.formState.isSubmitting
  const isDisabled = isSubmitting || isLocked
  const watched = form.watch()
  const hasValues = watched.identifier.trim().length > 0 && watched.password.length > 0

  async function onSubmit(values: FormValues) {
    setServerError(null)
    setServerTraceId(null)
    setUnverifiedEmail(null)
    setSuspended(false)

    try {
      const auth = await login({ identifier: values.identifier, password: values.password })
      localStorage.setItem('ojuowo_token', auth.accessToken)
      localStorage.setItem('ojuowo_refresh', auth.refreshToken)
      document.cookie = 'oj_auth=1; path=/; SameSite=Strict; Max-Age=86400'
      let destination = auth.user.role === 'WORKER' ? '/worker' : redirectTo
      if (auth.user.role !== 'WORKER' && !auth.onboarding?.completed) {
        destination = '/dashboard/setup'
      }
      router.replace(destination)
    } catch (err) {
      if (err instanceof TypeError) {
        setServerError('Could not reach the server. Check your internet connection and try again.')
        return
      }
      const e = err as ApiError

      if (e.code === 'INVALID_CREDENTIALS' || e.code === 'ACCOUNT_NOT_FOUND') {
        setServerError('Incorrect email or password.')
        form.setValue('password', '')
      } else if (e.code === 'TOO_MANY_ATTEMPTS') {
        const secs = e.retryAfterSeconds ?? 900
        setLockedUntil(new Date(Date.now() + secs * 1000))
        setSecondsLeft(secs)
        form.setValue('password', '')
      } else if (e.code === 'EMAIL_NOT_VERIFIED') {
        setUnverifiedEmail(values.identifier)
      } else if (e.code === 'ACCOUNT_SUSPENDED') {
        setSuspended(true)
      } else if (e.code === 'BUSINESS_NOT_SETUP') {
        router.replace('/signup/business')
      } else {
        setServerError(e.message ?? 'Something went wrong. Try again.')
        if (e.traceId) setServerTraceId(e.traceId)
      }
    }
  }

  function handlePasswordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    setCapsLockOn(e.getModifierState('CapsLock'))
  }

  function handlePasswordFocus(e: React.FocusEvent<HTMLInputElement>) {
    // Some browsers expose CapsLock on focus via getModifierState
    const native = e.nativeEvent as unknown as { getModifierState?: (key: string) => boolean }
    if (typeof native.getModifierState === 'function') {
      setCapsLockOn(native.getModifierState('CapsLock') ?? false)
    }
  }

  return (
    <AuthCard>
      {/* Session-expired / unauthorized banner */}
      {reason === 'expired' && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '24px',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.875rem',
            color: 'var(--color-warning)',
            lineHeight: 1.5,
          }}
        >
          <AlertTriangle size={16} style={{ marginTop: '1px', flexShrink: 0, color: 'var(--color-warning)' }} />
          <span>Your session expired. Please sign in again.</span>
        </div>
      )}
      {reason === 'unauthorized' && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '24px',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.875rem',
            color: 'var(--color-warning)',
            lineHeight: 1.5,
          }}
        >
          <AlertTriangle size={16} style={{ marginTop: '1px', flexShrink: 0, color: 'var(--color-warning)' }} />
          <span>Sign in to continue.</span>
        </div>
      )}

      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 4vw, 1.65rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          Welcome Back
        </h1>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
          Sign in to your Ojuowo account.
        </p>
      </div>

      {/* Lockout banner */}
      {isLocked && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            background: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '20px',
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.875rem',
            color: 'var(--color-warning)',
            lineHeight: 1.5,
          }}
        >
          <AlertTriangle size={16} style={{ marginTop: '1px', flexShrink: 0, color: 'var(--color-warning)' }} />
          <span>
            Too many failed attempts. Try again in{' '}
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {formatCountdown(secondsLeft)}
            </span>
            .
          </span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <FormField
              control={form.control}
              name="identifier"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      disabled={isDisabled}
                      autoComplete="username"
                      style={{ ...inputStyle, ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                      {...field}
                      onBlur={() => {
                        field.onChange(field.value.trim())
                        field.onBlur()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Password</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Your password"
                        disabled={isDisabled}
                        autoComplete="current-password"
                        style={{ ...inputStyle, paddingRight: '48px', ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                        onKeyDown={handlePasswordKeyDown}
                        onFocus={handlePasswordFocus}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        disabled={isDisabled}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: isDisabled ? 'default' : 'pointer',
                          padding: '4px',
                          color: '#AAA',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </FormControl>
                  {capsLockOn && !showPassword && (
                    <p style={{
                      marginTop: '4px',
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.78rem',
                      color: 'var(--color-warning)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <AlertTriangle size={12} />
                      Caps Lock is on
                    </p>
                  )}
                  <FormMessage />
                  <a
                    href="/login/forgot-password"
                    style={{
                      display: 'block',
                      marginTop: '6px',
                      textAlign: 'right',
                      fontFamily: 'var(--font-jakarta)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                      textDecoration: 'none',
                    }}
                    tabIndex={isDisabled ? -1 : undefined}
                  >
                    Forgot password?
                  </a>
                </FormItem>
              )}
            />

          </div>

          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Unverified email */}
            {unverifiedEmail && (
              <div
                role="alert"
                style={{
                  background: 'var(--color-warning-bg)',
                  border: '1px solid var(--color-warning-border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.875rem',
                  color: 'var(--color-warning)',
                  lineHeight: 1.6,
                }}
              >
                Your account has not been verified. Check your phone for a verification code.
              </div>
            )}

            {/* Account suspended */}
            {suspended && (
              <div
                role="alert"
                style={{
                  background: 'var(--color-error-bg)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-error)',
                  lineHeight: 1.6,
                }}
              >
                Your account has been suspended.{' '}
                <a
                  href="mailto:support@ojuowo.com"
                  style={{ color: 'var(--color-error)', fontWeight: 700 }}
                >
                  Contact support
                </a>{' '}
                for help.
              </div>
            )}

            {/* Generic server error */}
            {serverError && (
              <div
                role="alert"
                style={{
                  background: 'var(--color-error-bg)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-error)',
                  lineHeight: 1.6,
                }}
              >
                {serverError}
                {serverTraceId && (
                  <>
                    {' '}
                    <a
                      href={`mailto:support@ojuowo.com?subject=Error report&body=Trace ID: ${serverTraceId}`}
                      style={{ color: 'var(--color-error)', fontWeight: 700, fontSize: '0.8rem' }}
                    >
                      Report a problem
                    </a>
                  </>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={!hasValues || isDisabled}
              className="w-full rounded-full"
              style={{ height: '50px', fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: '0.95rem' }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </Form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'var(--font-jakarta)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        Don&apos;t have an account?{' '}
        <a href="/signup" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
          Sign up
        </a>
      </p>
    </AuthCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
