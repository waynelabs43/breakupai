import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BreakupAI — AI Relationship Analysis',
  description: 'Find out who really has the power in your situationship.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
