import { Link, useParams } from 'react-router-dom'
import { getModule, LAYERS, modulesByLayer, Layer } from '../lib/siteCatalog'
import { ModuleCard } from '../components/ModuleCard'
import { StatusBadge } from '../components/StatusBadge'

export function LayerHub({ layer }: { layer: Layer }) {
  const meta = LAYERS.find((l) => l.id === layer)!
  const items = modulesByLayer(layer)
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Digital twin</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-3">{meta.title}</h1>
      <p className="text-mute max-w-2xl mb-10 leading-relaxed">{meta.blurb}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((m) => (
          <ModuleCard key={m.id} m={m} base={`/${layer}`} />
        ))}
      </div>
    </div>
  )
}

export function ModuleDetail({ layer }: { layer: Layer }) {
  const { id } = useParams()
  const m = getModule(id || '')
  if (!m || m.layer !== layer) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-mute mb-4">Module not found.</p>
        <Link to={`/${layer}`} className="text-accent text-sm font-semibold uppercase tracking-widest">
          ← {layer}
        </Link>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Link to={`/${layer}`} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mute hover:text-ink">
        ← {layer}
      </Link>
      <div className="mt-6 mb-4">
        <StatusBadge status={m.status} showHint />
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">{m.title}</h1>
      <p className="text-lg text-mute leading-relaxed mb-10">{m.blurb}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="border border-line bg-white p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent mb-3">Available today</p>
          <ul className="font-mono text-xs space-y-2">
            {(m.today.length ? m.today : ['— informational only —']).map((t) => (
              <li key={t}>✓ {t}</li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-white p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold mb-3">Not yet</p>
          <ul className="font-mono text-xs space-y-2 text-mute">
            {(m.notYet.length ? m.notYet : ['—']).map((t) => (
              <li key={t}>○ {t}</li>
            ))}
          </ul>
        </div>
      </div>

      {m.links && m.links.length > 0 && (
        <div className="border border-line bg-white p-5 mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">References</p>
          <ul className="space-y-2 text-sm">
            {m.links.map((l) => (
              <li key={l.href}>
                <a className="text-accent hover:underline" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-mute leading-relaxed">
        Honesty rule: status advances only when capability is real. Showing a module does not mean it is ready to use.
      </p>
    </div>
  )
}
