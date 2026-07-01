import { NextRequest, NextResponse } from 'next/server'

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
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ success: false, error: 'Could not reach coach' }, { status: 502 })
  }
}
