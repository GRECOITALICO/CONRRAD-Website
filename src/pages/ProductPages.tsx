import { Link } from 'react-router-dom'
import { PUBLIC_PRODUCT } from '../lib/identity'

function Page({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
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

export function ArchitecturePage() {
  return (
    <Page title="Architecture" kicker="Technology">
      <p>
        CONRRAD separates human language, deterministic governance, inference economy, institutional identity,
        measured memory, and append-only evidence.
      </p>
      <pre className="bg-white border border-line p-4 text-xs font-mono text-ink overflow-x-auto whitespace-pre">{`Human / IDE
  → HIT (translation)
    → HARLEMM (deterministic governance)
         → Deterministic tasks
         → InferenceRequired → SULLY
    → ANNY (institutional identity)
    → Institutional Memory (Qdrant)
    → Evidence Factory (SHA-256 append-only)`}</pre>
      <p>
        Public surfaces: Docs, SDK, Website, Whitepaper, Examples. Private institutional surfaces: Core, ANNY,
        HARLEMM, SULLY, Memory.
      </p>
      <p>
        Deep dive: <Ext href={PUBLIC_PRODUCT.docsRepo}>CONRRAD-Docs</Ext> ·{' '}
        <Link className="text-accent hover:underline" to="/technology">
          Technology hub
        </Link>
      </p>
    </Page>
  )
}

export function TechnologyPage() {
  return (
    <Page title="Technology" kicker="Platform">
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link className="text-accent hover:underline" to="/architecture">
            Architecture
          </Link>{' '}
          — HIT · HARLEMM · SULLY · ANNY · Memory · Evidence
        </li>
        <li>
          <Link className="text-accent hover:underline" to="/sdk">
            SDK
          </Link>{' '}
          — open local agent development
        </li>
        <li>
          <Link className="text-accent hover:underline" to="/documentation">
            Documentation
          </Link>{' '}
          — official product docs
        </li>
        <li>
          <Link className="text-accent hover:underline" to="/whitepaper">
            Whitepaper
          </Link>{' '}
          — institutional narrative
        </li>
      </ul>
    </Page>
  )
}

export function DocumentationPage() {
  return (
    <Page title="Documentation" kicker="Official">
      <p>Official documentation is published from CONRRAD-Docs. The website links there — it is not a second SSOT.</p>
      <p>
        <Ext href={PUBLIC_PRODUCT.docsRepo}>Open CONRRAD-Docs</Ext>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Installation · Quick Start · Architecture</li>
        <li>ANNY · HARLEMM · SULLY · Institutional Memory</li>
        <li>Evidence · Governance · Deployment · API · Examples</li>
      </ul>
    </Page>
  )
}

export function SdkPage() {
  return (
    <Page title="SDK" kicker="Developers">
      <p>Build governed agents locally in minutes. No Docker required for Quick Start.</p>
      <pre className="bg-white border border-line p-4 text-xs font-mono text-ink overflow-x-auto">{`pip install conrrad-sdk
conrrad new hello
cd hello
conrrad run`}</pre>
      <p>
        <Ext href={PUBLIC_PRODUCT.sdk}>CONRRAD-SDK</Ext> ·{' '}
        <Ext href="https://github.com/GRECOITALICO/CONRRAD-Examples">CONRRAD-Examples</Ext>
      </p>
    </Page>
  )
}

export function WhitepaperPage() {
  return (
    <Page title="Whitepaper" kicker="Official">
      <p>
        CONRRAD Institutional Governance Infrastructure — definitive product whitepaper. Explains the problem,
        architecture, ANNY, HARLEMM, SULLY, institutional memory, evidence, deterministic AI, economics, and YC
        positioning.
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
    </Page>
  )
}

export function BlogPage() {
  return (
    <Page title="Blog" kicker="Updates">
      <article className="border border-line bg-white p-5">
        <p className="text-[10px] uppercase tracking-widest text-mute mb-2">Release</p>
        <h2 className="font-display text-xl font-bold text-ink mb-2">Public Release Candidate 1.0</h2>
        <p>
          CONRRAD product family is live under GRECOITALICO: Docs, SDK, Website, Whitepaper, and Examples. Archived historical repositories are not the active product surface.
        </p>
      </article>
      <article className="border border-line bg-white p-5">
        <p className="text-[10px] uppercase tracking-widest text-mute mb-2">Architecture</p>
        <h2 className="font-display text-xl font-bold text-ink mb-2">Deterministic governance before inference</h2>
        <p>
          HARLEMM decides; SULLY routes inference only when required. Identity continuity across LLM lanes is an
          institutional property, not a prompt trick.
        </p>
      </article>
    </Page>
  )
}

export function DownloadPage() {
  return (
    <Page title="Download" kicker="Get started">
      <ul className="space-y-4">
        <li className="border border-line bg-white p-4">
          <p className="font-semibold text-ink">SDK</p>
          <p className="mb-2">`pip install conrrad-sdk`</p>
          <Ext href={PUBLIC_PRODUCT.sdk}>GitHub · CONRRAD-SDK</Ext>
        </li>
        <li className="border border-line bg-white p-4">
          <p className="font-semibold text-ink">Whitepaper PDF</p>
          <a href={PUBLIC_PRODUCT.whitepaperPdf} className="text-accent hover:underline">
            CONRRAD_INSTITUTIONAL_WHITEPAPER_v1.pdf
          </a>
        </li>
        <li className="border border-line bg-white p-4">
          <p className="font-semibold text-ink">Examples</p>
          <Ext href="https://github.com/GRECOITALICO/CONRRAD-Examples">CONRRAD-Examples</Ext>
        </li>
        <li className="border border-line bg-white p-4">
          <p className="font-semibold text-ink">Release Candidate package</p>
          <p>Prepared for operators — Docker / Compose / CI artifacts ship with RC 1.0 (not auto-published).</p>
        </li>
      </ul>
    </Page>
  )
}

export function YcDemoPage() {
  return (
    <Page title="YC Demo" kicker="Live narrative">
      <ol className="list-decimal pl-5 space-y-3">
        <li>
          <strong className="text-ink">ANNY</strong> — identity continuity across GPT → Cursor → Antigravity → Local →
          GPT
        </li>
        <li>
          <strong className="text-ink">HARLEMM</strong> — deterministic decision boundaries (no LLM inside governance)
        </li>
        <li>
          <strong className="text-ink">SULLY</strong> — automatic inference routing with GPU automation
        </li>
        <li>
          <strong className="text-ink">Institutional Memory</strong> — measured Qdrant collections and queries
        </li>
        <li>
          <strong className="text-ink">Evidence</strong> — append-only, hash-addressed, replayable
        </li>
      </ol>
      <p className="pt-4">
        <Link className="text-accent hover:underline" to="/architecture">
          Architecture
        </Link>{' '}
        ·{' '}
        <Link className="text-accent hover:underline" to="/whitepaper">
          Whitepaper
        </Link>{' '}
        · <Ext href={PUBLIC_PRODUCT.sdk}>SDK</Ext>
      </p>
    </Page>
  )
}
