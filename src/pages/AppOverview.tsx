import { Link } from 'react-router-dom'
import { ROADMAP, STATUS_LABEL, SURFACES, mvpProgressPct } from '../lib/productCatalog'
import { readGuestSession } from '../lib/identity'

const TILE_IDS = ['execution', 'projects', 'packages', 'evidence', 'agents', 'marketplace'] as const

const CHANGELOG = [
  {
    ver: '1.0.2',
    added: ['Guest Session only', 'Investor-grade home', 'Evidence board', 'Donate 0 USD ledger'],
    known: ['Runtime Identity not connected'],
  },
]

export default function AppOverview() {
  const guest = readGuestSession()
  const pct = mvpProgressPct()
  const t10 = ROADMAP[0]
  const t11 = ROADMAP[1]

  return (
    <div className="p-6 md:p-10 max-w-5xl space-y-10">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Public Product · Visible Evolution
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {guest ? 'Visitor session' : 'Product shell'}
        </h1>
        <p className="text-mute max-w-2xl leading-relaxed">
          {guest
            ? 'Guest Session only — no Founder, Admin, or Runtime Identity yet.'
            : 'Open as visitor anytime. Sign-in creates a Guest Session until Runtime Identity exists.'}
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link to="/twin" className="text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline">
            Full twin →
          </Link>
          <Link to="/evidence" className="text-xs font-semibold uppercase tracking-[0.14em] text-mute hover:underline">
            Evidence
          </Link>
          <Link to="/donate" className="text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:underline">
            Donate
          </Link>
        </div>
      </div>

      <section className="border border-line bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-4">
          CONRRAD Evolution
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mute mb-1">Current</p>
            <p className="font-display text-2xl font-bold">Public Product</p>
            <p className="text-sm text-mute">Readiness phase · July 2026</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mute mb-1">Next</p>
            <p className="font-display text-2xl font-bold">Phase 1.1</p>
            <p className="text-sm text-mute">Execution Runtime</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mute mb-1">ETA</p>
            <p className="font-display text-2xl font-bold">Aug 2026</p>
            <p className="text-sm text-mute">First live execution</p>
          </div>
        </div>
        <div className="space-y-3 font-mono text-xs">
          {[
            { id: '1.0', w: Math.round((t10.items.filter((i) => i.done).length / t10.items.length) * 100) },
            { id: '1.1', w: Math.round((t11.items.filter((i) => i.done).length / t11.items.length) * 100) },
            { id: '1.5', w: 0 },
            { id: '2.0', w: 0 },
          ].map((r) => (
            <div key={r.id} className="flex items-center gap-3">
              <span className="w-8 text-mute">{r.id}</span>
              <div className="flex-1 h-1.5 bg-line overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${Math.max(r.w, r.id === '1.0' ? 8 : 0)}%` }} />
              </div>
              <span className="w-10 text-right text-mute">{r.w}%</span>
            </div>
          ))}
        </div>
        <Link
          to="/app/roadmap"
          className="inline-block mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
        >
          Full roadmap →
        </Link>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-line bg-white p-5">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">
            <span>Platform progress</span>
            <span className="text-accent">{pct}%</span>
          </div>
          <div className="h-1.5 bg-line overflow-hidden mb-3">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[10px] text-mute font-mono">Single Web Surface · Public Product</p>
        </div>
        <div className="border border-line bg-white p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">
            Development model
          </p>
          <ul className="text-xs text-ink space-y-1 font-mono">
            <li>✔ Architecture First</li>
            <li>✔ Visible Evolution</li>
            <li>✔ Incremental Releases</li>
            <li>✔ Forward Compatible</li>
            <li>✔ Evidence Driven</li>
            <li>✔ Single Web Surface</li>
            <li>✔ Digital Twin</li>
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {TILE_IDS.map((id) => {
          const t = SURFACES[id]
          return (
            <Link
              key={id}
              to={`/app/${id}`}
              className="group border border-line bg-white p-5 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-display font-bold text-lg">{t.title}</h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-mute shrink-0 border border-line px-2 py-0.5">
                  {STATUS_LABEL[t.status]}
                </span>
              </div>
              <p className="text-sm text-mute mb-3">{t.blurb}</p>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Open →
              </span>
            </Link>
          )
        })}
      </div>

      <section className="border border-line bg-white p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-4">Changelog</p>
        {CHANGELOG.map((c) => (
          <div key={c.ver} className="font-mono text-xs space-y-2">
            <p className="font-bold">Version {c.ver}</p>
            <p className="text-accent">Added</p>
            <ul className="text-mute pl-3">
              {c.added.map((a) => (
                <li key={a}>✓ {a}</li>
              ))}
            </ul>
            <p className="text-mute pt-2">Known Issues</p>
            <ul className="text-mute pl-3">
              {c.known.map((k) => (
                <li key={k}>• {k}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="border border-line bg-white p-5 font-mono text-xs text-mute space-y-2">
        <p>
          <span className="text-ink/40">control_plane</span> conrrad.org (Vercel)
        </p>
        <p>
          <span className="text-ink/40">runtime</span>{' '}
          <a
            className="text-accent hover:underline"
            href="https://runtime.conrrad.org/__ppe/health"
            target="_blank"
            rel="noreferrer"
          >
            runtime.conrrad.org
          </a>
        </p>
      </div>
    </div>
  )
}
