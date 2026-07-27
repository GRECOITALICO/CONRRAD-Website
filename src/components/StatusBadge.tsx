import { HonestyStatus, STATUS_HINT, STATUS_LABEL } from '../lib/siteCatalog'

const TONE: Record<HonestyStatus, string> = {
  stable: 'bg-accent text-paper',
  public: 'bg-accentSoft text-accent border border-accent/30',
  preview: 'bg-white text-accent border border-accent',
  early_access: 'bg-white text-ink border border-line',
  in_development: 'bg-paper text-mute border border-line',
  research: 'bg-white text-gold border border-gold/40',
  informational: 'bg-paper text-mute border border-line',
  planned: 'bg-paper text-mute border border-dashed border-line',
}

export function StatusBadge({ status, showHint = false }: { status: HonestyStatus; showHint?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start gap-1">
      <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] px-2 py-1 ${TONE[status]}`}>
        {STATUS_LABEL[status]}
      </span>
      {showHint && <span className="text-[11px] text-mute max-w-xs leading-snug">{STATUS_HINT[status]}</span>}
    </span>
  )
}
