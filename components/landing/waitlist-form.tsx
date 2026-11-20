import { WaitlistFormClient, type BusinessTypeOption } from './waitlist-form-client'

const FALLBACK_TYPES: BusinessTypeOption[] = [
  { code: 'tailoring',  label: 'Tailoring',  requiresDescription: false },
  { code: 'baking',     label: 'Baking',     requiresDescription: false },
  { code: 'salon',      label: 'Salon',      requiresDescription: false },
  { code: 'shoe-making',label: 'Shoe Making',requiresDescription: false },
  { code: 'laundromat', label: 'Laundromat', requiresDescription: false },
  { code: 'farming',    label: 'Farming',    requiresDescription: false },
  { code: 'other',      label: 'Others',     requiresDescription: true  },
]

export async function WaitlistForm() {
  let businessTypes = FALLBACK_TYPES

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/api/public/business-types`, {
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        const body = await res.json()
        if (body.success && Array.isArray(body.data) && body.data.length > 0) {
          businessTypes = body.data
        }
      }
    }
  } catch { /* fall back to hardcoded list */ }

  return <WaitlistFormClient businessTypes={businessTypes} />
}
