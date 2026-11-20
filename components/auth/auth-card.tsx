import { Logo } from '@/components/ui/logo'

export function AuthCard({
  children,
  stepLabel,
}: {
  children: React.ReactNode
  stepLabel?: string
}) {
  return (
    <div>
      <div className="auth-logo-mobile" style={{ justifyContent: 'center', marginBottom: '28px' }}>
        <a href="/" aria-label="Go to Ojuowo home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <Logo variant="default" />
        </a>
      </div>

      {stepLabel && (
        <p
          style={{
            fontFamily: 'var(--font-jakarta)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#5B4CF5',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '20px',
          }}
          aria-label={stepLabel}
        >
          {stepLabel}
        </p>
      )}

      {children}
    </div>
  )
}
