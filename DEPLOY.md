# BreakupAI — Deploy to Vercel (Step by Step)

## Prerequisites
- GitHub account (free)
- Vercel account (free) — sign up at vercel.com
- Stripe account (free) — sign up at stripe.com
- Anthropic API key (you already have this)

---

## Step 1 — Push to GitHub
1. Go to github.com → New Repository → name it "breakupai" → Create
2. In terminal, run:
```
cd /path/to/breakupai
git init
git add .
git commit -m "Initial BreakupAI build"
git remote add origin https://github.com/YOURUSERNAME/breakupai.git
git push -u origin main
```

## Step 2 — Deploy on Vercel
1. Go to vercel.com → Add New Project
2. Import your breakupai GitHub repo
3. Click Deploy (default settings are fine)
4. Vercel will give you a URL like breakupai.vercel.app

## Step 3 — Set Up Stripe
1. Go to stripe.com → Developers → API Keys
2. Copy your Publishable Key (pk_live_...) and Secret Key (sk_live_...)
3. Create a product: Products → Add Product → "BreakupAI Analysis" → $2.99 one-time

## Step 4 — Set Environment Variables on Vercel
1. In Vercel → Your Project → Settings → Environment Variables
2. Add these one by one:
   - STRIPE_SECRET_KEY = your stripe secret key
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = your stripe publishable key
   - ANTHROPIC_API_KEY = your anthropic key
   - NEXT_PUBLIC_BASE_URL = https://your-vercel-url.vercel.app
3. Redeploy: Vercel dashboard → Deployments → Redeploy

## Step 5 — Set Up Stripe Webhook
1. Stripe Dashboard → Developers → Webhooks → Add Endpoint
2. URL: https://your-vercel-url.vercel.app/api/webhook
3. Events to listen: checkout.session.completed
4. Copy the Webhook Signing Secret (whsec_...)
5. Add to Vercel env vars: STRIPE_WEBHOOK_SECRET = whsec_...
6. Redeploy on Vercel

## Step 6 — Test It
1. Go to your Vercel URL
2. Paste a fake conversation
3. Use Stripe test card: 4242 4242 4242 4242, any future date, any CVC
4. You should see your analysis result

## Step 7 — Go Live
1. In Stripe, switch from Test Mode to Live Mode
2. Update STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY with live keys
3. Redeploy

You're live. Start posting on Twitter.
