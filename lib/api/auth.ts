import { request } from './client'
import type { SignUpInput, AuthSession } from '@/lib/types/auth'

export async function signUp(data: SignUpInput) {
  return request<{ sessionId: string }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function verifyOtp(sessionId: string, code: string) {
  return request<{ tempToken: string }>('/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ sessionId, code }),
    skipAuth: true,
  })
}

export async function resendOtp(sessionId: string) {
  return request<void>('/auth/otp/resend', {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
    skipAuth: true,
  })
}

export async function setPin(tempToken: string, pin: string) {
  return request<AuthSession>('/auth/pin/set', {
    method: 'POST',
    body: JSON.stringify({ pin }),
    skipAuth: true,
    authToken: tempToken,
  })
}
