import { Nav } from '@/components/landing/nav'
import { Hero } from '@/components/landing/hero'
import { PainPoints } from '@/components/landing/pain-points'
import { HowItWorks } from '@/components/landing/how-it-works'
import { ForYourBusiness } from '@/components/landing/for-your-business'
import { Features } from '@/components/landing/features'
import { FAQ } from '@/components/landing/faq'
import { SignupCTA } from '@/components/landing/waitlist-form'
import { Footer } from '@/components/landing/footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Ojúòwò',
      url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://ojuowo.com',
      description:
        'Business management software for Nigerian small businesses: tailors, hair stylists, bakers, shoe makers and more.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Ojúòwò',
      operatingSystem: 'Web, Android, iOS',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'NGN',
        description: 'Free to start',
      },
      description:
        'Manage orders, let customers track their jobs by link, assign staff tasks and calculate worker pay. Built for Nigerian small businesses.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do my workers need their own smartphones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but nothing expensive. Workers use a lightweight phone app to see their assigned tasks and update job status. Any Android or iPhone works. The app is small, fast, and works without internet, so your team stays on track even with patchy data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do my customers need to create an account or install anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not at all. Customers track their orders through a private link you send on WhatsApp. No login, no app download, no password. They just tap the link and see exactly where their order is.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if my staff are offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The worker app is built to work without internet. Staff can open their task list and update job status offline. As soon as they reconnect, all updates sync automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free to start. As we grow, we will introduce plans, but you will always get advance notice before anything changes. No surprises.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is Ojúòwò different from just using WhatsApp and spreadsheets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "WhatsApp and spreadsheets do not talk to each other. When a customer asks for an update, you have to check the spreadsheet, find the row, then reply on WhatsApp. Ojúòwò keeps everything in one place: the order, the worker's task, the payment record, the customer link. The update is already there.",
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ForYourBusiness />
      <Features />
      <FAQ />
      <SignupCTA />
      <Footer />
    </main>
  )
}
