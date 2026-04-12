import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // TODO (Phase 2): Send via Nodemailer or Resend
    // import { sendEmail } from '@/lib/email'
    // await sendEmail({ to: process.env.CONTACT_EMAIL, ...data })

    // For now — log to console
    console.log('[Contact Form Submission]', {
      name: data.name,
      company: data.company,
      email: data.email,
      service: data.service,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.flatten() },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
