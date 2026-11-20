'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/*
  PIN setup is used by staff (workers, managers) during device onboarding.
  Owner signup no longer includes a PIN step — it uses a password.
  This page is a placeholder until the staff onboarding flow is built.
*/
export default function PinPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/signup')
  }, [router])
  return null
}
