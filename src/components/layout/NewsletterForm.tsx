'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to Mailchimp / Resend audience in Phase 2
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm text-primary-container font-semibold">
        You&apos;re on the list. Welcome to the Rogue Dispatch!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        className="bg-surface-container-lowest text-white text-sm px-4 py-2.5 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-primary-container placeholder:text-white/30"
        aria-label="Newsletter email"
      />
      <button
        type="submit"
        className="bg-primary-container text-on-primary-fixed px-4 py-2.5 rounded-r-full font-bold text-sm hover:bg-primary transition-colors"
      >
        JOIN
      </button>
    </form>
  )
}
