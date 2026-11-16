export type SignUpInput = {
  name: string
  email: string
  phone: string
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
