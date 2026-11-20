export type SignUpInput = {
  fullName: string
  email: string
  phone: string
  password: string
  verifyChannel: 'PHONE' | 'EMAIL'
  consent: { termsVersion: string; privacyVersion: string }
}

export type LoginInput = {
  identifier: string
  password: string
}

export type WaitlistInput = {
  email: string
  businessType: string
  otherBusinessType?: string
}

export type AuthUser = {
  id: string
  fullName: string
  email: string
  phone: string
  role: 'OWNER' | 'MANAGER' | 'CASHIER' | 'WORKER'
}

export type AuthBusiness = {
  id: string
  name: string
  slug: string
}

export type AuthOnboarding = {
  step: string
  completed: boolean
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: AuthUser
  business: AuthBusiness | null
  onboarding: AuthOnboarding
}

export type SignupInitResponse = {
  signupId: string
}

export type ApiError = {
  code: string
  message: string
  retryAfterSeconds?: number
  traceId?: string
}

export type SignupSessionData = {
  signupId: string
  phone: string
  name: string
  email: string
}
