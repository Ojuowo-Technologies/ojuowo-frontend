'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavLink { label: string; href: string; cta?: boolean }

const links: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: "Who it's for", href: '#who-its-for' },
  { label: 'FAQs',    href: '#faq' },
]

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="4" x2="4"  y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    setScrolled(window.scrollY > 20)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
          backgroundColor: scrolled ? 'rgba(240, 240, 244, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(91,76,245,0.1)' : '1px solid transparent',
        }}
      >
        <div
          className="nav-inner"
          style={{ maxWidth: '1320px', margin: '0 auto' }}
        >
          <a
            href="#"
            aria-label="Ojúòwò Home"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
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

          {/* Desktop nav links — skip the CTA item, it has its own button */}
          <nav className="nav-links-row">
            {links.filter(l => !l.cta).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:bg-[rgba(91,76,245,0.08)] focus-visible:text-[#5B4CF5] transition-all"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#444',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  transition: 'color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#5B4CF5'
                  el.style.backgroundColor = 'rgba(91,76,245,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#444'
                  el.style.backgroundColor = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="nav-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="/login"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2',
              )}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '12px 24px',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
              }}
            >
              Log in
            </a>
            <a
              href="/signup"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'cta-btn rounded-full h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4CF5] focus-visible:ring-offset-2',
              )}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '12px 26px',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
              }}
            >
              Get started for free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon />
          </button>
        </div>
      </motion.header>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10,8,30,0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 98,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '300px',
          backgroundColor: '#F7F7FF',
          zIndex: 99,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '24px',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))',
          paddingLeft: '24px',
          paddingRight: 'max(24px, env(safe-area-inset-right, 0px))',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.14)',
        }}
      >
        {/* Panel header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <a
            href="#"
            onClick={closeMenu}
            aria-label="Ojúòwò Home"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Logo />
          </a>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.08)',
              backgroundColor: 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#444',
              flexShrink: 0,
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, alignItems: 'center' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#333',
                textDecoration: 'none',
                padding: '14px 32px',
                borderRadius: '12px',
                textAlign: 'center',
                width: '100%',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#5B4CF5'
                el.style.backgroundColor = 'rgba(91,76,245,0.06)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = '#333'
                el.style.backgroundColor = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            onClick={closeMenu}
            className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full h-auto')}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '14px 20px',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '12px',
              width: '100%',
            }}
          >
            Log in
          </a>
          <a
            href="/signup"
            onClick={closeMenu}
            className={cn(buttonVariants({ variant: 'default' }), 'cta-btn rounded-full h-auto')}
            style={{
              fontFamily: 'var(--font-jakarta)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '14px 20px',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '4px',
              width: '100%',
            }}
          >
            Get started for free
          </a>
        </nav>
      </div>
    </>
  )
}
