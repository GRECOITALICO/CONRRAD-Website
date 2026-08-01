/** Public evidence / status board — institutional transparency. */

import { Link } from 'react-router-dom'
import { NarrativeFrame } from '../components/NarrativeFrame'
import { PUBLIC_PRODUCT } from '../lib/identity'

export default function EvidencePage() {
  const rows = [
    { k: 'Website', v: 'Public enterprise surface on conrrad.org', s: 'available' },
    {
      k: 'Laboratory',
      v: 'Laboratory operational · platform development and validation',
      s: 'operational',
    },
    {
      k: 'Institution Platform',
      v: 'Enterprise destination for governed deployment',
      s: 'in progress',
    },
    {
      k: 'Evidence packages',
      v: 'Sealed records in GRECOITALICO repositories and Laboratory paths',
      s: 'active',
    },
    {
      k: 'Public execution',
      v: 'Execution path currently disabled in the public environment',
      s: 'disabled in public environment',
      href: 'https://runtime.conrrad.org/__ppe/health',
    },
    { k: 'Birth package', v: 'Public compatibility alias (GitHub)', s: 'available', href: PUBLIC_PRODUCT.sdk },
    {
      k: 'Documentation',
      v: 'Official docs (CONRRAD-Docs)',
      s: 'available',
      href: PUBLIC_PRODUCT.docsRepo,
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">
        Transparency · Status
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">Evidence</h1>
      <NarrativeFrame
        next={[
          { to: '/governance', label: 'Governance' },
          { to: 'https://conrrad.org/atlas/', label: 'Atlas' },
        ]}
      />
      <p className="text-sm text-mute mt-8 mb-6">
        Public claims mapped to measured status. No invented green checks.
      </p>
      <div className="border border-line divide-y divide-line bg-white">
        {rows.map((r) => (
          <div key={r.k} className="p-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mute w-44 shrink-0">
              {r.k}
            </p>
            <div className="flex-1">
              {r.href ? (
                <a href={r.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
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
      <p className="mt-8 text-sm">
        <Link className="text-accent hover:underline" to="/architecture">
          Architecture
        </Link>
      </p>
    </div>
  )
}
