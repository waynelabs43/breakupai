import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BreakupAI — AI Analysis of Your Relationship Texts',
  description: 'Paste your texts. Our AI detects gaslighting, power imbalances, and tells you exactly what to do next. Get clarity in 30 seconds.',
  openGraph: {
    title: 'BreakupAI — AI Analysis of Your Relationship Texts',
    description: 'Paste your texts. Our AI detects gaslighting, power imbalances, and tells you exactly what to do next.',
    url: 'https://breakupai-five.vercel.app',
    siteName: 'BreakupAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BreakupAI — Find Out What\'s Really Going On',
    description: 'Paste your texts. AI detects gaslighting, power imbalances, mixed signals. Get your answer in 30 seconds.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>{children}</body>
    </html>
  )
}
