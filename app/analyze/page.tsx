'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SNIPPETS = [
  { icon: '🚩', text: 'Scanning for gaslighting patterns...' },
  { icon: '⚡', text: 'Calculating power dynamic...' },
  { icon: '💔', text: 'Checking for emotional unavailability...' },
  { icon: '🔍', text: 'Decoding mixed signals...' },
  { icon: '⚠️', text: 'Identifying breadcrumbing behavior...' },
  { icon: '📊', text: 'Scoring your situation...' },
  { icon: '💬', text: 'Preparing your personalized verdict...' },
]

const SITUATIONS = [
  { emoji: '💔', label: 'Recent breakup' },
  { emoji: '🤔', label: 'Talking but unclear' },
  { emoji: '👻', label: "They're ghosting me" },
  { emoji: '🔄', label: 'On-again off-again' },
  { emoji: '😰', label: 'Feeling anxious about it' },
]

const DURATIONS = [
  'Just started (<1 month)',
  'A few months',
  '6+ months',
  'Over a year',
  "It's complicated",
]

const WANT_TO_KNOW = [
  'Do they actually like me?',
  'Should I reach out?',
  'Are there red flags?',
  'What should I say?',
  'Should I move on?',
]

type Stage = 'quiz1' | 'quiz2' | 'quiz3' | 'input' | 'analyzing' | 'teaser'

export default function AnalyzePage() {
  const [stage, setStage] = useState<Stage>('quiz1')
  const [situation, setSituation] = useState('')
  const [duration, setDuration] = useState('')
  const [wantToKnow, setWantToKnow] = useState<string[]>([])
  const [conversation, setConversation] = useState('')
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [visibleSnippets, setVisibleSnippets] = useState<typeof SNIPPETS>([])
  const [almostDone, setAlmostDone] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle')

  // Snippet animation
  useEffect(() => {
    if (stage !== 'analyzing') return
    if (snippetIndex >= SNIPPETS.length) {
      setTimeout(() => setAlmostDone(true), 300)
      setTimeout(() => setStage('teaser'), 1400)
      return
    }
    const t = setTimeout(() => {
      setVisibleSnippets(prev => [...prev, SNIPPETS[snippetIndex]])
      setSnippetIndex(i => i + 1)
    }, 900)
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

  const toggleWantToKnow = (item: string) => {
    setWantToKnow(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    )
  }

  const handleShare = () => {
    const shareText = `I just ran my texts through BreakupAI and it found things I completely missed. Try it: https://breakupai-five.vercel.app`
    navigator.clipboard.writeText(shareText)
    setShareState('copied')
    setTimeout(() => setShareState('idle'), 3000)
  }

  const personalizedPrompt = () => {
    const parts = []
    if (situation) parts.push(situation.toLowerCase())
    if (wantToKnow.length) parts.push(wantToKnow.slice(0, 2).join(' and ').toLowerCase())
    if (parts.length === 0) return 'our AI will analyze your conversation for patterns you might be missing.'
    return `our AI will specifically scan for ${parts.join(', ')} in your texts.`
  }

  // Quiz 1
  if (stage === 'quiz1') {
    return (
      <main style={mainStyle}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Step 1 of 3</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 28 }}>
              <div style={{ height: '100%', width: '33%', background: 'linear-gradient(90deg, #7c3aed, #db2777)', borderRadius: 99 }} />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>What's the situation?</h1>
            <p style={{ color: '#555', fontSize: 15 }}>Help us calibrate the analysis</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SITUATIONS.map((s, i) => (
              <button key={i} onClick={() => { setSituation(s.label); setStage('quiz2') }} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 500,
                textAlign: 'left', transition: 'all 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.border = '1px solid rgba(124,58,237,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)')}
              >
                <span style={{ fontSize: 20 }}>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // Quiz 2
  if (stage === 'quiz2') {
    return (
      <main style={mainStyle}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Step 2 of 3</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 28 }}>
              <div style={{ height: '100%', width: '66%', background: 'linear-gradient(90deg, #7c3aed, #db2777)', borderRadius: 99 }} />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>How long have you been talking?</h1>
            <p style={{ color: '#555', fontSize: 15 }}>Context shapes everything</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DURATIONS.map((d, i) => (
              <button key={i} onClick={() => { setDuration(d); setStage('quiz3') }} style={{
                display: 'flex', alignItems: 'center', padding: '16px 20px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 500,
                textAlign: 'left', transition: 'all 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.border = '1px solid rgba(124,58,237,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)')}
              >
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setStage('quiz1')} style={{ marginTop: 20, background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 13, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>← Back</button>
        </div>
      </main>
    )
  }

  // Quiz 3
  if (stage === 'quiz3') {
    return (
      <main style={mainStyle}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Step 3 of 3</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 28 }}>
              <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #7c3aed, #db2777)', borderRadius: 99 }} />
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>What do you want to know?</h1>
            <p style={{ color: '#555', fontSize: 15 }}>Select all that apply</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {WANT_TO_KNOW.map((item, i) => {
              const selected = wantToKnow.includes(item)
              return (
                <button key={i} onClick={() => toggleWantToKnow(item)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                  background: selected ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                  border: selected ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, color: selected ? '#a78bfa' : '#fff', cursor: 'pointer',
                  fontSize: 15, fontWeight: selected ? 600 : 500, textAlign: 'left', transition: 'all 0.15s'
                }}>
                  {item}
                  {selected && <span style={{ color: '#8b5cf6', fontSize: 16 }}>✓</span>}
                </button>
              )
            })}
          </div>
          <button
            disabled={wantToKnow.length === 0}
            onClick={() => setStage('input')}
            style={{
              width: '100%', padding: '16px', borderRadius: 12, fontSize: 16, fontWeight: 700,
              background: wantToKnow.length > 0 ? 'linear-gradient(135deg, #7c3aed, #db2777)' : '#1a1a2a',
              color: wantToKnow.length > 0 ? '#fff' : '#444',
              border: 'none', cursor: wantToKnow.length > 0 ? 'pointer' : 'not-allowed',
              boxShadow: wantToKnow.length > 0 ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Continue →
          </button>
          <button onClick={() => setStage('quiz2')} style={{ marginTop: 14, background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 13, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>← Back</button>
        </div>
      </main>
    )
  }

  // Analyzing / Teaser stages
  if (stage === 'analyzing' || stage === 'teaser') {
    return (
      <main style={mainStyle}>
        {stage === 'analyzing' ? (
          <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 18 }}>💔</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              {situation ? `Analyzing your ${situation.toLowerCase()} texts...` : 'Analyzing your conversation...'}
            </h2>
            <p style={{ color: '#444', fontSize: 14, marginBottom: 36 }}>Our AI is reading between the lines</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
              {visibleSnippets.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
                  background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#e0e0f0', fontSize: 15,
                  animation: 'fadeSlideIn 0.4s ease-out'
                }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span>{s.text}</span>
                  <span style={{ marginLeft: 'auto', color: '#8b5cf6', fontSize: 13 }}>✓</span>
                </div>
              ))}
            </div>

            {almostDone ? (
              <div style={{ fontSize: 14, color: '#8b5cf6', fontWeight: 600, animation: 'fadeSlideIn 0.3s ease-out' }}>
                Almost done...
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', opacity: 0.5, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Teaser stage
          <div style={{ maxWidth: 560, width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 34, marginBottom: 10 }}>🎯</div>
              <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6, letterSpacing: '-0.3px' }}>Your analysis is ready</h2>
              <p style={{ color: '#555', fontSize: 15 }}>Here's a preview of what we found...</p>
            </div>

            {/* Snippet pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
              {SNIPPETS.slice(0, 4).map((s, i) => (
                <div key={i} style={{
                  padding: '6px 14px', background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)', borderRadius: 999,
                  fontSize: 13, color: '#fc8181', fontWeight: 500
                }}>
                  {s.icon} {s.text.replace('...', '').replace('Scanning for ', '').replace('Calculating ', '').replace('Checking for ', '').replace('Decoding ', '').replace('Identifying ', '').replace('Scoring your ', '').replace('Preparing your personalized ', '')}
                </div>
              ))}
            </div>

            {/* Blurred preview */}
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: '1px solid rgba(139,92,246,0.3)' }}>
              <div style={{ filter: 'blur(8px)', pointerEvents: 'none', padding: 24, background: '#10101a', userSelect: 'none' }}>
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
                      <div style={{ fontSize: 12, color: '#444' }}>████████ ████</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,8,16,0.72)' }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>🔒</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Full results locked</div>
                <div style={{ fontSize: 13, color: '#555' }}>Unlock to see everything</div>
              </div>
            </div>

            {/* Pay to unlock */}
            <a href={checkoutUrl} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '18px 28px', background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              borderRadius: 14, color: '#fff', textDecoration: 'none', fontSize: 17, fontWeight: 800,
              boxShadow: '0 0 40px rgba(124,58,237,0.5)', marginBottom: 10, letterSpacing: '-0.2px'
            }}>
              Unlock Full Analysis
              <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 14 }}>$4.99</span>
            </a>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#333', marginBottom: 24 }}>
              <span style={{ textDecoration: 'line-through', color: '#2a2a2a', marginRight: 6 }}>$12.99</span>
              Limited time · One-time payment · Results in 30 seconds
            </p>

            {/* Share to unlock */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#444', marginBottom: 12 }}>— or —</div>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 14 }}>
                <strong style={{ color: '#aaa' }}>Share with 2 friends</strong> who need a reality check and unlock for free 👇
              </p>
              <button onClick={handleShare} style={{
                width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                background: shareState === 'copied' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                border: shareState === 'copied' ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: shareState === 'copied' ? '#22c55e' : '#888', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {shareState === 'copied' ? '✓ Link copied! Send it to 2 friends' : '🔗 Copy share link'}
              </button>
              <p style={{ fontSize: 12, color: '#2a2a2a', marginTop: 8 }}>Referral tracking coming soon — for now, honor system 🤝</p>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        `}</style>
      </main>
    )
  }

  // Input stage
  return (
    <main style={mainStyle}>
      <Link href="/" style={{ color: '#444', fontSize: 14, textDecoration: 'none', marginBottom: 32, display: 'block', textAlign: 'center' }}>← Back</Link>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.3px' }}>
            Paste your <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>conversation</span>
          </h1>
          <p style={{ color: '#555', fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
            Based on what you told us, {personalizedPrompt()}
          </p>
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
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(124,58,237,0.3)',
              color: '#e0e0f0', marginBottom: 12, boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.7)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.3)')}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#444', marginBottom: 16 }}>
            <span style={{ color: conversation.length >= 50 ? '#22c55e' : '#444' }}>
              {conversation.length} characters {conversation.length < 50 ? `(${50 - conversation.length} more needed)` : '✓'}
            </span>
            <span>Data never stored · Processed once</span>
          </div>
          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#fc8181', fontSize: 14, marginBottom: 16 }}>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading || conversation.length < 50} style={{
            width: '100%', padding: '17px', borderRadius: 14, fontSize: 17, fontWeight: 800,
            background: conversation.length >= 50 ? 'linear-gradient(135deg, #7c3aed, #db2777)' : '#111118',
            color: conversation.length >= 50 ? '#fff' : '#333',
            border: 'none', cursor: conversation.length >= 50 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: conversation.length >= 50 ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
            letterSpacing: '-0.2px'
          }}>
            {loading ? 'Preparing analysis...' : 'See What The AI Found →'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#333', marginTop: 10 }}>
            Free preview · <span style={{ textDecoration: 'line-through' }}>$12.99</span> $4.99 to unlock full results
          </p>
        </form>
      </div>
    </main>
  )
}

const mainStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#080810',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 24px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
  color: '#fff'
}
