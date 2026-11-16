'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^(\+?234|0)[789][01]\d{8}$/,
      'Enter a valid Nigerian phone number',
    ),
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

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      const { sessionId } = await signUp(values)
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
        form.setError('phone', {
          message: 'An account with this number exists. Log in instead.',
        })
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
    watched.phone.trim().length > 0

  return (
    <>
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
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.9rem',
            color: '#777',
            lineHeight: 1.55,
          }}
        >
          Start managing your business on Ojuowo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Fields — tighter spacing between them */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={labelStyle}>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amaka Johnson"
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
                    <Input
                      type="tel"
                      placeholder="08012345678"
                      disabled={isSubmitting}
                      style={inputStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Error + button — more breathing room below the fields */}
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
              style={{
                height: '50px',
                fontFamily: 'var(--font-jakarta)',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {isSubmitting ? 'Continuing...' : 'Continue'}
            </Button>
          </div>
        </form>
      </Form>

      <p
        style={{
          textAlign: 'center',
          marginTop: '24px',
          fontFamily: 'var(--font-jakarta)',
          fontSize: '0.85rem',
          color: '#777',
        }}
      >
        Already have an account?{' '}
        <a
          href="/login"
          style={{
            color: '#5B4CF5',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Log in
        </a>
      </p>
    </AuthCard>
    </>
  )
}
