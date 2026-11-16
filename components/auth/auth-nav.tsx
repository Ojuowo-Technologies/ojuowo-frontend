'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/components/ui/logo'

export function AuthNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        backgroundColor: scrolled ? 'rgba(240,240,244,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(91,76,245,0.1)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <a
          href="/"
          aria-label="Go to Ojuowo home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '16px',
          }}
        >
          <Logo />
        </a>
      </div>
    </header>
  )
}
