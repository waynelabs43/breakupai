import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{background: 'linear-gradient(135deg, #0d0d0f 0%, #1a0a2e 50%, #0d0d0f 100%)'}}>
      <div className="max-w-3xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          AI-powered analysis in seconds
        </div>

        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Find out who <span style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>really</span> has<br />the power
        </h1>
        <p className="text-2xl mb-4" style={{color: '#a0a0b0'}}>in your situationship.</p>
        <p className="text-lg mb-12 max-w-xl mx-auto" style={{color: '#666680'}}>
          Paste your texts. Our AI analyzes the power dynamics, tells you if you should reach out or move on, and gives you exactly what to say next.
        </p>

        <Link href="/analyze" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-transform hover:scale-105"
          style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'}}>
          Analyze My Texts
          <span className="px-3 py-1 rounded-lg text-sm" style={{background: 'rgba(255,255,255,0.2)'}}>$2.99</span>
        </Link>
        <p className="mt-4 text-sm" style={{color: '#555570'}}>One-time payment · Instant results · Data never stored</p>

        <div className="mt-20 grid grid-cols-3 gap-8">
          {[
            {icon: '📱', title: 'Paste your texts', desc: "Copy the conversation that's been keeping you up at night."},
            {icon: '🧠', title: 'AI analyzes', desc: 'Reads between the lines — tone, timing, power dynamics.'},
            {icon: '✨', title: 'Get your answer', desc: 'Reach out, move on, or hold. Plus exactly what to say.'},
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)'}}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm" style={{color: '#666680'}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
