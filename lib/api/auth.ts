import { request } from './client'
import { IS_MOCK, mockDelay, MOCK_SIGNUP, MOCK_VERIFY_AUTH, MOCK_LOGIN_AUTH } from './mock'
import type { SignUpInput, LoginInput, WaitlistInput, AuthResponse, SignupInitResponse } from '@/lib/types/auth'

export async function signUp(data: SignUpInput) {
  if (IS_MOCK) { await mockDelay(); return MOCK_SIGNUP }
  return request<SignupInitResponse>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function verifyOtp(signupId: string, code: string) {
  if (IS_MOCK) { await mockDelay(); return MOCK_VERIFY_AUTH }
  return request<AuthResponse>('/api/v1/auth/signup/verify', {
    method: 'POST',
    body: JSON.stringify({ signupId, code }),
    skipAuth: true,
  })
}

export async function resendOtp(signupId: string) {
  if (IS_MOCK) { await mockDelay(400); return }
  return request<void>('/api/v1/auth/signup/resend', {
    method: 'POST',
    body: JSON.stringify({ signupId }),
    skipAuth: true,
  })
}

export async function login(data: LoginInput) {
  if (IS_MOCK) { await mockDelay(); return MOCK_LOGIN_AUTH }
  return request<AuthResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function requestPasswordReset(identifier: string, channel: 'PHONE' | 'EMAIL' = 'PHONE') {
  if (IS_MOCK) { await mockDelay(400); return { resetId: 'mock-reset-id' } }
  return request<{ resetId: string }>('/api/v1/auth/password/forgot', {
    method: 'POST',
    body: JSON.stringify({ identifier, channel }),
    skipAuth: true,
  })
}

export async function joinWaitlist(data: WaitlistInput) {
  if (IS_MOCK) { await mockDelay(400); return }
  return request<void>('/api/public/waitlist', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}
