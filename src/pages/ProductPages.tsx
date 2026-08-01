import { Link } from 'react-router-dom'
import { useHashScroll } from '../components/HardRedirect'
import CertifiedDocPage from './CertifiedDoc'

function Page({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  useHashScroll()
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">{kicker}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">{title}</h1>
      <div className="prose-like text-mute leading-relaxed space-y-4 text-[15px]">{children}</div>
    </div>
  )
}

const CERTIFIED = [
  { to: '/executive-brief', label: 'Executive Brief', md: '/docs/Executive_Brief.md' },
  { to: '/whitepaper', label: 'Whitepaper', md: '/docs/Whitepaper.md' },
] as const

/** Public doc slots without a certified body under docs/public/ — route only, no invented content. */
const COMING_SOON = [
  { to: '/documentation/citizen-book', label: 'Citizen Book' },
  { to: '/documentation/atlas-book', label: 'Atlas Book' },
  { to: '/documentation/observatory-guide', label: 'Observatory Guide' },
  { to: '/documentation/glossary', label: 'Glossary' },
  { to: '/documentation/faq', label: 'FAQ' },
] as const

/** Placeholder for titles not yet certified — no body authored. */
export function ComingSoonDocPage({ title }: { title: string }) {
  return (
    <Page title={title} kicker="Official · Coming soon">
      <p className="text-ink font-semibold text-lg">Coming soon</p>
      <p>
        This document is not yet available from a certified public source. No content is published
        on this page.
      </p>
      <p className="pt-4">
        <Link className="text-accent hover:underline" to="/documentation">
          Documentation index
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/executive-brief">
          Executive Brief
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/whitepaper">
          Whitepaper
        </Link>
      </p>
    </Page>
  )
}

/** Official documentation index — Citizen-era certified docs + Coming soon slots. */
export function DocumentationPage() {
  return (
    <Page title="Documentation" kicker="Official">
      <p>
        Official Citizen-era documentation is published from certified sources under{' '}
        <code className="text-ink">docs/public/</code>. This index is the public entry point.
      </p>

      <h2 id="published" className="font-display text-xl font-bold text-ink pt-8 scroll-mt-20">
        Published (certified)
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        {CERTIFIED.map((d) => (
          <li key={d.to}>
            <Link className="text-accent hover:underline" to={d.to}>
              {d.label}
            </Link>
            {' · '}
            <a className="text-accent hover:underline" href={d.md}>
              Markdown
            </a>
          </li>
        ))}
      </ul>

      <h2 id="coming-soon" className="font-display text-xl font-bold text-ink pt-8 scroll-mt-20">
        Coming soon
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        {COMING_SOON.map((d) => (
          <li key={d.to}>
            <Link className="text-accent hover:underline" to={d.to}>
              {d.label}
            </Link>
            <span className="text-mute"> — Coming soon</span>
          </li>
        ))}
      </ul>

      <h2 id="get" className="font-display text-xl font-bold text-ink pt-8 scroll-mt-20">
        Get started
      </h2>
      <p>
        Birth is one-time. Read the Citizen page for product definition. Technical birth-alias package
        names are not the product noun and are not linked from this portal.
      </p>
      <p className="pt-4">
        <Link className="text-accent hover:underline" to="/citizen">
          Citizen
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/trust">
          Trust
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/executive-brief">
          Executive Brief
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/whitepaper">
          Whitepaper
        </Link>
      </p>
    </Page>
  )
}

export function WhitepaperPage() {
  return (
    <CertifiedDocPage
      title="Whitepaper"
      kicker="Official · Certified"
      src="/docs/Whitepaper.md"
    />
  )
}

export function ExecutiveBriefPage() {
  return (
    <CertifiedDocPage
      title="Executive Brief"
      kicker="Official · Certified"
      src="/docs/Executive_Brief.md"
    />
  )
}
