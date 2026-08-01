import { Link } from 'react-router-dom'
import { FOUNDER } from '../lib/identity'

/** Public evidence board — honest, partially static until automation lands. */
export default function EvidencePage() {
  const rows = [
    { k: 'Website', v: 'Stable · Digital Twin surface on conrrad.org', s: 'live' },
    { k: 'Last known deploy', v: 'Vercel project conrrad/conrrad-website · Production', s: 'live' },
    { k: 'Runtime health', v: 'runtime.conrrad.org/__ppe/health', s: 'preview', href: 'https://runtime.conrrad.org/__ppe/health' },
    { k: 'Scheduler / Freeze C0', v: 'Planning contract frozen · board render deterministic', s: 'certified' },
    { k: 'Documentation', v: 'Official Citizen-era docs index', s: 'live', href: '/documentation' },
    { k: 'Executive Brief', v: 'Certified brief', s: 'live', href: '/executive-brief' },
    { k: 'Whitepaper', v: 'Certified whitepaper', s: 'live', href: '/whitepaper' },
    { k: 'Last certification posture', v: 'TESTLAB evidence packs · Founder gates pending where noted', s: 'partial' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Transparency</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Evidence</h1>
      <p className="text-mute leading-relaxed mb-10 max-w-2xl">
        This page is the public evidence board. Some rows are live links; others are honest reserveds
        until automated mirroring lands. We never invent green checks.
      </p>
      <div className="border border-line divide-y divide-line bg-white">
        {rows.map((r) => (
          <div key={r.k} className="p-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mute w-40 shrink-0">{r.k}</p>
            <div className="flex-1">
              {r.href ? (
                <a
                  href={r.href}
                  {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="text-sm text-accent hover:underline"
                >
                  {r.v}
                </a>
              ) : (
                <p className="text-sm text-ink">{r.v}</p>
              )}
              <p className="text-[10px] uppercase tracking-widest text-mute mt-1">{r.s}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-mute">
        Founder {FOUNDER.displayName}. Related:{' '}
        <Link to="/trust" className="text-accent hover:underline">
          Trust
        </Link>
        {' · '}
        <Link to="/documentation" className="text-accent hover:underline">
          Documentation
        </Link>
      </p>
    </div>
  )
}
