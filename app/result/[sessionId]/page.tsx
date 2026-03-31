'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Analysis {
  powerDynamic: { youHavePower: boolean; percentage: number; explanation: string }
  situationScore: number
  verdict: 'reach_out' | 'move_on' | 'wait'
  verdictExplanation: string
  whatToSay: string
  keyInsights: string[]
  redFlags: string[]
  greenFlags: string[]
}

const VERDICT_CONFIG = {
  reach_out: {
    icon: '💬',
    title: 'Reach Out',
    subtitle: 'The timing is right — make a move',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.07)',
    border: 'rgba(34,197,94,0.25)',
    actions: [
      'Send a low-pressure message — no pressure, no agenda',
      'Keep it short and light; don\'t over-explain',
      'If they don\'t respond within a few days, you have your answer'
    ]
  },
  move_on: {
    icon: '🚶',
    title: 'Move On',
    subtitle: "The signs are clear — it's time",
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.07)',
    border: 'rgba(239,68,68,0.25)',
    actions: [
      'Stop initiating contact — let them come to you or not at all',
      'Redirect your energy toward people who match your effort',
      'Give yourself a defined no-contact window (at least 30 days)'
    ]
  },
  wait: {
    icon: '⏳',
    title: 'Wait It Out',
    subtitle: 'Patience is the right move right now',
    color: '#eab308',
    bg: 'rgba(234,179,8,0.07)',
    border: 'rgba(234,179,8,0.25)',
    actions: [
      'Don\'t double-text — let the last message sit',
      'Focus on your own life for the next 5-7 days',
      'Reassess once you\'ve had space to gain perspective'
    ]
  }
}

export default function ResultPage() {
  const { sessionId } = useParams()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [retries, setRetries] = useState(0)
  const [copiedMessage, setCopiedMessage] = useState(false)
  const [copiedShare, setCopiedShare] = useState(false)

  useEffect(() => {
    const poll = async () => {
      const res = await fetch(`/api/analyze?sessionId=${sessionId}`)
      if (res.ok) {
        setAnalysis(await res.json())
        setLoading(false)
      } else if (retries < 30) {
        setTimeout(() => setRetries(r => r + 1), 1000)
      } else {
        setLoading(false)
      }
    }
    poll()
  }, [sessionId, retries])

  if (loading) return (
    <main style={mainStyle}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 20, animation: 'pulse 1.5s infinite' }}>💔</div>
        <p style={{ fontSize: 18, marginBottom: 8 }}>Analyzing your conversation...</p>
        <p style={{ fontSize: 14, color: '#444' }}>Usually takes 5–10 seconds</p>
      </div>
      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }`}</style>
    </main>
  )

  if (!analysis) return (
    <main style={mainStyle}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 20 }}>Something went wrong loading your results.</p>
        <button onClick={() => window.location.reload()} style={{ padding: '12px 28px', borderRadius: 10, background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Try Again
        </button>
      </div>
    </main>
  )

  const vc = VERDICT_CONFIG[analysis.verdict]
  const shareScore = analysis.situationScore

  const copyMessage = () => {
    navigator.clipboard.writeText(analysis.whatToSay)
    setCopiedMessage(true)
    setTimeout(() => setCopiedMessage(false), 2500)
  }

  const copyShare = () => {
    navigator.clipboard.writeText(
      `I just ran my texts through BreakupAI — my situation score is ${shareScore}/10. If you're overthinking a situationship, try it: https://breakupai-five.vercel.app`
    )
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2500)
  }

  return (
    <main style={{ background: '#080810', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 13, color: '#444', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>Your Analysis</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.3px' }}>Here's what the AI found</h1>
        </div>

        {/* Verdict */}
        <div style={{ padding: '32px 28px', borderRadius: 20, background: vc.bg, border: `1px solid ${vc.border}`, marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{vc.icon}</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 6, color: vc.color, letterSpacing: '-0.5px' }}>{vc.title}</h2>
          <p style={{ fontSize: 15, color: '#777', marginBottom: 16 }}>{vc.subtitle}</p>
          <p style={{ fontSize: 15, color: '#bbb', lineHeight: 1.65, maxWidth: 500, margin: '0 auto' }}>{analysis.verdictExplanation}</p>
        </div>

        {/* What This Means */}
        <div style={{ padding: '24px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#555', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1px' }}>What this means for you</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {vc.actions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${vc.color}20`, border: `1px solid ${vc.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 11, color: vc.color, fontWeight: 700 }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.55, margin: 0 }}>{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          <div style={{ padding: '22px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '1px' }}>⚡ Power Dynamic</h3>
            <div style={{ height: 8, borderRadius: 4, background: '#1a1a2a', marginBottom: 10 }}>
              <div style={{
                height: '100%', borderRadius: 4, transition: 'width 0.8s ease',
                width: `${analysis.powerDynamic.percentage}%`,
                background: analysis.powerDynamic.youHavePower ? '#22c55e' : '#ef4444'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
              <span style={{ color: analysis.powerDynamic.youHavePower ? '#22c55e' : '#888', fontWeight: 600 }}>
                You {analysis.powerDynamic.percentage}%
              </span>
              <span style={{ color: !analysis.powerDynamic.youHavePower ? '#ef4444' : '#555', fontWeight: 600 }}>
                Them {100 - analysis.powerDynamic.percentage}%
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{analysis.powerDynamic.explanation}</p>
          </div>

          <div style={{ padding: '22px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#555', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>📊 Situation Score</h3>
            <div style={{
              fontSize: 64, fontWeight: 900, lineHeight: 1, marginBottom: 4,
              color: analysis.situationScore >= 7 ? '#22c55e' : analysis.situationScore >= 4 ? '#eab308' : '#ef4444'
            }}>
              {analysis.situationScore}
            </div>
            <div style={{ fontSize: 14, color: '#444' }}>/10</div>
            <div style={{ fontSize: 12, color: '#444', marginTop: 8 }}>
              {analysis.situationScore >= 7 ? 'Looking good' : analysis.situationScore >= 4 ? 'Complicated' : 'Concerning'}
            </div>
          </div>
        </div>

        {/* What to say */}
        {analysis.whatToSay && (
          <div style={{ padding: '22px 22px', borderRadius: 16, background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.25)', marginBottom: 20 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '1px' }}>💬 What To Say</h3>
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', marginBottom: 14 }}>
              <p style={{ color: '#e0e0f0', fontSize: 15, lineHeight: 1.6, margin: 0 }}>"{analysis.whatToSay}"</p>
            </div>
            <button onClick={copyMessage} style={{
              width: '100%', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              background: copiedMessage ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg, #7c3aed, #db2777)',
              color: copiedMessage ? '#22c55e' : '#fff',
              border: copiedMessage ? '1px solid rgba(34,197,94,0.4)' : 'none',
              cursor: 'pointer', transition: 'all 0.2s'
            }}>
              {copiedMessage ? '✓ Copied to clipboard' : '📋 Copy This Message'}
            </button>
          </div>
        )}

        {/* Insights grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { title: '💡 Key Insights', items: analysis.keyInsights, color: '#6b7aff' },
            { title: '🚩 Red Flags', items: analysis.redFlags, color: '#ef4444' },
            { title: '💚 Green Flags', items: analysis.greenFlags, color: '#22c55e' },
          ].map((section, i) => (
            <div key={i} style={{ padding: '18px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: section.color, marginBottom: 12 }}>{section.title}</h3>
              {section.items.length > 0
                ? section.items.map((item, j) => (
                    <p key={j} style={{ fontSize: 12, color: '#777', lineHeight: 1.5, marginBottom: 6, margin: '0 0 6px' }}>• {item}</p>
                  ))
                : <p style={{ fontSize: 12, color: '#333' }}>None detected</p>
              }
            </div>
          ))}
        </div>

        {/* Share result */}
        <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>My situation score: <span style={{ color: analysis.situationScore >= 7 ? '#22c55e' : analysis.situationScore >= 4 ? '#eab308' : '#ef4444' }}>{shareScore}/10</span></div>
          <p style={{ fontSize: 13, color: '#444', marginBottom: 14 }}>Know someone else overthinking their situation?</p>
          <button onClick={copyShare} style={{
            padding: '11px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14,
            background: copiedShare ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
            border: copiedShare ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: copiedShare ? '#22c55e' : '#888', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            {copiedShare ? '✓ Copied!' : '🔗 Share this'}
          </button>
        </div>

        {/* Upsell + CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#444', marginBottom: 16 }}>Want a more detailed analysis? Paste a longer conversation for deeper insights.</p>
          <Link href="/analyze" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
            background: 'linear-gradient(135deg, #7c3aed, #db2777)', borderRadius: 12,
            color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15,
            boxShadow: '0 0 24px rgba(124,58,237,0.35)'
          }}>
            Analyze Another Conversation
          </Link>
        </div>
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
  padding: '40px 20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
  color: '#fff'
}
