'use client'

import { ArrowLeftIcon } from 'lucide-react'

export function BackButton({ href, label = 'Back' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-jakarta)',
        fontSize: '0.88rem',
        fontWeight: 600,
        color: '#555',
        textDecoration: 'none',
        marginBottom: '16px',
        padding: '6px 2px',
        borderRadius: '8px',
        transition: 'color 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#5B4CF5' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#555' }}
    >
      <ArrowLeftIcon size={15} strokeWidth={2.5} />
      {label}
    </a>
  )
}
