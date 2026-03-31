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
  reach_out: { icon: '💬', title: 'Reach Out', color: '#22c55e' },
  move_on: { icon: '🚶', title: 'Move On', color: '#ef4444' },
  wait: { icon: '⏳', title: 'Wait It Out', color: '#eab308' },
}

export default function ResultPage() {
  const { sessionId } = useParams()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [retries, setRetries] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const poll = async () => {
      const res = await fetch(`/api/analyze?sessionId=${sessionId}`)
      if (res.ok) { setAnalysis(await res.json()); setLoading(false) }
      else if (retries < 30) setTimeout(() => setRetries(r => r + 1), 1000)
      else setLoading(false)
    }
    poll()
  }, [sessionId, retries])

  if (loading) return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{background: '#0d0d0f'}}>
      <div className="text-5xl animate-pulse mb-6">💔</div>
      <p className="text-xl mb-2">Analyzing your conversation...</p>
      <p className="text-sm" style={{color: '#555570'}}>Usually takes 5-10 seconds</p>
    </main>
  )

  if (!analysis) return (
    <main className="min-h-screen flex items-center justify-center" style={{background: '#0d0d0f'}}>
      <div className="text-center"><p className="text-xl mb-4">Something went wrong.</p>
      <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl" style={{background: '#ef4444'}}>Retry</button></div>
    </main>
  )

  const vc = VERDICT_CONFIG[analysis.verdict]

  return (
    <main className="min-h-screen px-4 py-16" style={{background: 'linear-gradient(135deg, #0d0d0f 0%, #1a0a2e 50%, #0d0d0f 100%)'}}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Your Analysis</h1>

        {/* Verdict */}
        <div className="p-8 rounded-2xl text-center" style={{background: `${vc.color}15`, border: `1px solid ${vc.color}40`}}>
          <div className="text-5xl mb-3">{vc.icon}</div>
          <h2 className="text-3xl font-bold mb-3" style={{color: vc.color}}>{vc.title}</h2>
          <p style={{color: '#c0c0d0'}}>{analysis.verdictExplanation}</p>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
            <h3 className="text-sm font-semibold mb-4" style={{color: '#8888a8'}}>⚡ POWER DYNAMIC</h3>
            <div className="h-3 rounded-full mb-3" style={{background: '#222'}}>
              <div className="h-full rounded-full transition-all" style={{width: `${analysis.powerDynamic.percentage}%`, background: analysis.powerDynamic.youHavePower ? '#22c55e' : '#ef4444'}} />
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span style={{color: analysis.powerDynamic.youHavePower ? '#22c55e' : '#888'}}>You {analysis.powerDynamic.percentage}%</span>
              <span style={{color: !analysis.powerDynamic.youHavePower ? '#ef4444' : '#888'}}>Them {100 - analysis.powerDynamic.percentage}%</span>
            </div>
            <p className="text-xs" style={{color: '#666680'}}>{analysis.powerDynamic.explanation}</p>
          </div>
          <div className="p-6 rounded-2xl flex flex-col items-center justify-center" style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
            <h3 className="text-sm font-semibold mb-4" style={{color: '#8888a8'}}>📊 SITUATION SCORE</h3>
            <div className="text-6xl font-bold mb-1" style={{color: analysis.situationScore >= 7 ? '#22c55e' : analysis.situationScore >= 4 ? '#eab308' : '#ef4444'}}>{analysis.situationScore}</div>
            <div className="text-sm" style={{color: '#666680'}}>/10</div>
          </div>
        </div>

        {/* What to say */}
        {analysis.whatToSay && (
          <div className="p-6 rounded-2xl" style={{background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)'}}>
            <h3 className="font-semibold mb-4">💬 What To Say</h3>
            <div className="p-4 rounded-xl mb-4" style={{background: 'rgba(0,0,0,0.3)'}}>
              <p style={{color: '#e0e0f0'}}>"{analysis.whatToSay}"</p>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(analysis.whatToSay); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="w-full py-3 rounded-xl font-semibold" style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'}}>
              {copied ? '✓ Copied!' : '📋 Copy Message'}
            </button>
          </div>
        )}

        {/* Insights */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: '💡 Key Insights', items: analysis.keyInsights, color: '#6b7aff' },
            { title: '🚩 Red Flags', items: analysis.redFlags, color: '#ef4444' },
            { title: '💚 Green Flags', items: analysis.greenFlags, color: '#22c55e' },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)'}}>
              <h3 className="text-sm font-semibold mb-3" style={{color: s.color}}>{s.title}</h3>
              {s.items.length > 0 ? s.items.map((item, j) => <p key={j} className="text-xs mb-2" style={{color: '#888'}}>{item}</p>) : <p className="text-xs" style={{color: '#444'}}>None detected</p>}
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/" className="inline-block px-8 py-4 rounded-xl font-semibold" style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'}}>
            Analyze Another Conversation
          </Link>
        </div>
      </div>
    </main>
  )
}
