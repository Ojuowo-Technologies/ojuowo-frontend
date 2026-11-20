import { Nav } from '@/components/landing/nav'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Privacy Policy | Ojuowo',
  description: 'Learn how Ojuowo collects, uses, and protects your data under the Nigeria Data Protection Act 2023.',
}

const EFFECTIVE_DATE = 'January 1, 2025'
const COMPANY_NAME = '[COMPANY NAME LIMITED]'
const COMPANY_EMAIL = 'privacy@ojuowo.com'

const sections = [
  {
    id: 'introduction',
    heading: '1. Introduction',
    body: `${COMPANY_NAME} ("we", "us", or "our") operates the Ojuowo platform. This Privacy Policy explains what information we collect, why we collect it, and how we handle it.

This Policy reflects our obligations under the Nigeria Data Protection Act 2023 (NDPA).

This Policy applies to two groups of people: business owners and their staff who create accounts on the platform, and the end customers of those businesses who check their order status through a tracking link.

Questions about this Policy can be directed to our Privacy Officer at ${COMPANY_EMAIL}.`,
  },
  {
    id: 'what-we-collect',
    heading: '2. Information We Collect',
    body: `When you register, we collect your full name, email address, phone number, and details about your business including its name, type, location, and size.

When a business owner invites staff, we collect each staff member's name and phone number. Staff set their own PIN when they log in for the first time on a new device.

Businesses may enter their customers' names, phone numbers, and body measurements to manage orders. We store this information on behalf of the business. We do not collect it directly from customers.

We store order details, task records, invoice history, and payment records. Payment amounts are saved in kobo, Nigeria's smallest currency unit. We do not store full card details.

When a business sends a customer a tracking link, we generate and store a secure token with at least 128 bits of randomness. We log when that link is accessed.

We collect usage data about how the platform is used, including IP addresses, browser type, pages visited, and actions taken. This is used for security monitoring and product improvement only.`,
  },
  {
    id: 'how-we-use',
    heading: '3. How We Use Your Information',
    body: `We use the information we collect to run the Service:
- Deliver and maintain the platform.
- Process subscription payments and issue billing receipts.
- Send account notifications such as email verification and password reset links.
- Respond to support requests you raise with us.
- Monitor for security incidents and unauthorized access.
- Meet our obligations under Nigerian law.

We do not use your data for advertising. We do not sell it. We do not use it, or your customers' data, to train any machine learning model.`,
  },
  {
    id: 'body-measurements',
    heading: '4. Body Measurement Data',
    body: `Body measurement data entered into Ojuowo by a business (for example, by a tailor) relates to that business's customers. This is sensitive personal data under the NDPA.

We store it exclusively on behalf of the business. We do not access, process, or use it for any purpose other than displaying it back within that business's account.

Businesses are responsible for obtaining any necessary consent from their customers before entering measurement data into the platform, and for handling that data in accordance with the NDPA.

Measurement data recorded for a specific order is locked at the moment of order confirmation. Changes to a customer's saved measurements do not alter historical order records.`,
  },
  {
    id: 'sharing',
    heading: '5. How We Share Information',
    body: `We rely on two categories of service provider. Vercel hosts the platform's infrastructure in the United States. A licensed payment processor handles subscription billing. Both access only the data they need to do their job and are contractually required to handle it securely. We put appropriate safeguards in place for any data that moves outside Nigeria.

We may disclose your data if ordered to by a Nigerian court or required by a regulatory authority.

If we merge with or are acquired by another company, your data may transfer as part of that transaction. We will notify you before your data moves under a different privacy policy.

We do not share your data with anyone else without your explicit consent.`,
  },
  {
    id: 'retention',
    heading: '6. Data Retention',
    body: `We keep your account data for as long as your account is active. If you cancel, we keep it for 30 days so you can export it. After 30 days, it is permanently deleted.

Payment and transaction records may be kept for up to 7 years as required under Nigerian financial regulations.

Accounts that have had no login activity for 24 consecutive months will receive an email notice and 30 days to log in before being permanently deleted.`,
  },
  {
    id: 'security',
    heading: '7. Security',
    body: `Here is what we do to protect your data:
- All data travels over HTTPS (TLS 1.2 or higher).
- Passwords are hashed before storage. We never store them in plain text.
- Staff PINs are hashed the same way.
- Customer tracking tokens contain at least 128 bits of randomness and are not derived from any order number or predictable identifier.
- Access to production systems is limited to authorized personnel.

We cannot guarantee that our systems will never be breached. If a breach occurs that affects your personal data, we will notify you and the NDPC within the timeframe required under the NDPA.`,
  },
  {
    id: 'your-rights',
    heading: '8. Your Rights Under the NDPA',
    body: `Under the Nigeria Data Protection Act 2023, you have these rights:
- Access: request a copy of the personal data we hold about you.
- Correction: ask us to fix inaccurate or incomplete data.
- Deletion: ask us to delete your personal data, subject to any legal retention requirements.
- Objection: object to how we are processing your data in certain circumstances.
- Portability: request your data in a structured, machine-readable format.

Write to us at ${COMPANY_EMAIL} to exercise any of these rights. We will respond within 30 days.

If our response does not satisfy you, you may file a complaint with the Nigeria Data Protection Commission (NDPC).`,
  },
  {
    id: 'cookies',
    heading: '9. Cookies and Local Storage',
    body: `The Ojuowo web application uses browser local storage to hold your authentication token and certain preferences. We do not use third-party tracking cookies.

The marketing site (ojuowo.com) does not use cookies or analytics scripts that follow individual visitors across websites.`,
  },
  {
    id: 'children',
    heading: '10. Children',
    body: `The Service is not for anyone under 18. We do not knowingly collect personal data from children. If you believe a child has submitted data to us, write to ${COMPANY_EMAIL} and we will delete it promptly.`,
  },
  {
    id: 'changes',
    heading: '11. Changes to This Policy',
    body: `When we make material changes to this Policy, we will notify you by email or through a notice in the Service at least 14 days before those changes take effect.

The effective date at the top of this page reflects the most recent update.`,
  },
  {
    id: 'contact',
    heading: '12. Contact',
    body: `To reach our Privacy Officer:

${COMPANY_NAME}
Email: ${COMPANY_EMAIL}

To file a formal complaint, contact the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng.`,
  },
]

function renderBlock(block: string, key: number) {
  const lines = block.split('\n').filter((l) => l.length > 0)

  if (lines.every((l) => l.startsWith('- '))) {
    return (
      <ul key={key} style={{ paddingLeft: '20px', marginTop: 0, marginBottom: '14px' }}>
        {lines.map((l, j) => (
          <li key={j} style={{ marginBottom: '5px' }}>
            {l.slice(2)}
          </li>
        ))}
      </ul>
    )
  }

  if (lines.length >= 2 && !lines[0].startsWith('- ') && lines.slice(1).every((l) => l.startsWith('- '))) {
    return (
      <div key={key} style={{ marginBottom: '14px' }}>
        <p style={{ margin: '0 0 8px 0' }}>{lines[0]}</p>
        <ul style={{ paddingLeft: '20px', marginTop: 0, marginBottom: 0 }}>
          {lines.slice(1).map((l, j) => (
            <li key={j} style={{ marginBottom: '5px' }}>
              {l.slice(2)}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <p key={key} style={{ marginBottom: '14px' }}>
      {lines.join(' ')}
    </p>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            paddingLeft: 'max(24px, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(24px, env(safe-area-inset-right, 0px))',
          }}
        >
          <div style={{ marginBottom: '48px' }}>
            <p
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#5B4CF5',
                marginBottom: '12px',
              }}
            >
              Legal
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: 700,
                color: '#0D0D0D',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.95rem',
                color: '#777',
                lineHeight: 1.6,
              }}
            >
              Effective date: {EFFECTIVE_DATE}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#0D0D0D',
                    letterSpacing: '-0.01em',
                    marginBottom: '14px',
                  }}
                >
                  {section.heading}
                </h2>
                <div
                  style={{
                    fontFamily: 'var(--font-jakarta)',
                    fontSize: '0.95rem',
                    color: '#444',
                    lineHeight: 1.75,
                  }}
                >
                  {section.body.split('\n\n').map((block, i) => renderBlock(block, i))}
                </div>
              </section>
            ))}
          </div>

          <div
            style={{
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid #E5E5EA',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-jakarta)',
                fontSize: '0.875rem',
                color: '#AAA',
                lineHeight: 1.6,
              }}
            >
              See also:{' '}
              <a href="/terms" style={{ color: '#5B4CF5', textDecoration: 'none', fontWeight: 600 }}>
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
