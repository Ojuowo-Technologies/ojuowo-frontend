import { request } from './client'
import type { SignUpInput, AuthSession } from '@/lib/types/auth'

const DEV_MODE = !process.env.NEXT_PUBLIC_API_URL

export async function signUp(data: SignUpInput) {
  if (DEV_MODE) return { sessionId: 'dev-session' }
  return request<{ sessionId: string }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  })
}

export async function verifyOtp(sessionId: string, code: string) {
  if (DEV_MODE) {
    if (code === '000000') {
      throw { code: 'INVALID_OTP', message: 'Incorrect code.', attemptsLeft: 4 }
    }
    return { tempToken: 'dev-temp-token' }
  }
  return request<{ tempToken: string }>('/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ sessionId, code }),
    skipAuth: true,
  })
}

export async function resendOtp(sessionId: string) {
  if (DEV_MODE) return
  return request<void>('/auth/otp/resend', {
    method: 'POST',
    body: JSON.stringify({ sessionId }),
    skipAuth: true,
  })
}

export async function setPin(tempToken: string, pin: string) {
  if (DEV_MODE) return { token: 'dev-jwt', role: 'owner' } satisfies AuthSession
  return request<AuthSession>('/auth/pin/set', {
    method: 'POST',
    body: JSON.stringify({ pin }),
    skipAuth: true,
    authToken: tempToken,
  })
}
