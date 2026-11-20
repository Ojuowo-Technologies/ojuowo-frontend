'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
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
import { requestPasswordReset } from '@/lib/api/auth'
import type { ApiError } from '@/lib/types/auth'

const schema = z.object({
  email: z.string().min(1, 'Enter your email address').email('Enter a valid email address'),
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

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const isSubmitting = form.formState.isSubmitting
  const watched = form.watch()
  const hasValue = watched.email.trim().length > 0

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      await requestPasswordReset(values.email)
      setSubmitted(true)
    } catch (err) {
      if (err instanceof TypeError) {
        setServerError('Could not reach the server. Check your internet connection and try again.')
        return
      }
      const e = err as ApiError
      // Always show the same success message regardless of whether the email exists (security)
      if (e.code === 'API_NOT_CONFIGURED') {
        setSubmitted(true)
        return
      }
      setServerError(e.message ?? 'Something went wrong. Try again.')
    }
  }

  if (submitted) {
    return (
      <AuthCard>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(91,76,245,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 11.5L9 16.5L18 7" stroke="#5B4CF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 4vw, 1.55rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            Check Your Email
          </h1>
          <p style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}>
            If that email is registered, we sent a reset link. Check your inbox and spam folder.
          </p>
          <a
            href="/login"
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowLeft size={15} />
            Back to Sign In
          </a>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <a
        href="/login"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-jakarta)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--color-accent)',
          textDecoration: 'none',
          marginBottom: '28px',
        }}
      >
        <ArrowLeft size={14} />
        Back to Sign In
      </a>

      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 4vw, 1.55rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          Reset Your Password
        </h1>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
          Enter the email you signed up with and we will send you a reset link.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="amaka@example.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                    style={inputStyle}
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

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              disabled={!hasValue || isSubmitting}
              className="w-full rounded-full"
              style={{ height: '50px', fontFamily: 'var(--font-jakarta)', fontWeight: 700, fontSize: '0.95rem' }}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}
