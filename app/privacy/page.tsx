import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export const metadata: Metadata = {
  title: 'Privacy Policy — Ojúòwò',
  description: 'How Ojúòwò collects, uses and protects your personal information.',
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    heading: 'What we collect',
    body: 'When you join the waitlist, we collect your email address and your business type. Nothing else. No name, no phone number, no payment details.',
  },
  {
    heading: 'Why we collect it',
    body: 'We use your email address solely to contact you about Ojúòwò: to let you know when early access opens and to send product updates relevant to your business type. We do not use it for advertising or any unrelated purpose.',
  },
  {
    heading: 'Who we share it with',
    body: 'We do not sell, rent or trade your personal information to any third party. We may use a third-party email delivery provider to send you messages, but that provider acts only on our instructions and cannot use your data for their own purposes.',
  },
  {
    heading: 'How long we keep it',
    body: 'We keep your waitlist entry until you ask us to remove it, or until we determine that the waitlist is no longer active. You can ask us to delete your data at any time by emailing us.',
  },
  {
    heading: 'Your rights',
    body: 'You can ask us to view, correct or delete the information we hold about you at any time. To do so, email us at the address below. We will respond within 7 days.',
  },
  {
    heading: 'Contact',
    body: 'If you have any questions about this policy, email us at hello@ojuowo.com.',
  },
]

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
    }}>

      {/* Nav bar */}
      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        padding: '0 24px',
        height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <Logo />
        </Link>
        <Link
          href="/#waitlist"
          style={{
            fontFamily: 'var(--font-jakarta)', fontWeight: 600,
            fontSize: '0.88rem', color: '#5B4CF5',
            textDecoration: 'none',
          }}
        >
          Join the waitlist →
        </Link>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.68rem', fontWeight: 700,
            color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.12em',
            marginBottom: '16px', fontFamily: 'var(--font-jakarta)',
          }}>
            Legal
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            color: '#0D0D0D', lineHeight: 1.15, letterSpacing: '-0.025em',
            marginBottom: '12px',
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#AAA' }}>
            Last updated: January 2026
          </p>
        </div>

        {/* Intro */}
        <p style={{
          fontSize: '1rem', color: '#555', lineHeight: 1.75,
          marginBottom: '48px',
        }}>
          This page explains what information we collect when you join the Ojúòwò waitlist,
          why we collect it, and how we protect it.
        </p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {SECTIONS.map(({ heading, body }) => (
            <div key={heading}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.1rem', color: '#0D0D0D',
                letterSpacing: '-0.015em', marginBottom: '10px',
              }}>
                {heading}
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.75 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-jakarta)', fontWeight: 600,
              fontSize: '0.9rem', color: '#5B4CF5', textDecoration: 'none',
            }}
          >
            ← Back to home
          </Link>
        </div>

      </div>
    </main>
  )
}
