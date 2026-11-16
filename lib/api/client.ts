import type { ApiError } from '@/lib/types/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ojuowo_token')
}

export async function request<T>(
  path: string,
  options?: RequestInit & { skipAuth?: boolean; authToken?: string },
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

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ojuowo_token')
      window.location.href = '/login'
    }
  }

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      code: 'UNKNOWN',
      message: 'Something went wrong. Try again.',
    }))
    throw error
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}
