import { Toaster } from '@/components/ui/sonner'
import { AuthBrandPanel } from '@/components/auth/auth-brand-panel'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Left brand panel — hidden on mobile via CSS class in globals.css */}
        <div className="auth-brand-side">
          <AuthBrandPanel />
        </div>

        {/* Right form panel */}
        <div
          className="auth-form-side"
          style={{
            flex: 1,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <div style={{ width: '100%', maxWidth: '460px' }}>
            {children}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  )
}
