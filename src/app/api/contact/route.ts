import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  service: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(10),
})

/**
 * Contact inquiry logger.
 *
 * The primary lead channel is the client-side WhatsApp handoff (same-tab
 * navigation, immune to popup blockers). This route is the paper trail:
 * every inquiry is structured-logged before the handoff, so a lead is
 * recoverable from Vercel logs even if the visitor never hits send.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    console.log(
      JSON.stringify({
        type: 'contact_inquiry',
        timestamp: new Date().toISOString(),
        ...data,
      }),
    )

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.flatten() },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
