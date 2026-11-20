import { Nav } from '@/components/landing/nav'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Terms of Service | Ojuowo',
  description: 'Read the terms and conditions that govern your use of the Ojuowo platform.',
}

const EFFECTIVE_DATE = 'January 1, 2025'
const COMPANY_NAME = '[COMPANY NAME LIMITED]'
const COMPANY_EMAIL = 'legal@ojuowo.com'

const sections = [
  {
    id: 'introduction',
    heading: '1. Introduction',
    body: `These Terms of Service ("Terms") govern your access to and use of the Ojuowo platform, including our web application, mobile progressive web app, and any related services (collectively, the "Service"), operated by ${COMPANY_NAME} ("we", "us", or "our"), a company registered in the Federal Republic of Nigeria.

By creating an account or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of a business, you represent that you have authority to bind that business to these Terms.

Do not use the Service if you do not agree to these Terms.`,
  },
  {
    id: 'eligibility',
    heading: '2. Eligibility',
    body: `To use Ojuowo, you must meet all of the following conditions:
- You are at least 18 years old.
- You are the owner or an authorized representative of a business.
- You have not been previously suspended or removed from the Service.
- You will provide accurate, complete information when creating your account.

The Service is for businesses. It is not a personal tool.`,
  },
  {
    id: 'accounts',
    heading: '3. Accounts',
    body: `When you create an account, you are responsible for keeping your login credentials secure. Do not share your password or PIN with anyone who is not an authorized staff member of your business.

You are responsible for all activity that occurs under your account, including actions taken by staff members you invite to the platform.

Contact us at ${COMPANY_EMAIL} immediately if you suspect unauthorized access to your account.

We may suspend or terminate accounts that have been compromised or are being used in violation of these Terms.`,
  },
  {
    id: 'subscription',
    heading: '4. Subscription and Billing',
    body: `Ojuowo offers a free trial of 14 days from the date you complete account setup. No payment information is required to start the trial.

After the trial period, continued use of the Service requires a paid subscription. Fees are charged in Nigerian Naira (NGN) on a recurring basis, monthly or annually, depending on the plan you select.

All fees are non-refundable except where required by Nigerian law. We will give you at least 7 days' notice before any price change takes effect.

If you do not pay your subscription fees, we may suspend your access until payment is made. After 30 days of non-payment, we may terminate your account and schedule your data for deletion under our retention policy.`,
  },
  {
    id: 'acceptable-use',
    heading: '5. Acceptable Use',
    body: `You may use the Service only for lawful business purposes. You must not:
- Use the Service in a way that violates any Nigerian law, including the Nigeria Data Protection Act 2023 (NDPA).
- Use customer data you collect through the platform for any purpose other than managing your business operations.
- Attempt to gain unauthorized access to any part of the Service or its infrastructure.
- Send unsolicited messages to customers using data stored in the platform.
- Reverse-engineer, decompile, or attempt to extract the source code of the Service.
- Resell or sublicense the Service to any third party without our written consent.
- Upload content that is illegal, defamatory, or infringes someone else's intellectual property.

If we determine a violation has occurred, we may suspend or terminate your account without prior notice.`,
  },
  {
    id: 'customer-data',
    heading: '6. Your Customer Data',
    body: `You retain ownership of all data you enter into the Service, including customer names, phone numbers, measurement records, order details, and payment records ("Your Data").

You grant us a limited licence to store, process, and transmit Your Data solely to provide the Service to you.

You are responsible for ensuring you have the legal basis to collect and process Your Data, including obtaining any necessary consent from your customers under the NDPA and any other applicable law.

We do not sell Your Data to third parties. We do not use Your Data to train machine learning models. We access Your Data only to provide technical support with your explicit permission, or as required by law.`,
  },
  {
    id: 'ip',
    heading: '7. Intellectual Property',
    body: `The Ojuowo name, logo, and all software, designs, and content that make up the Service are owned by ${COMPANY_NAME} and are protected under Nigerian and international intellectual property law.

Nothing in these Terms transfers any ownership of our intellectual property to you. You receive only a limited, non-exclusive, non-transferable right to use the Service as these Terms permit.`,
  },
  {
    id: 'disclaimers',
    heading: '8. Disclaimers',
    body: `The Service is provided "as is" and "as available", without warranties of any kind under Nigerian law.

We do not warrant that the Service will run without interruption or error, that it will meet your specific business requirements, or that defects will be corrected on any particular timeline.

You use the Service at your own risk. We are not responsible for business decisions you make based on data or reports produced by the Service.`,
  },
  {
    id: 'liability',
    heading: '9. Limitation of Liability',
    body: `${COMPANY_NAME} is not liable for indirect, incidental, consequential, or punitive damages arising from your use of the Service, including loss of profits, loss of data, or business interruption, to the extent permitted under Nigerian law.

Our total liability for any single claim is capped at the amount you paid us in the 3 months before the event that gave rise to the claim, or 50,000 Naira, whichever is greater.

This cap does not apply to liability for fraud, gross negligence, or personal injury caused by us.`,
  },
  {
    id: 'termination',
    heading: '10. Termination',
    body: `You may cancel your account at any time by writing to us at ${COMPANY_EMAIL}. Your access will end at the close of your current billing period.

We may suspend or terminate your account immediately if you breach these Terms, fail to pay subscription fees, or if we are required to do so by law.

After termination, we will keep Your Data for 30 days during which you may request an export. After 30 days, Your Data will be permanently deleted, except where we are required by law to keep it longer.`,
  },
  {
    id: 'changes',
    heading: '11. Changes to These Terms',
    body: `When we update these Terms in a material way, we will give you at least 14 days' notice by email or through a notice inside the Service.

Continuing to use the Service after the new Terms take effect means you accept them.`,
  },
  {
    id: 'governing-law',
    heading: '12. Governing Law',
    body: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of Nigerian courts.`,
  },
  {
    id: 'contact',
    heading: '13. Contact',
    body: `To reach us about these Terms:

${COMPANY_NAME}
Email: ${COMPANY_EMAIL}`,
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

export default function TermsPage() {
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
              Terms of Service
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
              <a href="/privacy" style={{ color: '#5B4CF5', textDecoration: 'none', fontWeight: 600 }}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
