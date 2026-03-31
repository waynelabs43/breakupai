import Link from 'next/link'

const testimonials = [
  { name: "Mia K., 24", city: "New York", text: "I was about to text my ex at 2am. BreakupAI told me I had 30% of the power and to wait. I did. He texted me first the next morning.", stars: 5 },
  { name: "Tyler R., 27", city: "Los Angeles", text: "It caught gaslighting patterns I completely missed. Situation score was a 3/10. I finally moved on. Best $2.99 I've ever spent.", stars: 5 },
  { name: "Jasmine T., 22", city: "Chicago", text: "The 'what to say next' message worked. We're talking again. I was skeptical but the analysis was frighteningly accurate.", stars: 5 },
]

const stats = [
  { number: "94%", label: "said the analysis was accurate" },
  { number: "220M+", label: "AI relationship tool downloads in 2025" },
  { number: "2.99", label: "dollars to get clarity" },
]

export default function Home() {
  return (
    <main style={{ background: '#0a0a0f', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>💔</span>
          <span style={{ fontWeight: 700, fontSize: 18, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BreakupAI</span>
        </div>
        <Link href="/analyze" style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
          Try Free Preview →
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', marginBottom: 28, fontSize: 13 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ color: '#a88ef5' }}>AI relationship analysis · results in 30 seconds</span>
        </div>

        <h1 style={{ fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
          Your texts are telling a story.<br />
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Are you reading it right?</span>
        </h1>

        <p style={{ fontSize: 20, color: '#888', lineHeight: 1.6, marginBottom: 12, maxWidth: 560, margin: '0 auto 12px' }}>
          Paste your conversation. Our AI detects gaslighting, power imbalances, and emotional unavailability — then tells you exactly what to do next.
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Link href="/analyze" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 36px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: 14,
            color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 700,
            boxShadow: '0 0 40px rgba(139,92,246,0.4)'
          }}>
            Analyze My Texts
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 14 }}>$2.99</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555' }}>
            <span style={{ textDecoration: 'line-through', color: '#444' }}>$9.99</span>
            <span style={{ color: '#ec4899', fontWeight: 600 }}>Limited time: $2.99</span>
            <span>· One-time · No subscription</span>
          </div>
        </div>
      </section>

      {/* Teaser preview */}
      <section style={{ maxWidth: 700, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.3)' }}>
          {/* Blurred fake result */}
          <div style={{ filter: 'blur(6px)', pointerEvents: 'none', padding: 28, background: '#12121a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ background: '#1e1e2e', borderRadius: 10, padding: '14px 20px', flex: 1, marginRight: 12 }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>⚡ POWER DYNAMIC</div>
                <div style={{ height: 8, background: '#2a2a3a', borderRadius: 4, marginBottom: 8 }}>
                  <div style={{ width: '32%', height: '100%', background: '#ef4444', borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>You 32% · Them 68%</div>
              </div>
              <div style={{ background: '#1e1e2e', borderRadius: 10, padding: '14px 20px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>📊 SITUATION SCORE</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#ef4444' }}>3</div>
                <div style={{ fontSize: 11, color: '#666' }}>/10 — Walk Away</div>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>💬 WHAT TO SAY</div>
              <div style={{ fontSize: 14, color: '#aaa' }}>"Don't double text. Wait 5 days. If they reach out, respond with..."</div>
            </div>
          </div>
          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,15,0.75)',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Your analysis is ready</div>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>Unlock your power score, situation rating, and what to say next</div>
            <Link href="/analyze" style={{
              padding: '12px 28px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 15
            }}>
              Unlock for $2.99 →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 40, fontWeight: 800, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
                {s.number.startsWith('2.99') ? '$2.99' : s.number}
              </div>
              <div style={{ fontSize: 13, color: '#666' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What we detect */}
      <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>What our AI detects</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 40, fontSize: 15 }}>The patterns you keep missing</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { icon: '🚩', label: 'Gaslighting patterns', desc: 'When they make you question your own reality' },
            { icon: '⚡', label: 'Power imbalances', desc: 'Who has leverage and who is chasing' },
            { icon: '💔', label: 'Emotional unavailability', desc: 'Signs they\'re not ready for what you want' },
            { icon: '⚠️', label: 'Breadcrumbing', desc: 'Just enough attention to keep you hooked' },
            { icon: '🔍', label: 'Mixed signals', desc: 'Hot/cold behavior decoded objectively' },
            { icon: '📊', label: 'Response time analysis', desc: 'What their timing actually reveals' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#666' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 860, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Real people. Real clarity.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ padding: '22px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ color: '#f59e0b', marginBottom: 12, fontSize: 14 }}>{'★'.repeat(t.stars)}</div>
              <p style={{ fontSize: 14, color: '#bbb', lineHeight: 1.6, marginBottom: 14 }}>"{t.text}"</p>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{t.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ textAlign: 'center', padding: '60px 24px 100px', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.06))' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Stop overthinking. Start knowing.</h2>
        <p style={{ color: '#666', marginBottom: 32, fontSize: 16 }}>Join thousands who got their answer in under 30 seconds.</p>
        <Link href="/analyze" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 36px',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: 14,
          color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 700,
          boxShadow: '0 0 40px rgba(139,92,246,0.4)'
        }}>
          Analyze My Texts
          <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 14 }}>$2.99</span>
        </Link>
        <div style={{ marginTop: 12, fontSize: 13, color: '#444' }}>One-time · No account needed · Data never stored</div>
      </section>
    </main>
  )
}
