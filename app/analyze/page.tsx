'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SNIPPETS = [
  { icon: '🚩', text: 'Gaslighting patterns detected...' },
  { icon: '⚠️', text: 'Emotional unavailability signals found...' },
  { icon: '💔', text: 'Power imbalance identified...' },
  { icon: '🔍', text: 'Breadcrumbing behavior detected...' },
  { icon: '📊', text: 'Calculating your situation score...' },
  { icon: '⚡', text: 'Analyzing response time patterns...' },
  { icon: '🎯', text: 'Finalizing your analysis...' },
]

type Stage = 'input' | 'analyzing' | 'teaser'

export default function AnalyzePage() {
  const [conversation, setConversation] = useState('')
  const [stage, setStage] = useState<Stage>('input')
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [visibleSnippets, setVisibleSnippets] = useState<typeof SNIPPETS>([])
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Snippet animation
  useEffect(() => {
    if (stage !== 'analyzing') return
    if (snippetIndex >= SNIPPETS.length) {
      setTimeout(() => setStage('teaser'), 600)
      return
    }
    const t = setTimeout(() => {
      setVisibleSnippets(prev => [...prev, SNIPPETS[snippetIndex]])
      setSnippetIndex(i => i + 1)
    }, 700)
    return () => clearTimeout(t)
  }, [stage, snippetIndex])

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
      if (!res.ok) throw new Error(data.error || 'Failed')
      setCheckoutUrl(data.url)
      setStage('analyzing')
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  if (stage === 'analyzing' || stage === 'teaser') {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
        
        {stage === 'analyzing' ? (
          <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s infinite' }}>💔</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Analyzing your conversation...</h2>
            <p style={{ color: '#555', fontSize: 14, marginBottom: 40 }}>Our AI is reading between the lines</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visibleSnippets.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
                  background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.06)',
                  animation: 'fadeIn 0.4s ease-out',
                  color: '#e0e0f0', fontSize: 15
                }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span>{s.text}</span>
                  <span style={{ marginLeft: 'auto', color: '#8b5cf6', fontSize: 12 }}>✓</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', opacity: 0.4, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        ) : (
          // Teaser stage
          <div style={{ maxWidth: 560, width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🎯</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Your analysis is ready</h2>
              <p style={{ color: '#666', fontSize: 15 }}>Here's a preview of what we found...</p>
            </div>

            {/* Snippets recap */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
              {SNIPPETS.slice(0, 4).map((s, i) => (
                <div key={i} style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 999, fontSize: 13, color: '#fc8181' }}>
                  {s.icon} {s.text.replace('...', '').replace('detected', '').replace('identified', '').replace('found', '').trim()}
                </div>
              ))}
            </div>

            {/* Blurred preview */}
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '1px solid rgba(139,92,246,0.3)' }}>
              <div style={{ filter: 'blur(8px)', pointerEvents: 'none', padding: 24, background: '#12121a', userSelect: 'none' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>⚡ POWER DYNAMIC</div>
                    <div style={{ height: 6, background: '#222', borderRadius: 3, marginBottom: 6 }}>
                      <div style={{ width: '28%', height: '100%', background: '#ef4444', borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 13, color: '#888' }}>You 28% · Them 72%</div>
                  </div>
                  <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>📊 SCORE</div>
                    <div style={{ fontSize: 40, fontWeight: 800, color: '#ef4444' }}>3</div>
                    <div style={{ fontSize: 11, color: '#666' }}>/10</div>
                  </div>
                </div>
                <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>💬 WHAT TO SAY</div>
                  <div style={{ fontSize: 14, color: '#999' }}>"Don't text first. Here's exactly what to do instead..."</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {['💡 Key Insights', '🚩 Red Flags', '💚 Green Flags'].map((l, i) => (
                    <div key={i} style={{ background: '#1a1a2e', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{l}</div>
                      <div style={{ fontSize: 12, color: '#555' }}>████████ ██████ ███</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lock overlay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,15,0.7)' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Full results locked</div>
                <div style={{ fontSize: 13, color: '#666' }}>Unlock to see everything</div>
              </div>
            </div>

            <a href={checkoutUrl} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '18px 28px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              borderRadius: 14, color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 700,
              boxShadow: '0 0 40px rgba(139,92,246,0.5)', marginBottom: 10
            }}>
              Unlock Full Analysis
              <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 14 }}>$2.99</span>
            </a>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#444' }}>
              <span style={{ textDecoration: 'line-through', color: '#333', marginRight: 6 }}>$9.99</span>
              Limited time offer · One-time payment · Results in 30 seconds
            </p>
          </div>
        )}

        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        `}</style>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
      <Link href="/" style={{ color: '#666', fontSize: 14, textDecoration: 'none', marginBottom: 32, display: 'block', textAlign: 'center' }}>← Back to BreakupAI</Link>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>
            Paste your <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>conversation</span>
          </h1>
          <p style={{ color: '#666', fontSize: 15 }}>We'll scan it for patterns you're too close to see</p>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={conversation}
            onChange={e => setConversation(e.target.value)}
            placeholder={"Paste the conversation here...\n\nExample:\nMe: Hey, haven't heard from you\nThem: Been busy\nMe: Are we still on for Saturday?\nThem: Maybe, I'll let you know\n\nThe more you paste, the more accurate the analysis."}
            rows={12}
            style={{
              width: '100%', padding: '18px 20px', borderRadius: 14, fontSize: 14,
              fontFamily: 'monospace', lineHeight: 1.6, resize: 'none', outline: 'none',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.3)',
              color: '#e0e0f0', marginBottom: 12, boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#444', marginBottom: 16 }}>
            <span style={{ color: conversation.length >= 50 ? '#22c55e' : '#555' }}>{conversation.length} characters {conversation.length < 50 && '(min 50)'}</span>
            <span>Data never stored · Processed once · Deleted after analysis</span>
          </div>
          {error && <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#fc8181', fontSize: 14, marginBottom: 16 }}>{error}</div>}
          <button type="submit" disabled={loading || conversation.length < 50} style={{
            width: '100%', padding: '17px', borderRadius: 14, fontSize: 17, fontWeight: 700,
            background: conversation.length >= 50 ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : '#1a1a2a',
            color: conversation.length >= 50 ? '#fff' : '#444',
            border: 'none', cursor: conversation.length >= 50 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s', boxShadow: conversation.length >= 50 ? '0 0 30px rgba(139,92,246,0.4)' : 'none'
          }}>
            {loading ? 'Preparing analysis...' : 'See What The AI Found →'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#444', marginTop: 10 }}>
            Preview is free · <span style={{ textDecoration: 'line-through' }}>$9.99</span> $2.99 to unlock full results
          </p>
        </form>
      </div>
    </main>
  )
}
