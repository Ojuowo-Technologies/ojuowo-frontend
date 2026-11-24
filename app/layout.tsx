import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#5B4CF5',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://ojuowo.com'),
  title: 'Ojúòwò · Business OS for Nigerian Small Businesses',
  description:
    'Ojúòwò helps Nigerian tailors, bakers, hair stylists and more manage orders, assign staff tasks and calculate worker pay, all in one place. Join the waitlist.',
  keywords: [
    'small business management app Nigeria',
    'order management app Nigeria',
    'business app for tailors Nigeria',
    'app for hair stylists Nigeria',
    'worker pay tracking Nigeria',
    'made-to-order business software Nigeria',
    'customer order tracking Nigeria',
    'order tracking link for customers Nigeria',
    'shoe making business app Nigeria',
    'bakery order management Nigeria',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ojúòwò · Business OS for Nigerian Small Businesses',
    description:
      'Manage orders, let customers track by link, assign tasks, calculate pay. For Nigerian small businesses. Join the waitlist.',
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: 'Ojúòwò',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ojúòwò · Business OS for Nigerian Small Businesses',
    description:
      'Manage orders, let customers track by link, assign tasks, calculate pay. For Nigerian small businesses. Join the waitlist.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-32x32.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(bricolage.variable, jakarta.variable)}>
      <body>{children}</body>
    </html>
  )
}
