import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Renders a certified Markdown document byte-for-byte (no summarize / adapt).
 * Source files live under public/docs/ — exact copies of CONRRAD/docs/public/.
 */
export default function CertifiedDocPage({
  title,
  kicker,
  src,
}: {
  title: string
  kicker: string
  src: string
}) {
  const [text, setText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setText(null)
    setError(null)
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
        return r.text()
      })
      .then((body) => {
        if (!cancelled) setText(body)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message || 'Failed to load document')
      })
    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">{kicker}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-xs text-mute mb-8">
        Certified Citizen-era document. Displayed exactly as published — not summarized.
        {' · '}
        <a href={src} className="text-accent hover:underline">
          Download Markdown
        </a>
        {' · '}
        <Link to="/documentation" className="text-accent hover:underline">
          Documentation
        </Link>
      </p>
      {error && <p className="text-sm text-accent mb-4">Load error: {error}</p>}
      {!error && text === null && <p className="text-sm text-mute">Loading…</p>}
      {text !== null && (
        <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink bg-white border border-line p-5 overflow-x-auto">
          {text}
        </pre>
      )}
    </div>
  )
}
