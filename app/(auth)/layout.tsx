import { Toaster } from '@/components/ui/sonner'
import { AuthNav } from '@/components/auth/auth-nav'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthNav />
      <div
        style={{
          minHeight: '100vh',
          background: '#F0F0F4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '88px 16px 32px',
          position: 'relative',
        }}
      >
        <div
          className="dot-grid"
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(240,240,244,0.5) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '460px' }}>
          {children}
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  )
}
