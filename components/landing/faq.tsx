'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FadeUp, StaggerContainer, StaggerItem } from './animate'

const faqs = [
  {
    q: 'Do my workers need their own smartphones?',
    a: 'Yes, but nothing expensive. Workers use a lightweight phone app to see their assigned tasks and update job status. Any Android or iPhone works. The app is small, fast, and works without internet, so your team stays on track even with patchy data.',
  },
  {
    q: 'Do my customers need to create an account or install anything?',
    a: 'Not at all. Customers track their orders through a private link you send on WhatsApp. No login, no app download, no password. They just tap the link and see exactly where their order is.',
  },
  {
    q: 'What happens if my staff are offline?',
    a: 'Your staff never lose their work, even without internet. They open the app, see their tasks, and mark things done. Everything syncs when they reconnect.',
  },
  {
    q: 'How much does it cost?',
    a: 'We will announce our pricing before we charge anything, and you will always get advance notice. No surprises.',
  },
  {
    q: 'How is Ojúòwò different from just using WhatsApp and spreadsheets?',
    a: "WhatsApp and spreadsheets do not talk to each other. When a customer asks for an update, you have to check the spreadsheet, find the row, then reply on WhatsApp. Ojúòwò keeps everything in one place: the order, the worker's task, the payment record, the customer link. The update is already there.",
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. Your data is fully protected. We never sell it, share it, or use it for advertising. You can take it with you or delete it anytime.',
  },
  {
    q: 'What if I need help setting it up?',
    a: 'We walk you through it when you join. You will not be left to figure it out on your own.',
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      style={{
        padding: '80px 12px',
        maxWidth: '1320px',
        margin: '0 auto',
        scrollMarginTop: '100px',
      }}
    >
      <FadeUp><div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#5B4CF5',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '16px',
            fontFamily: 'var(--font-jakarta)',
          }}
        >
          Questions
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.71vw, 3.25rem)',
            color: '#0D0D0D',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
          }}
        >
          What Business Owners Ask Us
        </h2>
      </div></FadeUp>

      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <StaggerContainer>
        <Accordion>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
            <AccordionItem
              value={`item-${i}`}
              className="faq-item"
              style={{
                background: '#F2F2F7',
                border: '1.5px solid rgba(255,255,255,0.88)',
                borderRadius: '16px',
                marginBottom: '10px',
                boxShadow:
                  '5px 5px 16px rgba(0,0,0,0.07), -2px -2px 8px rgba(255,255,255,0.72), inset 0 1px 0 rgba(255,255,255,0.45)',
                overflow: 'hidden',
              }}
            >
              <AccordionTrigger
                style={{
                  padding: '20px 24px',
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#0D0D0D',
                  textAlign: 'left',
                  borderBottom: 'none',
                }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  padding: '0 24px 20px',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: '#555',
                }}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
            </StaggerItem>
          ))}
        </Accordion>
        </StaggerContainer>
      </div>
    </section>
  )
}
