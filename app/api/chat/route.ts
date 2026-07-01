import { NextRequest, NextResponse } from 'next/server'

// Allow up to 5 minutes — needed for slower AI models
export const maxDuration = 300

function cleanResponse(text: string): string {
  return text
    .replace(/\\n/g, '\n')        // literal \n → real newline
    .replace(/<br\s*\/?>/gi, '\n') // <br> tags → newline
    .replace(/\n{3,}/g, '\n\n')   // collapse 3+ newlines to 2
    .trim()
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ success: false, error: 'Webhook not configured' }, { status: 500 })
  }

  let body: { message?: string; sessionId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const { message, sessionId } = body
  if (!message || !sessionId) {
    return NextResponse.json({ success: false, error: 'message and sessionId are required' }, { status: 400 })
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, error: `Coach unavailable (${upstream.status})` },
        { status: 502 },
      )
    }

    const data = await upstream.json()

    // Clean up any literal \n or <br> tags the AI model may emit
    if (data?.data?.response) {
      data.data.response = cleanResponse(data.data.response)
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ success: false, error: 'Could not reach coach' }, { status: 502 })
  }
}
