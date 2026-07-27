import { Link, useLocation, useParams } from 'react-router-dom'
import { getModule, STATUS_LABEL } from '../lib/siteCatalog'
import { StatusBadge } from '../components/StatusBadge'

/** Product app surface — backed by digital twin catalog. */
export default function SurfacePage() {
  const { surface } = useParams<{ surface: string }>()
  const loc = useLocation()
  const key = surface || loc.pathname.replace(/^\//, '').split('/').pop() || ''
  const m = getModule(key)

  const title = m?.title || key || 'Surface'
  const blurb = m?.blurb || 'Reserved for a later product train.'
  const status = m?.status || 'informational'
  const today = m?.today || []
  const notYet = m?.notYet || []
  const twinPath = m ? `/${m.layer}/${m.id}` : '/twin'

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6">
        <StatusBadge status={status} />
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-mute max-w-lg mb-8 leading-relaxed">{blurb}</p>

      <div className="w-full max-w-md text-left border border-line bg-white p-5 mb-10 font-mono text-xs">
        <p className="text-[10px] uppercase tracking-widest text-mute mb-3">Available today</p>
        <ul className="space-y-1.5 text-ink mb-4">
          {(today.length ? today : ['— shell only —']).map((x) => (
            <li key={x}>✓ {x}</li>
          ))}
        </ul>
        <p className="text-[10px] uppercase tracking-widest text-gold mb-3">Not yet</p>
        <ul className="space-y-1.5 text-mute">
          {(notYet.length ? notYet : ['—']).map((x) => (
            <li key={x}>○ {x}</li>
          ))}
        </ul>
        <p className="mt-4 text-mute">
          Status: {STATUS_LABEL[status]}. Advances only when capability is real.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/app"
          className="bg-ink text-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-accent"
        >
          ← Back to app
        </Link>
        <Link
          to={twinPath}
          className="border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-mute hover:border-ink hover:text-ink"
        >
          Twin detail
        </Link>
        <button
          type="button"
          className="border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-mute hover:border-ink"
          onClick={() => alert('Notify list lands in Phase 1.1 — thanks for interest.')}
        >
          Notify me
        </button>
      </div>
    </div>
  )
}
