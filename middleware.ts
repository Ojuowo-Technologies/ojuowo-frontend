import { NextRequest, NextResponse } from 'next/server'

/*
  Auth routing:
  - `oj_auth` cookie is a client-set routing signal (not the actual token).
    It is set by the browser after a successful login or signup completion.
    The real bearer token lives in localStorage.
  - Protected routes (/dashboard, /worker) → redirect to /login if no cookie.
  - Auth entry points (/login, /signup) → redirect to /dashboard if already authed.
  - Signup sub-steps (/signup/verify, /signup/business, etc.) are always accessible
    so users can complete an in-progress flow.
  - Public routes (/, /track/*, /terms, /privacy) need no cookie.
*/

const PROTECTED = ['/dashboard', '/worker']
const AUTH_ENTRY = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthed = request.cookies.has('oj_auth')

  // Redirect unauthenticated users away from protected routes
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!isAuthed) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from login / signup root
  if (AUTH_ENTRY.includes(pathname) && isAuthed) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/worker/:path*',
    '/login',
    '/signup',
  ],
}
