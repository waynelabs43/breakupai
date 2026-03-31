import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getConversation, storeAnalysis, deleteConversation } from '@/lib/storage'
import { analyzeConversation } from '@/lib/anthropic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const conversation = await getConversation(session.id)
    if (conversation) {
      const analysis = await analyzeConversation(conversation)
      await storeAnalysis(session.id, { ...analysis, createdAt: new Date().toISOString() })
      await deleteConversation(session.id)
    }
  }

  return NextResponse.json({ received: true })
}
