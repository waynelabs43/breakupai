'use client'
import { useState } from 'react'

export default function AnalyzePage() {
  const [conversation, setConversation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (conversation.trim().length < 50) { setError('Please paste a longer conversation (min 50 characters).'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: conversation.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{background: 'linear-gradient(135deg, #0d0d0f 0%, #1a0a2e 50%, #0d0d0f 100%)'}}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-3">Paste your <span style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>conversation</span></h1>
        <p className="text-center mb-10" style={{color: '#666680'}}>Copy and paste the texts you want analyzed</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={conversation}
            onChange={e => setConversation(e.target.value)}
            placeholder={"Paste your conversation here...\n\nExample:\nMe: Hey, how was your weekend?\nThem: It was good\nMe: We should hang soon\nThem: Yeah maybe"}
            rows={12}
            className="w-full p-5 rounded-xl text-sm font-mono leading-relaxed outline-none resize-none mb-4"
            style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.4)', color: '#e0e0f0'}}
          />
          {error && <div className="mb-4 p-3 rounded-lg text-red-400 text-sm" style={{background: 'rgba(239,68,68,0.1)'}}>{error}</div>}
          <button type="submit" disabled={loading || conversation.length < 50}
            className="w-full py-4 rounded-xl text-lg font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'}}>
            {loading ? 'Creating checkout...' : <>Analyze My Texts <span className="ml-2 px-3 py-1 rounded-lg text-sm" style={{background: 'rgba(255,255,255,0.2)'}}>$2.99</span></>}
          </button>
          <p className="text-center mt-4 text-xs" style={{color: '#555570'}}>Secure payment via Stripe · Data never stored</p>
        </form>
      </div>
    </main>
  )
}
