'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/ui/logo'
import { FadeUp, StaggerContainer, StaggerItem } from './animate'

const customerMessages = [
  { name: 'Fatima', initial: 'F', text: 'Is it ready? I need it this weekend 🙏', time: '9:41 AM',  avatarBg: '#E8E0FF', avatarColor: '#5B4CF5' },
  { name: 'Amaka',  initial: 'A', text: 'Did you receive my payment?',             time: '10:08 AM', avatarBg: '#FCE7F3', avatarColor: '#DB2777' },
  { name: 'Chidi',  initial: 'C', text: 'When exactly will it be ready?',          time: '11:22 AM', avatarBg: '#DCFCE7', avatarColor: '#16A34A' },
  { name: 'Tunde',  initial: 'T', text: 'What is left on my balance?',             time: '1:05 PM',  avatarBg: '#FEF3C7', avatarColor: '#D97706' },
]

const teamMessages = [
  { name: 'Emeka', initial: 'E', text: 'Boss I handled 6 orders, not 5.',         time: '9:50 AM',  avatarBg: '#FEF3C7', avatarColor: '#D97706' },
  { name: 'Bisi',  initial: 'B', text: 'Which spec did you use for order #14?',   time: '10:30 AM', avatarBg: '#E8E0FF', avatarColor: '#5B4CF5' },
  { name: 'Taiwo', initial: 'T', text: 'Have not started the last job yet.',       time: '12:17 PM', avatarBg: '#DCFCE7', avatarColor: '#16A34A' },
]

function CustomerCard({ msg }: { msg: typeof customerMessages[0] }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      marginBottom: '10px',
    }}>
      <div style={{
        width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
        background: msg.avatarBg, color: msg.avatarColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-jakarta)',
      }}>
        {msg.initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: msg.avatarColor, fontFamily: 'var(--font-jakarta)', marginBottom: '2px' }}>
          {msg.name}
        </div>
        <p style={{ fontSize: '0.84rem', color: '#1a1a2e', fontFamily: 'var(--font-jakarta)', margin: 0, lineHeight: 1.4 }}>
          {msg.text}
        </p>
      </div>
      <div style={{ fontSize: '0.6rem', color: '#ccc', fontFamily: 'var(--font-jakarta)', flexShrink: 0 }}>
        {msg.time}
      </div>
    </div>
  )
}

function TeamCard({ msg }: { msg: typeof teamMessages[0] }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      marginBottom: '10px',
    }}>
      <div style={{
        width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
        background: msg.avatarBg, color: msg.avatarColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-jakarta)',
      }}>
        {msg.initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: msg.avatarColor, fontFamily: 'var(--font-jakarta)', marginBottom: '2px' }}>
          {msg.name}
        </div>
        <p style={{ fontSize: '0.84rem', color: '#1a1a2e', fontFamily: 'var(--font-jakarta)', margin: 0, lineHeight: 1.4 }}>
          {msg.text}
        </p>
      </div>
      <div style={{ fontSize: '0.6rem', color: '#ccc', fontFamily: 'var(--font-jakarta)', flexShrink: 0 }}>
        {msg.time}
      </div>
    </div>
  )
}

export function PainPoints() {
  return (
    <section aria-label="The problem" style={{ padding: '80px 12px', maxWidth: '1320px', margin: '0 auto' }}>
      <div className="pain-grid">

        {/* Left — each text block staggers in */}
        <StaggerContainer>
          <StaggerItem>
            <span style={{
              display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
              color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.12em',
              marginBottom: '20px', fontFamily: 'var(--font-jakarta)',
            }}>
              Sound familiar?
            </span>
          </StaggerItem>
          <StaggerItem>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#0D0D0D',
              lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '20px',
            }}>
              You&apos;re The System.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p style={{
              fontFamily: 'var(--font-jakarta)', fontSize: '1rem',
              color: '#666', lineHeight: 1.7, marginBottom: '32px',
            }}>
              Customers are chasing you for updates. Staff are asking questions you&apos;ve already answered.
              Payments are somewhere in a notebook. And the only place it all lives is in your head.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#5B4CF5', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#555', fontFamily: 'var(--font-jakarta)' }}>From your customers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#D97706', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#555', fontFamily: 'var(--font-jakarta)' }}>From your team</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Right — card fades in, then each message staggers */}
        <FadeUp delay={0.18}>
          <div style={{
            background: '#F2F2F7',
            border: '1.5px solid rgba(255,255,255,0.88)',
            borderRadius: '28px',
            boxShadow: '5px 5px 16px rgba(0,0,0,0.09), -2px -2px 8px rgba(255,255,255,0.72), inset 0 1px 0 rgba(255,255,255,0.45)',
            padding: '28px 24px 24px',
          }}>

            <div className="chat-wall-grid" style={{ marginBottom: '20px' }}>
              {/* Customer column */}
              <StaggerContainer>
                <StaggerItem>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-jakarta)', marginBottom: '12px' }}>
                    Customers
                  </div>
                </StaggerItem>
                {customerMessages.map((msg) => (
                  <StaggerItem key={msg.name}>
                    <CustomerCard msg={msg} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Team column */}
              <StaggerContainer>
                <StaggerItem>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-jakarta)', marginBottom: '12px' }}>
                    Your team
                  </div>
                </StaggerItem>
                {teamMessages.map((msg) => (
                  <StaggerItem key={msg.name}>
                    <TeamCard msg={msg} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', marginBottom: '20px' }} />

            {/* Owner "You" */}
            <FadeUp delay={0.1}>
              <div style={{
                background: 'rgba(91,76,245,0.07)',
                border: '1.5px dashed #5B4CF5',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                  background: '#5B4CF5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  🤯
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-jakarta)', marginBottom: '4px' }}>
                    You
                  </div>
                  <p style={{
                    fontSize: '0.98rem', fontWeight: 700, color: '#3730a3',
                    fontFamily: 'var(--font-display)', margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em',
                  }}>
                    &ldquo;Where do I even keep a record of all this?&rdquo;
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </FadeUp>

      </div>

      {/* Solution reveal — full-width answer card */}
      <StaggerContainer>
      <div
        className="pain-solution-card"
        style={{
          marginTop: '48px',
          position: 'relative',
          background: 'linear-gradient(135deg, #5B4CF5 0%, #3A2DB5 60%, #1A1140 100%)',
          borderRadius: '28px',
          overflow: 'hidden',
        }}
      >
        {/* Watermark — desktop & tablet only, hidden on mobile via CSS */}
        <div className="solution-watermark" style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.06,
          pointerEvents: 'none',
        }}>
          <LogoMark color="#FFFFFF" size={320} />
        </div>

        {/* Left — logo */}
        <StaggerItem>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <LogoMark color="#FFFFFF" size={22} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.3rem', color: '#FFFFFF', letterSpacing: '-0.02em',
          }}>
            Ojúòwò
          </span>
        </div>
        </StaggerItem>

        {/* Center — headline + sub */}
        <StaggerItem>
        <div className="pain-solution-text">
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.4vw, 1.75rem)', color: '#FFFFFF',
            lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '10px',
          }}>
            Ojúòwò Becomes The System.
          </h3>
          <p style={{
            fontFamily: 'var(--font-jakarta)', fontSize: '0.92rem',
            color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0,
          }}>
            The eyes of your business. Orders, staff, payments and customer tracking
            in one place, so it stops living in your head.
          </p>
        </div>
        </StaggerItem>

        {/* Right — CTA */}
        <StaggerItem>
        <a
          href="/signup"
          className={cn(buttonVariants({ variant: 'default' }), 'cta-btn rounded-full h-auto pain-solution-cta')}
          style={{
            fontFamily: 'var(--font-jakarta)', fontWeight: 700,
            fontSize: '0.95rem', padding: '14px 32px',
            backgroundColor: '#FFFFFF', color: '#1A1140',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Get started for free
        </a>
        </StaggerItem>
      </div>
      </StaggerContainer>
    </section>
  )
}
