import { Link } from 'react-router-dom'
import { ModuleDef } from '../lib/siteCatalog'
import { StatusBadge } from './StatusBadge'

export function ModuleCard({ m, base }: { m: ModuleDef; base: string }) {
  return (
    <Link
      to={`${base}/${m.id}`}
      className="block border border-line bg-white p-5 hover:border-accent transition-colors h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-bold text-base leading-tight">{m.title}</h3>
        <StatusBadge status={m.status} />
      </div>
      <p className="text-sm text-mute leading-relaxed">{m.blurb}</p>
    </Link>
  )
}
