import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export async function POST(req: NextRequest) {
  const { conversation } = await req.json()
  if (!conversation || conversation.length < 50)
    return NextResponse.json({ error: 'Conversation too short' }, { status: 400 })

  // Truncate to fit Stripe metadata limit (500 chars per value)
  // We'll store in multiple chunks if needed
  const chunk1 = conversation.substring(0, 490)
  const chunk2 = conversation.substring(490, 980)
  const chunk3 = conversation.substring(980, 1470)
  const chunk4 = conversation.substring(1470, 1960)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ 
      price_data: { 
        currency: 'usd', 
        product_data: { name: 'BreakupAI Analysis', description: 'AI-powered relationship analysis' }, 
        unit_amount: 299 
      }, 
      quantity: 1 
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
    metadata: {
      conv1: chunk1,
      conv2: chunk2,
      conv3: chunk3,
      conv4: chunk4,
    }
  })

  return NextResponse.json({ url: session.url })
}
