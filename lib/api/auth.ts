import { request } from './client'
import type { SignUpInput, LoginInput, WaitlistInput, AuthResponse, SignupInitResponse } from '@/lib/types/auth'

export async function signUp(data: SignUpInput) {
  return request<SignupInitResponse>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function verifyOtp(signupId: string, code: string) {
  return request<AuthResponse>('/api/v1/auth/signup/verify', {
    method: 'POST',
    body: JSON.stringify({ signupId, code }),
    skipAuth: true,
  })
}

export async function resendOtp(signupId: string) {
  return request<void>('/api/v1/auth/signup/resend', {
    method: 'POST',
    body: JSON.stringify({ signupId }),
    skipAuth: true,
  })
}

export async function login(data: LoginInput) {
  return request<AuthResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function requestPasswordReset(identifier: string, channel: 'PHONE' | 'EMAIL' = 'PHONE') {
  return request<{ resetId: string }>('/api/v1/auth/password/forgot', {
    method: 'POST',
    body: JSON.stringify({ identifier, channel }),
    skipAuth: true,
  })
}

export async function joinWaitlist(data: WaitlistInput) {
  return request<void>('/api/public/waitlist', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}
