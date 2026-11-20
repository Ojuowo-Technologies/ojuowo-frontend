'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
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
import { signUp } from '@/lib/api/auth'
import type { ApiError } from '@/lib/types/auth'

function NigerianFlag() {
  return (
    <span
      style={{
        display: 'inline-flex',
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        border: '1px solid rgba(0,0,0,0.08)',
      }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect x="0" width="6" height="18" fill="#008751" />
        <rect x="6" width="6" height="18" fill="#FFFFFF" />
        <rect x="12" width="6" height="18" fill="#008751" />
      </svg>
    </span>
  )
}

const schema = z
  .object({
    name: z.string()
      .min(1, 'Full Name field cannot be empty')
      .regex(/^[a-zA-Z\s'-]+$/, 'Name Must Use Only Letters')
      .refine(
        (val) => val.trim().split(/\s+/).filter(Boolean).length >= 2,
        'Enter your first and last name',
      ),
    email: z.string()
      .min(1, 'Email Address field cannot be empty')
      .email('Enter a valid email address'),
    phone: z.string()
      .min(1, 'Phone Number field cannot be empty')
      .regex(/^[789][01]\d{8}$/, 'Enter a valid Nigerian phone number'),
    password: z.string()
      .min(1, 'Password field cannot be empty')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Include at least one lowercase letter')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9]/, 'Include at least one number')
      .regex(/[!@#$%^&*()\-_+=<>?]/, 'Include at least one special character'),
    confirmPassword: z.string()
      .min(1, 'Confirm Password field cannot be empty'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

const PASSWORD_REQS: { label: string; met: (v: string) => boolean }[] = [
  { label: 'Minimum of 8 characters',              met: (v) => v.length >= 8 },
  { label: 'Contains a lowercase letter',           met: (v) => /[a-z]/.test(v) },
  { label: 'Contains an uppercase letter',          met: (v) => /[A-Z]/.test(v) },
  { label: 'Contains a number',                     met: (v) => /[0-9]/.test(v) },
  { label: 'Contains a special character (#@>^)',   met: (v) => /[!@#$%^&*()\-_+=<>?]/.test(v) },
]

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

export default function SignupPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      const { signupId } = await signUp({
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        verifyChannel: 'PHONE',
        consent: { termsVersion: '1.0', privacyVersion: '1.0' },
      })
      sessionStorage.setItem(
        'ojuowo_signup',
        JSON.stringify({ signupId, phone: values.phone, name: values.name, email: values.email }),
      )
      router.push('/signup/verify')
    } catch (err) {
      if (err instanceof TypeError) {
        setServerError('Could not reach the server. Check your internet connection and try again.')
        return
      }
      const e = err as ApiError
      if (e.code === 'PHONE_TAKEN') {
        form.setError('phone', { message: 'An account with this number exists. Log in instead.' })
      } else if (e.code === 'EMAIL_TAKEN') {
        form.setError('email', { message: 'This email is already in use.' })
      } else if (e.code === 'RATE_LIMITED') {
        setServerError('Too many attempts. Please wait a few minutes and try again.')
      } else {
        setServerError(e.message ?? 'Something went wrong. Try again.')
      }
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const watched = form.watch()
  const hasAllValues =
    watched.name.trim().length > 0 &&
    watched.email.trim().length > 0 &&
    watched.phone.trim().length > 0 &&
    watched.password.length >= 8 &&
    watched.confirmPassword.length >= 8 &&
    termsAccepted

  return (
    <AuthCard stepLabel="Step 1 of 2">
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
          Create Your Account
        </h1>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
          Start managing your business on Ojuowo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amaka Johnson"
                      disabled={isSubmitting}
                      autoComplete="name"
                      style={{ ...inputStyle, ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        const val = e.target.value
                        const hasInvalidChars = val.length > 0 && /[^a-zA-Z\s'-]/.test(val)
                        const currentError = form.formState.errors.name?.message
                        if (hasInvalidChars) {
                          void form.trigger('name')
                        } else if (currentError === 'Name Must Use Only Letters') {
                          form.clearErrors('name')
                        }
                      }}
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
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="amaka@example.com"
                      disabled={isSubmitting}
                      autoComplete="email"
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
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Phone Number</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          left: '1px',
                          top: '1px',
                          bottom: '1px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          paddingLeft: '14px',
                          paddingRight: '12px',
                          background: '#F5F5F8',
                          borderRight: '1px solid #E5E5EA',
                          borderRadius: '7px 0 0 7px',
                          fontFamily: 'var(--font-jakarta)',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          color: '#555',
                          userSelect: 'none',
                          zIndex: 1,
                          pointerEvents: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <NigerianFlag />
                        <span>+234</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="8012345678"
                        disabled={isSubmitting}
                        autoComplete="tel-national"
                        maxLength={10}
                        style={{ ...inputStyle, paddingLeft: '100px', ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                        {...field}
                        onChange={(e) => {
                          const stripped = e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 10)
                          field.onChange(stripped)
                        }}
                      />
                    </div>
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
                        placeholder="At least 8 characters"
                        disabled={isSubmitting}
                        style={{ ...inputStyle, paddingRight: '48px', ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                        autoComplete="new-password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          if (form.getFieldState('confirmPassword').isTouched) {
                            void form.trigger('confirmPassword')
                          }
                        }}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => { setPasswordFocused(false); field.onBlur() }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
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
                  {passwordFocused && (
                    (() => {
                      const unmet = PASSWORD_REQS.filter(r => !r.met(field.value))
                      return unmet.length > 0 ? (
                        <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {unmet.map((r) => (
                            <li
                              key={r.label}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                fontFamily: 'var(--font-jakarta)',
                                fontSize: '0.78rem',
                                color: 'var(--color-error)',
                                lineHeight: 1.3,
                              }}
                            >
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-error)', flexShrink: 0, display: 'inline-block' }} />
                              {r.label}
                            </li>
                          ))}
                        </ul>
                      ) : null
                    })()
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Confirm Password</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        disabled={isSubmitting}
                        style={{ ...inputStyle, paddingRight: '48px', ...(fieldState.isTouched && !fieldState.error && field.value.length > 0 ? successBg : {}) }}
                        autoComplete="new-password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          color: '#AAA',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label
              htmlFor="terms"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.82rem',
                color: '#555',
                lineHeight: 1.5,
              }}
            >
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                disabled={isSubmitting}
                style={{ marginTop: '2px', width: 15, height: 15, flexShrink: 0, accentColor: '#5B4CF5', cursor: 'pointer' }}
              />
              <span>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                  Privacy Policy
                </a>
              </span>
            </label>

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
                  lineHeight: 1.5,
                }}
              >
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              disabled={!hasAllValues || isSubmitting}
              className="w-full rounded-full"
              style={{ height: '50px', fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: '0.95rem' }}
            >
              {isSubmitting ? 'Continuing...' : 'Continue'}
            </Button>
          </div>
        </form>
      </Form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'var(--font-jakarta)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
          Log in
        </a>
      </p>
    </AuthCard>
  )
}
