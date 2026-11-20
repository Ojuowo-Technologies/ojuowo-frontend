import type { ApiError } from '@/lib/types/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

type ApiEnvelope<T> = {
  success: boolean
  message: string
  code?: string
  traceId?: string
  retryAfterSeconds?: number
  data: T
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ojuowo_token')
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ojuowo_refresh')
}

function clearTokens() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('ojuowo_token')
  localStorage.removeItem('ojuowo_refresh')
  document.cookie = 'oj_auth=; path=/; SameSite=Strict; Max-Age=0'
}

async function tryRefresh(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) return false
    const body: ApiEnvelope<{ accessToken: string; refreshToken: string }> = await res.json()
    if (!body.success || !body.data) return false
    localStorage.setItem('ojuowo_token', body.data.accessToken)
    localStorage.setItem('ojuowo_refresh', body.data.refreshToken)
    return true
  } catch {
    return false
  }
}

export async function request<T>(
  path: string,
  options?: RequestInit & { skipAuth?: boolean; authToken?: string; _retry?: boolean },
): Promise<T> {
  if (!BASE_URL) {
    throw {
      code: 'API_NOT_CONFIGURED',
      message: 'The backend API is not connected yet. Set NEXT_PUBLIC_API_URL in .env.local.',
    } satisfies ApiError
  }

  const token = options?.authToken ?? (options?.skipAuth ? null : getToken())

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (res.status === 401 && !options?.skipAuth && !options?._retry) {
    const refreshed = await tryRefresh()
    if (refreshed) {
      return request<T>(path, { ...options, _retry: true })
    }
    clearTokens()
    if (typeof window !== 'undefined') {
      window.location.href = '/login?reason=expired'
    }
    throw { code: 'SESSION_EXPIRED', message: 'Your session expired. Please sign in again.' } satisfies ApiError
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const apiErr: ApiError = {
      code: body?.code ?? 'UNKNOWN',
      message: body?.message ?? 'Something went wrong. Try again.',
      traceId: body?.traceId,
      retryAfterSeconds: body?.retryAfterSeconds,
    }
    throw apiErr
  }

  if (res.status === 204) return undefined as T

  const body: ApiEnvelope<T> = await res.json()
  return body.data
}
