import { useEffect } from 'react'

/** Full-document redirect for static products (/demo/, /atlas/). */
export function HardRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return (
    <p className="mx-auto max-w-3xl px-5 py-24 text-sm text-mute">
      Redirecting to <a href={to} className="text-accent hover:underline">{to}</a>…
    </p>
  )
}

/** Scroll to hash target after route mount (MERGE anchors). */
export function useHashScroll() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
}
