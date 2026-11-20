/**
 * Dev-only mock API responses.
 * Active when NEXT_PUBLIC_USE_MOCK_API=true in .env.local.
 * Remove this file (and the IS_MOCK guards in each API file) before shipping.
 */

import type { AuthResponse, SignupInitResponse } from '@/lib/types/auth'

export const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

export const mockDelay = (ms = 700) =>
  new Promise<void>((r) => setTimeout(r, ms))

/** Returned by signUp() — triggers OTP verify screen */
export const MOCK_SIGNUP: SignupInitResponse = {
  signupId: 'mock-signup-id',
}

/**
 * Returned by verifyOtp() — any 6-digit code succeeds.
 * onboarding.completed = false → routes to business setup screen.
 */
export const MOCK_VERIFY_AUTH: AuthResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'mock-user-1',
    fullName: 'Tunde Ligali',
    email: 'owner@example.com',
    phone: '8012345678',
    role: 'OWNER',
  },
  business: null,
  onboarding: {
    step: 'BUSINESS_SETUP',
    completed: false,
  },
}

/**
 * Returned by login() — goes straight to dashboard.
 * onboarding.completed = true → skips business setup.
 */
export const MOCK_LOGIN_AUTH: AuthResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'mock-user-1',
    fullName: 'Tunde Ligali',
    email: 'owner@example.com',
    phone: '8012345678',
    role: 'OWNER',
  },
  business: {
    id: 'mock-business-1',
    name: 'S.I.G Clothing',
    slug: 'sigclothing',
  },
  onboarding: {
    step: 'BUSINESS_SETUP',
    completed: false,
  },
}
