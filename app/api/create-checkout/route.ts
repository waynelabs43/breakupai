import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { storeConversation } from '@/lib/storage'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export async function POST(req: NextRequest) {
  const { conversation } = await req.json()
  if (!conversation || conversation.length < 50)
    return NextResponse.json({ error: 'Conversation too short' }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: 'BreakupAI Analysis', description: 'AI-powered relationship analysis' }, unit_amount: 299 }, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
  })

  await storeConversation(session.id, conversation)
  return NextResponse.json({ url: session.url })
}
