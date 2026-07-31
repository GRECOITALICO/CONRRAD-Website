import { Link } from 'react-router-dom'
import { PUBLIC_PRODUCT } from '../lib/identity'
import { useHashScroll } from '../components/HardRedirect'

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

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
      {children}
    </a>
  )
}

export function DocumentationPage() {
  return (
    <Page title="Documentation" kicker="Official">
      <p>
        Official documentation is published from CONRRAD-Docs. This website is not a second SSOT —
        it orients the first visitor and points to depth.
      </p>
      <p>
        <Ext href={PUBLIC_PRODUCT.docsRepo}>Open CONRRAD-Docs</Ext>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Citizen · Birth · Directive · Evolution</li>
        <li>Trust · Evidence · Atlas · Governance</li>
        <li>Deployment · API · Examples</li>
      </ul>

      <h2 id="get" className="font-display text-xl font-bold text-ink pt-8 scroll-mt-20">
        Get · Birth package
      </h2>
      <p>
        Birth is one-time. The public Birth package repository is a technical alias for install — not
        the product name.
      </p>
      <pre className="bg-white border border-line p-4 text-xs font-mono text-ink overflow-x-auto">{`pip install conrrad-sdk
conrrad new hello
cd hello
conrrad run`}</pre>
      <p>
        <Ext href={PUBLIC_PRODUCT.sdk}>Birth package · CONRRAD-SDK</Ext>
        {' · '}
        <Ext href="https://github.com/GRECOITALICO/CONRRAD-Examples">Examples</Ext>
        {' · '}
        <a href={PUBLIC_PRODUCT.whitepaperPdf} className="text-accent hover:underline">
          Whitepaper PDF
        </a>
      </p>
      <p className="pt-4">
        <Link className="text-accent hover:underline" to="/citizen#birth">
          Citizen · Birth
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/trust">
          Trust
        </Link>
      </p>
    </Page>
  )
}

export function WhitepaperPage() {
  return (
    <Page title="Whitepaper" kicker="Official">
      <p>
        CONRRAD Institutional Governance Infrastructure — definitive institutional whitepaper. Covers
        the problem, Citizen architecture, governance, institutional memory, evidence, and economic
        boundary.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={PUBLIC_PRODUCT.whitepaperPdf}
          className="bg-ink text-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Download PDF
        </a>
        <a
          href={PUBLIC_PRODUCT.whitepaperMd}
          className="border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Read Markdown
        </a>
        <Ext href="https://github.com/GRECOITALICO/CONRRAD-Whitepaper">Repository</Ext>
      </div>
      <p className="pt-4">
        <Link className="text-accent hover:underline" to="/citizen">
          Citizen
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/trust">
          Trust
        </Link>
      </p>
    </Page>
  )
}
