import { Link } from 'react-router-dom'
import { PUBLIC_CANON } from '../lib/publicNarrative'

function isExternalHref(to: string) {
  return /^https?:\/\//i.test(to) || to.startsWith('/atlas')
}

/** Three-question scan frame — readable in under 30 seconds. */
export function NarrativeFrame({
  children,
  next,
  showThesis = false,
}: {
  children?: React.ReactNode
  next?: { to: string; label: string }[]
  showThesis?: boolean
}) {
  const q = [
    { k: 'Problem', v: PUBLIC_CANON.problem },
    { k: 'How CONRRAD solves it', v: PUBLIC_CANON.how },
    { k: 'Why it matters', v: PUBLIC_CANON.why },
  ]
  return (
    <div className="space-y-6">
      {showThesis && (
        <p className="text-ink font-medium leading-relaxed">{PUBLIC_CANON.thesis}</p>
      )}
      <dl className="space-y-5">
        {q.map((row) => (
          <div key={row.k} className="border-b border-line pb-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">
              {row.k}
            </dt>
            <dd className="text-mute leading-relaxed text-[15px]">{row.v}</dd>
          </div>
        ))}
      </dl>
      {children}
      {next && next.length > 0 && (
        <p className="pt-1 text-sm">
          {next.map((n, i) => (
            <span key={n.to}>
              {i > 0 && ' · '}
              {isExternalHref(n.to) ? (
                <a className="text-accent hover:underline" href={n.to}>
                  {n.label}
                </a>
              ) : (
                <Link className="text-accent hover:underline" to={n.to}>
                  {n.label}
                </Link>
              )}
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
