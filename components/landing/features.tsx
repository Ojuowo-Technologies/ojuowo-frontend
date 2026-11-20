'use client'

import { Check, ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FadeUp } from './animate'

// ─── Shared card style ────────────────────────────────────────────────────────

const CARD = {
  background: '#F2F2F7',
  border: '1.5px solid rgba(255,255,255,0.88)',
  borderRadius: '24px',
  boxShadow: '5px 5px 16px rgba(0,0,0,0.09), -2px -2px 8px rgba(255,255,255,0.78), inset 0 1px 0 rgba(255,255,255,0.45)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  overflow: 'hidden' as const,
  display: 'flex' as const,
  flexDirection: 'column' as const,
}

const HOVER_ON  = '8px 8px 28px rgba(0,0,0,0.12), -3px -3px 12px rgba(255,255,255,0.88), inset 0 1px 0 rgba(255,255,255,0.5)'
const HOVER_OFF = CARD.boxShadow

function hoverOn(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget as HTMLDivElement
  el.style.transform = 'translateY(-5px)'
  el.style.boxShadow = HOVER_ON
}
function hoverOff(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget as HTMLDivElement
  el.style.transform = 'translateY(0)'
  el.style.boxShadow = HOVER_OFF
}

// ─── Card footer (tag + title + body) ────────────────────────────────────────

function CardFooter({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div style={{ padding: '28px' }}>
      <span style={{
        display: 'inline-block', fontSize: '0.65rem', fontWeight: 700,
        color: '#5B4CF5', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
        marginBottom: '7px', fontFamily: 'var(--font-jakarta)',
      }}>
        {tag}
      </span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem',
        color: '#0D0D0D', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3,
      }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: '0.875rem', lineHeight: 1.65, color: '#666', margin: 0, minHeight: '70px' }}>
        {body}
      </p>
    </div>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(0,0,0,0.055)', flexShrink: 0 }} />
}

// ─── Illustration: One Link For The Customer ──────────────────────────────────

function IllustrationTracking() {
  return (
    <div style={{ padding: '28px', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
    <div className="tracking-layout">
      {/* Left — message bubble */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: '#FFFFFF', borderRadius: '14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '0.56rem', fontWeight: 800, color: '#fff' }}>SB</span>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-jakarta)' }}>Sunrise Bakery</div>
              <div style={{ fontSize: '0.58rem', color: '#888', fontFamily: 'var(--font-jakarta)' }}>Business</div>
            </div>
          </div>

          <div style={{ background: '#DCF8C6', borderRadius: '10px 10px 10px 2px', padding: '10px 12px', marginBottom: '8px' }}>
            <p style={{ fontSize: '0.74rem', color: '#0D0D0D', fontFamily: 'var(--font-jakarta)', margin: 0, lineHeight: 1.5 }}>
              Hi Amaka! Your order is confirmed. Track it here
            </p>
          </div>

          {/* Link chip — fully rounded to match brand */}
          <div style={{
            background: 'rgba(91,76,245,0.07)', border: '1px solid rgba(91,76,245,0.15)',
            borderRadius: '99px', padding: '7px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
          }}>
            <span style={{ fontSize: '0.62rem', color: '#5B4CF5', fontWeight: 600, fontFamily: 'var(--font-jakarta)' }}>ojuowo.com/track/amaka-021</span>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#5B4CF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowUpRight size={8} style={{ color: '#fff' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Arrow — horizontal on desktop, vertical on mobile */}
      <div className="tracking-arrow-h"><ArrowRight size={18} /></div>
      <div className="tracking-arrow-v"><ArrowDown size={18} /></div>

      {/* Right — customer tracking view */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: '#FFFFFF', borderRadius: '14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '16px 18px',
        }}>
          <div style={{ fontSize: '0.6rem', color: '#888', fontFamily: 'var(--font-jakarta)', marginBottom: '4px' }}>Your order</div>
          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0D0D0D', fontFamily: 'var(--font-display)', marginBottom: '16px', letterSpacing: '-0.01em' }}>Amaka · #021</div>

          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <div style={{ position: 'absolute', top: '7px', left: '8px', right: '8px', height: '2px', background: '#EBEBF2' }} />
            <div style={{ position: 'absolute', top: '7px', left: '8px', width: '65%', height: '2px', background: '#5B4CF5' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              {['Received', 'In Work', 'Ready', 'Done'].map((s, i) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: i < 2 ? '#5B4CF5' : '#fff',
                    border: i < 2 ? 'none' : i === 2 ? '2px solid #5B4CF5' : '2px solid #DDD',
                    boxShadow: i < 2 ? '0 0 0 2px #FFFFFF' : 'none',
                  }} />
                  <span style={{ fontSize: '0.5rem', color: i <= 2 ? '#5B4CF5' : '#AAA', fontFamily: 'var(--font-jakarta)', fontWeight: i === 1 ? 700 : 500 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.04)', borderRadius: '8px', padding: '8px 10px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 500, color: '#888', fontFamily: 'var(--font-jakarta)' }}>Ready Dec 18. Updates automatically.</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

// ─── Illustration: Workers On Their Phones ────────────────────────────────────

function IllustrationWorkers() {
  const tasks = [
    { initial: 'E', name: 'Emeka', task: 'Prepare Birthday Cake',  status: 'Done',        statusBg: '#DCFCE7', statusColor: '#16A34A', avatarBg: '#FEF3C7', avatarColor: '#D97706' },
    { initial: 'B', name: 'Bisi',  task: 'Style Knotless Braids', status: 'In Progress', statusBg: 'rgba(91,76,245,0.1)', statusColor: '#5B4CF5', avatarBg: '#E8E0FF', avatarColor: '#5B4CF5' },
    { initial: 'T', name: 'Taiwo', task: 'Sole Replacement',      status: 'Pending',     statusBg: '#FEF3C7', statusColor: '#D97706', avatarBg: '#DCFCE7', avatarColor: '#16A34A' },
  ]
  return (
    <div style={{ padding: '28px', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-jakarta)', marginBottom: '4px' }}>
        Staff tasks today
      </div>
      {tasks.map((t) => (
        <div key={t.initial} style={{
          background: '#FFFFFF', borderRadius: '12px', padding: '11px 14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.avatarBg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 800, color: t.avatarColor, fontFamily: 'var(--font-jakarta)' }}>
            {t.initial}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-jakarta)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.task}</div>
            <div style={{ fontSize: '0.6rem', color: '#888', fontFamily: 'var(--font-jakarta)' }}>{t.name}</div>
          </div>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, background: t.statusBg, color: t.statusColor, padding: '3px 8px', borderRadius: '99px', fontFamily: 'var(--font-jakarta)', flexShrink: 0 }}>
            {t.status}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Illustration: Invoices That Lock ────────────────────────────────────────

function IllustrationInvoices() {
  return (
    <div style={{ padding: '28px', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px' }}>
      {/* V1 — superseded */}
      <div style={{
        background: 'rgba(0,0,0,0.04)', borderRadius: '14px', padding: '14px 16px',
        border: '1.5px solid rgba(0,0,0,0.07)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '0.62rem', color: '#AAA', fontFamily: 'var(--font-jakarta)', marginBottom: '2px' }}>Invoice #021 · v1</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#AAA', fontFamily: 'var(--font-display)', textDecoration: 'line-through' }}>₦85,000</div>
          </div>
          <span style={{ fontSize: '0.58rem', fontWeight: 700, background: 'rgba(0,0,0,0.07)', color: '#AAA', padding: '3px 8px', borderRadius: '6px', fontFamily: 'var(--font-jakarta)' }}>
            Old version
          </span>
        </div>
        <div style={{ fontSize: '0.62rem', color: '#CCC', fontFamily: 'var(--font-jakarta)' }}>Amaka O. · Dec 10, 2024</div>
        {/* Strike overlay */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1.5px', background: 'rgba(0,0,0,0.12)', transform: 'rotate(-1deg)' }} />
      </div>

      {/* V2 — active, locked */}
      <Card
        className="ring-0 [display:block] rounded-[14px]"
        style={{ padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '0.62rem', color: '#888', fontFamily: 'var(--font-jakarta)', marginBottom: '2px' }}>Invoice #021 · v2</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-display)' }}>₦90,000</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.58rem', fontWeight: 700, background: 'rgba(22,163,74,0.1)', color: '#16A34A', padding: '4px 10px', borderRadius: '99px', fontFamily: 'var(--font-jakarta)' }}>
            <Check size={10} strokeWidth={3} />
            Sent
          </span>
        </div>
        <div style={{ fontSize: '0.62rem', color: '#888', fontFamily: 'var(--font-jakarta)' }}>Amaka O. · Dec 15, 2024 · Current version</div>
      </Card>
    </div>
  )
}

// ─── Illustration: Pay Calculated For You ─────────────────────────────────────

function IllustrationWages() {
  const workers = [
    { initial: 'E', name: 'Emeka', tasks: 12, amount: '₦18,000', avatarBg: '#FEF3C7', avatarColor: '#D97706' },
    { initial: 'B', name: 'Bisi',  tasks: 9,  amount: '₦13,500', avatarBg: '#E8E0FF', avatarColor: '#5B4CF5' },
    { initial: 'T', name: 'Taiwo', tasks: 7,  amount: '₦10,500', avatarBg: '#DCFCE7', avatarColor: '#16A34A' },
  ]
  return (
    <div style={{ padding: '28px', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card className="ring-0 overflow-hidden rounded-[16px]" style={{ padding: 0, gap: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {/* Table header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-display)' }}>Staff Pay Summary</span>
          <span style={{ fontSize: '0.62rem', color: '#888', background: 'rgba(0,0,0,0.05)', borderRadius: '6px', padding: '3px 8px', fontFamily: 'var(--font-jakarta)' }}>December</span>
        </div>

        {/* Column labels */}
        <div style={{ padding: '8px 18px', display: 'grid', gridTemplateColumns: '1fr 60px 72px', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
          {['Staff', 'Tasks', 'Pay'].map(h => (
            <span key={h} style={{ fontSize: '0.58rem', fontWeight: 700, color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-jakarta)' }}>{h}</span>
          ))}
        </div>

        {/* Worker rows */}
        {workers.map((w, i) => (
          <div key={w.initial} style={{
            padding: '10px 18px', display: 'grid', gridTemplateColumns: '1fr 60px 72px', gap: '8px', alignItems: 'center',
            borderBottom: i < workers.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: w.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.56rem', fontWeight: 800, color: w.avatarColor, flexShrink: 0, fontFamily: 'var(--font-jakarta)' }}>{w.initial}</div>
              <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#0D0D0D', fontFamily: 'var(--font-jakarta)' }}>{w.name}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#666', fontFamily: 'var(--font-jakarta)' }}>{w.tasks} tasks</span>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0D0D0D', fontFamily: 'var(--font-jakarta)' }}>{w.amount}</span>
          </div>
        ))}

        {/* Totals row */}
        <div style={{
          padding: '11px 18px', background: 'rgba(91,76,245,0.05)', borderTop: '1.5px solid rgba(91,76,245,0.1)',
          display: 'grid', gridTemplateColumns: '1fr 60px 72px', gap: '8px', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5B4CF5', fontFamily: 'var(--font-jakarta)' }}>Total</span>
          <span style={{ fontSize: '0.72rem', color: '#5B4CF5', fontFamily: 'var(--font-jakarta)' }}>28</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#5B4CF5', fontFamily: 'var(--font-jakarta)' }}>₦42,000</span>
        </div>
      </Card>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Features() {
  return (
    <section
      id="features"
      aria-label="Features"
      style={{
        padding: '80px 12px',
        maxWidth: '1320px',
        margin: '0 auto',
        scrollMarginTop: '100px',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative' }}>

        {/* Section header */}
        <FadeUp><div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
            color: '#5B4CF5', textTransform: 'uppercase', letterSpacing: '0.12em',
            marginBottom: '16px', fontFamily: 'var(--font-jakarta)',
          }}>
            What you get
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2rem, 3.71vw, 3.25rem)', color: '#0D0D0D',
            lineHeight: 1.15, letterSpacing: '-0.025em',
          }}>
            The Tools Your Business<br />
            Has Been Missing.
          </h2>
        </div></FadeUp>

        {/* Bento grid — 5-column base, diagonal wide/narrow pattern */}
        <div className="features-bento">

          {/* Card 1 — wide (3/5) top-left */}
          <motion.div
            className="bento-card-1"
            style={{ ...CARD }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.72, ease: [0.25, 1, 0.35, 1], delay: 0.05 }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <IllustrationTracking />
            <Divider />
            <CardFooter
              tag="Customer Tracking"
              title="One Link For The Customer"
              body="Share a WhatsApp link. The customer follows their order, stage by stage. No login, no app, no calls to you."
            />
          </motion.div>

          {/* Card 2 — narrow (2/5) top-right */}
          <motion.div
            className="bento-card-2"
            style={{ ...CARD }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.72, ease: [0.25, 1, 0.35, 1], delay: 0.18 }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <IllustrationWorkers />
            <Divider />
            <CardFooter
              tag="Worker App"
              title="Workers On Their Phones"
              body="Staff see only their assigned tasks. They update status, attach photos and mark work done, right from their phones."
            />
          </motion.div>

          {/* Card 3 — narrow (2/5) bottom-left */}
          <motion.div
            className="bento-card-3"
            style={{ ...CARD }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.72, ease: [0.25, 1, 0.35, 1], delay: 0.12 }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <IllustrationInvoices />
            <Divider />
            <CardFooter
              tag="Invoicing"
              title="Invoices That Can't Be Tampered With"
              body="Generate an invoice, send it and it stays exactly as sent. Changes create a new version."
            />
          </motion.div>

          {/* Card 4 — wide (3/5) bottom-right */}
          <motion.div
            className="bento-card-4"
            style={{ ...CARD }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.72, ease: [0.25, 1, 0.35, 1], delay: 0.25 }}
            onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          >
            <IllustrationWages />
            <Divider />
            <CardFooter
              tag="Staff Pay"
              title="Pay Calculated For You"
              body="Set a rate per task. Every approved task adds to the total. See exactly what you owe each staff member before you pay."
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
