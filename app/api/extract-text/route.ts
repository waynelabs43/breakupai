import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  try {
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mimeType = (file.type || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mimeType, data: base64 }
            },
            {
              type: 'text',
              text: `Extract the text conversation from this screenshot. Format it exactly like this:
Me: [message]
Them: [message]
Me: [message]

Rules:
- "Me" is the person whose messages appear on the right side (usually blue bubbles)
- "Them" is the other person (usually gray bubbles)
- Include timestamps only if they help understand the flow
- Do not add commentary — output ONLY the conversation transcript
- If this is not a text/chat screenshot, say: NOT_A_CONVERSATION`
            }
          ]
        }
      ]
    })

    const extracted = response.content[0]?.type === 'text' ? response.content[0].text.trim() : null

    if (!extracted || extracted === 'NOT_A_CONVERSATION') {
      return NextResponse.json({ error: "Couldn't find a conversation in that image. Try uploading a screenshot of your texts." }, { status: 422 })
    }

    return NextResponse.json({ conversation: extracted })
  } catch (err) {
    console.error('extract-text error:', err)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
