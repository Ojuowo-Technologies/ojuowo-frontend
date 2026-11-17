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
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect x="0" width="7" height="14" fill="#008751" />
      <rect x="7" width="6" height="14" fill="#FFFFFF" />
      <rect x="13" width="7" height="14" fill="#008751" />
    </svg>
  )
}

const schema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().regex(/^0?[789][01]\d{8}$/, 'Enter a valid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9!@#$%^&*()_\-+=]/, 'Include at least one number or symbol'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
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
  color: '#333',
}

export default function SignupPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      const { sessionId } = await signUp({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      sessionStorage.setItem(
        'ojuowo_signup',
        JSON.stringify({ sessionId, phone: values.phone, name: values.name }),
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
    watched.confirmPassword.length >= 8

  return (
    <AuthCard step={1}>
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
          Create Your Account
        </h1>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.9rem', color: '#777', lineHeight: 1.55 }}>
          Start managing your business on Ojuowo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Amaka Johnson" disabled={isSubmitting} style={inputStyle} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      style={inputStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
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
                        style={{ ...inputStyle, paddingLeft: '100px' }}
                        {...field}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Password</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 8 characters"
                        disabled={isSubmitting}
                        style={{ ...inputStyle, paddingRight: '48px' }}
                        autoComplete="new-password"
                        {...field}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Confirm Password</FormLabel>
                  <FormControl>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        disabled={isSubmitting}
                        style={{ ...inputStyle, paddingRight: '48px' }}
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
            {serverError && (
              <div
                role="alert"
                style={{
                  background: '#FFF1F2',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#C0152A',
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

      <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'var(--font-jakarta)', fontSize: '0.85rem', color: '#777' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#5B4CF5', fontWeight: 600, textDecoration: 'none' }}>
          Log in
        </a>
      </p>
    </AuthCard>
  )
}
