import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ojuowo.com'
  const isStaging = base.includes('staging') || base.includes('vercel.app') || process.env.NODE_ENV !== 'production'
  return {
    rules: isStaging
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  }
}
