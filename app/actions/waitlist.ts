'use server'

export async function joinWaitlist(
  email: string,
  businessType: string,
  honeypot = '',
): Promise<{ ok: boolean; message: string }> {
  // Honeypot: real users never fill this field — bots do. Return fake success so bots don't retry.
  if (honeypot) {
    return { ok: true, message: "You're on the list. We'll be in touch." }
  }
  if (!email || !email.includes('@')) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }
  if (!businessType) {
    return { ok: false, message: 'Please select your business type.' }
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    console.log('[waitlist] API URL not set. Received:', { email, businessType })
    return { ok: true, message: "You're on the list. We'll be in touch." }
  }

  try {
    const res = await fetch(`${apiUrl}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, businessType }),
    })

    if (!res.ok) {
      return { ok: false, message: 'Something went wrong. Please try again.' }
    }

    return { ok: true, message: "You're on the list. We'll be in touch." }
  } catch {
    return { ok: false, message: 'Could not connect. Please try again shortly.' }
  }
}
