'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: "Mia K., 24",
    city: "New York",
    text: "I was spiraling for 3 weeks. BreakupAI told me I had 28% of the power and showed me exactly why. I stopped texting first. He reached out the next day.",
    stars: 5,
    situation: "situationship"
  },
  {
    name: "Tyler R., 27",
    city: "Los Angeles",
    text: "It flagged gaslighting patterns I completely missed. Every time I called out his behavior he'd flip it back on me — the AI caught all of it. Finally moved on.",
    stars: 5,
    situation: "recent breakup"
  },
  {
    name: "Jasmine T., 22",
    city: "Chicago",
    text: "The 'what to say next' message it gave me was so specific it scared me. We're actually talking again. I never thought $4.99 would change my whole situation.",
    stars: 5,
    situation: "ghosted"
  },
]

const teaserResults = [
  {
    label: '🚩 GASLIGHTING DETECTED',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    preview: '"You\'re overthinking it" used 4×'
  },
  {
    label: '⚡ POWER: 71% / 29%',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    preview: 'They have most of the leverage'
  },
  {
    label: '📊 SCORE: 3/10',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
    preview: 'Verdict: Walk Away'
  },
  {
    label: '💬 WHAT TO SAY',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    preview: '"Don\'t text first. Wait 5 days..."'
  },
]

const scenarios = [
  "They take hours to reply but you can see they're active",
  "Hot one week, distant the next — and somehow it's always your fault",
  "You feel crazy for even questioning it",
  "They say all the right things but the actions don't match",
  "You keep replaying conversations looking for what you missed",
  "Your friends say move on but something keeps pulling you back",
]

export default function Home() {
  const [navBlur, setNavBlur] = useState(false)

  useEffect(() => {
    const handler = () => setNavBlur(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <main style={{ background: '#080810', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>

      {/* Sticky Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: navBlur ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: navBlur ? 'rgba(8,8,16,0.85)' : 'transparent',
        backdropFilter: navBlur ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 19, background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.3px' }}>
            BreakupAI
          </span>
        </div>
        <Link href="/analyze" style={{
          padding: '8px 20px', background: 'linear-gradient(135deg, #7c3aed, #db2777)',
          borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
          boxShadow: '0 0 16px rgba(124,58,237,0.35)'
        }}>
          Get My Analysis →
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center', position: 'relative' }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Social proof pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px',
          borderRadius: 999, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
          marginBottom: 32, fontSize: 13
        }}>
          <span style={{ color: '#a78bfa', fontWeight: 600 }}>73,000+ analyses run</span>
          <span style={{ color: '#4a4a6a' }}>·</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ color: '#666' }}>Live now</span>
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 66px)', fontWeight: 900, lineHeight: 1.08, marginBottom: 22, letterSpacing: '-1px' }}>
          They're playing games.<br />
          <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find out if they're worth it.
          </span>
        </h1>

        <p style={{ fontSize: 19, color: '#777', lineHeight: 1.6, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
          Paste your conversation. Our AI reads between the lines — detecting gaslighting, power imbalances, and mixed signals — then tells you exactly what to do next.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Link href="/analyze" style={{
            display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 40px',
            background: 'linear-gradient(135deg, #7c3aed, #db2777)', borderRadius: 14,
            color: '#fff', textDecoration: 'none', fontSize: 19, fontWeight: 800,
            boxShadow: '0 0 50px rgba(124,58,237,0.45)', letterSpacing: '-0.2px'
          }}>
            Analyze My Texts
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.18)', borderRadius: 6, fontSize: 14, fontWeight: 600 }}>$4.99</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
            <span style={{ textDecoration: 'line-through', color: '#383838' }}>$12.99</span>
            <span style={{ color: '#f472b6', fontWeight: 600 }}>Limited time: $4.99</span>
            <span>· One-time · No subscription</span>
          </div>
        </div>
      </section>

      {/* Teaser result cards */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#444', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
          Here's what we find
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {teaserResults.map((r, i) => (
            <div key={i} style={{
              padding: '18px 20px', borderRadius: 14,
              background: r.bg, border: `1px solid ${r.border}`,
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 8, letterSpacing: '0.5px' }}>{r.label}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', filter: 'blur(3.5px)', userSelect: 'none' }}>{r.preview}</div>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent'
              }}>
                <span style={{ fontSize: 12, color: '#333', fontWeight: 600 }}>🔒 Unlocked after payment</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "Sound familiar?" section */}
      <section style={{ maxWidth: 720, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.3px' }}>Sound familiar?</h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: 36, fontSize: 15 }}>If you've felt any of these, you need an outside perspective</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {scenarios.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
              background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>😶</span>
              <span style={{ fontSize: 14, color: '#aaa', lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/analyze" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 30px',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: 12, color: '#a78bfa', textDecoration: 'none', fontWeight: 600, fontSize: 15
          }}>
            Get clarity now →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.3px' }}>How it works</h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: 40, fontSize: 15 }}>Clarity in under 60 seconds</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { step: '01', icon: '📋', title: 'Paste your texts', desc: 'Copy the conversation that\'s been living in your head. The more you paste, the more accurate.' },
            { step: '02', icon: '🤖', title: 'AI scans for patterns', desc: 'Our model reads for gaslighting, power dynamics, emotional unavailability, and mixed signals.' },
            { step: '03', icon: '💡', title: 'Get your answer', desc: 'Power score, situation rating, red flags, and exactly what to say (or not say) next.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 700, letterSpacing: '2px', marginBottom: 12 }}>{item.step}</div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What we detect */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.3px' }}>What the AI finds</h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: 40, fontSize: 15 }}>The patterns you keep missing</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {[
            { icon: '🚩', label: 'Gaslighting patterns', desc: 'When they make you question your own reality — "you\'re too sensitive," "that never happened"' },
            { icon: '⚡', label: 'Power imbalances', desc: 'Who has leverage and who is chasing. The exact percentage split.' },
            { icon: '💔', label: 'Emotional unavailability', desc: 'Signs they\'re not ready or not interested in what you actually want' },
            { icon: '⚠️', label: 'Breadcrumbing', desc: 'Just enough attention to keep you hooked without any real commitment' },
            { icon: '🔍', label: 'Mixed signals decoded', desc: 'Hot/cold behavior analyzed objectively so you stop second-guessing yourself' },
            { icon: '📊', label: 'Response time patterns', desc: 'What their timing, word choice, and engagement levels actually reveal' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '18px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 900, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.3px' }}>Real people. Real clarity.</h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: 40, fontSize: 15 }}>Join 73,000+ who finally got their answer</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ color: '#f59e0b', marginBottom: 14, fontSize: 14 }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontSize: 14, color: '#bbb', lineHeight: 1.65, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>{t.city} · {t.situation}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { number: '94%', label: 'said the analysis was accurate' },
            { number: '73K+', label: 'analyses run and counting' },
            { number: '$4.99', label: 'one-time, no subscription' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 38, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
                {s.number}
              </div>
              <div style={{ fontSize: 13, color: '#555' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ textAlign: 'center', padding: '60px 24px 100px', background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.07))' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>Stop overthinking. Start knowing.</h2>
        <p style={{ color: '#555', marginBottom: 36, fontSize: 16, maxWidth: 400, margin: '0 auto 36px' }}>You deserve an honest answer. Not a guess.</p>
        <Link href="/analyze" style={{
          display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 40px',
          background: 'linear-gradient(135deg, #7c3aed, #db2777)', borderRadius: 14,
          color: '#fff', textDecoration: 'none', fontSize: 19, fontWeight: 800,
          boxShadow: '0 0 50px rgba(124,58,237,0.45)'
        }}>
          Analyze My Texts
          <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.18)', borderRadius: 6, fontSize: 14 }}>$4.99</span>
        </Link>
        <div style={{ marginTop: 14, fontSize: 13, color: '#383838' }}>
          One-time payment · No account needed · Data never stored · Results in 30 seconds
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
