export type SignUpInput = {
  name: string
  email: string
  phone: string
  password: string
}

export type BusinessSetupInput = {
  businessName: string
  businessType: string
}

export type AuthSession = {
  token: string
  role: 'owner' | 'manager' | 'cashier' | 'worker'
}

export type ApiError = {
  code: string
  message: string
}

export type SignupSessionData = {
  sessionId: string
  phone: string
  name: string
  tempToken?: string
}
