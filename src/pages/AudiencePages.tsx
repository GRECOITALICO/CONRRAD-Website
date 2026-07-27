import { Link } from 'react-router-dom'
import {
  FAQ,
  LAYERS,
  MODULES,
  PRINCIPLES,
  PUBLIC_CHANGELOG,
  countByStatus,
  modulesByLayer,
} from '../lib/siteCatalog'
import { ModuleCard } from '../components/ModuleCard'
import { StatusBadge } from '../components/StatusBadge'
import { Wordmark } from '../components/Wordmark'

export function ProblemPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 prose-like">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">
        For accelerators · investors · CTOs
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">The problem we solve</h1>

      <div className="space-y-5 text-mute leading-relaxed mb-10">
        <p className="text-ink font-medium text-lg">
          The market does not need more AI. It needs systems that can delegate work without losing
          control.
        </p>
        <p>
          LLMs produce text. Enterprises need <em>work</em>: decisions that are authorized, executed
          under policy, evidenced, replayable, and economically bounded. Today that still collapses
          onto a human in the loop — or onto agents that act without authority.
        </p>
      </div>

      <h2 className="font-display text-xl font-bold mb-4 text-ink">The broken loops</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10 font-mono text-xs">
        <div className="border border-line bg-white p-5 space-y-2 text-mute">
          <p className="text-[10px] uppercase tracking-widest text-ink mb-2">Chat loop</p>
          <p>Human → prompt → LLM → text</p>
          <p>→ human decides → executes → verifies</p>
          <p>→ human stores “evidence” → repeat</p>
        </div>
        <div className="border border-line bg-white p-5 space-y-2 text-mute">
          <p className="text-[10px] uppercase tracking-widest text-ink mb-2">Ungoverned agent</p>
          <p>Agent acts → side effects</p>
          <p>→ unknown authority · no durable trail</p>
          <p>→ no replay · no cost policy · no accountability</p>
        </div>
      </div>

      <h2 className="font-display text-xl font-bold mb-4 text-ink">What CONRRAD sells</h2>
      <p className="text-mute leading-relaxed mb-4">
        Not a chatbot. Not a single local model. Not “multi-model” as a feature checklist.
      </p>
      <p className="text-ink font-medium mb-4">
        Gobernabilidad del trabajo realizado por inteligencia artificial.
      </p>
      <ul className="space-y-2 text-mute leading-relaxed mb-6">
        <li>— Who authorized the action?</li>
        <li>— Which intelligence ran, why, under what policy, at what cost?</li>
        <li>— Can it be audited, evidenced, and repeated?</li>
        <li>— Can complex goals be decomposed into governed executable units?</li>
      </ul>
      <p className="text-mute leading-relaxed mb-10">
        Every task should be executed by the most appropriate intelligence available under a{' '}
        <strong className="text-ink font-medium">governed execution policy</strong> — an arsenal of
        models as resources, not the product itself. That is a different category from OpenCode,
        Ollama, or a chat UI.
      </p>

      <h2 className="font-display text-xl font-bold mb-4 text-ink">Honest stage</h2>
      <p className="text-mute leading-relaxed mb-10">
        We are in Visible Evolution: public digital twin, certified runtime path, frozen planning
        contracts, open SDK with local free / deploy Pay boundary (CAS-4). We do not claim
        mass-market SaaS or that every monorepo file is already an Institutional Asset.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link to="/why" className="bg-ink text-paper px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]">
          Why CONRRAD
        </Link>
        <Link to="/status" className="border border-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]">
          What works today
        </Link>
        <Link to="/investors" className="border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]">
          Investor brief
        </Link>
      </div>
    </article>
  )
}

export function WhyPage() {
  const points = [
    {
      t: 'Governed work, not chat',
      d: 'Authorize, route, execute, evidence, and bound cost — across whatever intelligence policy requires.',
    },
    { t: 'Architecture First', d: 'CAS specs and ADRs before slogans. Lab ≠ Cluster ≠ Control Plane (ADR-058).' },
    { t: 'Evidence Driven', d: 'Progress requires regenerable receipts — not screenshots of demos.' },
    { t: 'Visible Evolution', d: 'The full horizon is public; each module shows honest status.' },
    { t: 'Open Core boundary', d: 'Local SDK free; cloud deploy / attestation is the Pay boundary (CAS-4).' },
    { t: 'Models as resources', d: 'Not competing with OpenAI/Ollama — governing work that may call many models under policy.' },
  ]
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Differentiation</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Why CONRRAD</h1>
      <p className="text-mute max-w-2xl mb-10 leading-relaxed">
        Not another agent framework. Infrastructure so AI work can be delegated without losing
        control — with evidence and an economic boundary that does not tax local development.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.map((p) => (
          <div key={p.t} className="border border-line bg-white p-5">
            <h2 className="font-display font-bold mb-2">{p.t}</h2>
            <p className="text-sm text-mute leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatusPage() {
  const works = MODULES.filter((m) => ['stable', 'public', 'preview'].includes(m.status))
  const next = MODULES.filter((m) =>
    ['early_access', 'in_development', 'planned', 'research'].includes(m.status),
  )
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Honesty ledger</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-3">What works · What&apos;s next</h1>
      <p className="text-mute max-w-2xl mb-10 leading-relaxed">
        Showing a module does not mean you can click Run. Status labels are conservative on purpose.
      </p>
      <h2 className="font-display text-xl font-bold mb-4">Working or visible (Stable / Public / Preview)</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {works.map((m) => (
          <Link
            key={m.id}
            to={`/${m.layer}/${m.id}`}
            className="border border-line bg-white p-4 hover:border-accent"
          >
            <div className="flex justify-between gap-2 mb-2">
              <span className="font-semibold text-sm">{m.title}</span>
              <StatusBadge status={m.status} />
            </div>
            <p className="text-xs text-mute">{m.today[0] || m.blurb}</p>
          </Link>
        ))}
      </div>
      <h2 className="font-display text-xl font-bold mb-4">Upcoming / Research (not ready)</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {next.map((m) => (
          <Link
            key={m.id}
            to={`/${m.layer}/${m.id}`}
            className="border border-dashed border-line bg-white p-4 hover:border-accent"
          >
            <div className="flex justify-between gap-2 mb-2">
              <span className="font-semibold text-sm">{m.title}</span>
              <StatusBadge status={m.status} />
            </div>
            <p className="text-xs text-mute">{m.notYet[0] || m.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function InvestorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
        Accelerators · Investors
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Investor brief</h1>
      <p className="text-mute mb-10 leading-relaxed">
        Founder: GRECOITALICO. Answers first — no pitch theater.
      </p>
      <dl className="space-y-8">
        {[
          {
            k: 'What problem?',
            v: 'Enterprises can generate AI text; they cannot safely delegate AI work without losing authority, evidence, and cost control.',
          },
          {
            k: 'What exists today?',
            v: 'Public digital twin on conrrad.org, CAS architecture corpus, scheduler Freeze C0, open SDK path, certified runtime health path on Node-01, institution Asset Registry (operative inside institution/), evidence regenerators in-repo.',
          },
          {
            k: 'What is working?',
            v: 'Website (Stable), Scheduler (Stable), Runtime path (Preview), SDK (Public), Evidence tooling (Preview). Product Run UI is not first-class yet.',
          },
          {
            k: 'What is certified / frozen?',
            v: 'ADR-058 deployment spaces, Freeze C0 planning contract, Visible Evolution + Single Web Surface. CERT seals still reserved where Founder gates apply. Monorepo-wide “Everything is an Asset” is incomplete.',
          },
          {
            k: 'What is research?',
            v: 'Nikkole (citizen-app draft — NOT AVAILABLE), provider plugins, marketplace, OMEGA learning plane (CAS-7 specified, not shipped product).',
          },
          {
            k: 'What is missing?',
            v: 'Runtime Identity auth, first-class execution UI, memory browser, agent console, self-serve billing, Builder as exclusive mutation door, full Asset coverage outside institution/.',
          },
          {
            k: 'Risks (honest)',
            v: 'Founder-led capacity; pre-commercial stage; donation rails still being finalized; cloud Pay boundary defined but not self-serve; Asset doctrine ahead of monorepo migration.',
          },
          {
            k: 'Why now?',
            v: 'Agent frameworks proliferate without host governance or causal evidence. CONRRAD is the substrate for governed AI work — not another model host.',
          },
          {
            k: 'Sustainability',
            v: 'Community funded until accelerator / production. See Donate — total received published including $0.',
          },
        ].map((row) => (
          <div key={row.k} className="border-b border-line pb-6">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">
              {row.k}
            </dt>
            <dd className="text-ink leading-relaxed">{row.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/status"
          className="bg-ink text-paper px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Status ledger
        </Link>
        <Link
          to="/evidence"
          className="border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Evidence
        </Link>
        <Link
          to="/donate"
          className="border border-gold text-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]"
        >
          Donate
        </Link>
      </div>
    </div>
  )
}

export function DevelopersPage() {
  const links = [
    { t: 'Architecture', d: 'CAS-1 · Lab vs Infra · ADR-058', href: '/technology/architecture', ext: false },
    { t: 'Modules', d: 'Full twin catalog', href: '/twin', ext: false },
    { t: 'Packages', d: 'Execution package model', href: '/product/packages', ext: false },
    { t: 'Repositories', d: 'CONRRAD + SDK', href: 'https://github.com/GRECOITALICO', ext: true },
    { t: 'Runtime', d: 'Health on Node-01', href: 'https://runtime.conrrad.org/__ppe/health', ext: true },
    { t: 'Evidence', d: 'Public evidence board', href: '/evidence', ext: false },
    { t: 'ADRs', d: 'Decision records', href: '/technology/adrs', ext: false },
    { t: 'API', d: 'Early Access', href: '/technology/apis', ext: false },
    { t: 'SDK', d: 'Open core · local free', href: 'https://github.com/GRECOITALICO/CONRRAD-SDK', ext: true },
    { t: 'CLI', d: 'Developer CLI status', href: '/ecosystem/cli', ext: false },
    { t: 'Roadmap', d: 'Product trains', href: '/roadmap', ext: false },
    { t: 'Contribute', d: 'GitHub issues / PRs', href: 'https://github.com/GRECOITALICO/CONRRAD-SDK', ext: true },
  ]
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Developer portal</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-3">Technical entry</h1>
      <p className="text-mute max-w-2xl mb-10 leading-relaxed font-mono text-sm">
        Surface = public SSOT index. Deep specs = GitHub. Local free. Auth = Guest Session until
        Runtime Identity.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {links.map((l) =>
          l.ext ? (
            <a
              key={l.t}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="border border-line bg-white p-4 hover:border-accent"
            >
              <h2 className="font-display font-bold text-sm mb-1">{l.t}</h2>
              <p className="text-xs text-mute">{l.d}</p>
            </a>
          ) : (
            <Link key={l.t} to={l.href} className="border border-line bg-white p-4 hover:border-accent">
              <h2 className="font-display font-bold text-sm mb-1">{l.t}</h2>
              <p className="text-xs text-mute">{l.d}</p>
            </Link>
          ),
        )}
      </div>
      <h2 className="font-display text-xl font-bold mb-4">Ecosystem modules</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulesByLayer('ecosystem').map((m) => (
          <ModuleCard key={m.id} m={m} base="/ecosystem" />
        ))}
      </div>
    </div>
  )
}

export function DonatePage() {
  const TOTAL_USD = 0
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">Sustainability</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">Donate</h1>
      <div className="border border-line bg-white p-6 mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">
          Total received
        </p>
        <p className="font-display text-4xl font-bold tabular-nums">{TOTAL_USD} USD</p>
        <p className="text-xs text-mute mt-2">Published even when zero — transparency over theater.</p>
      </div>
      <div className="space-y-5 text-mute leading-relaxed mb-10">
        <p className="text-ink font-medium">CONRRAD is currently community funded.</p>
        <p>
          Donations allow the project to remain independent while preparing accelerator applications.
          Every donation helps finance: documentation, infrastructure, testing, runtime, research, and
          certification.
        </p>
      </div>
      <div className="space-y-4 mb-10">
        {[
          {
            t: 'GitHub Sponsors',
            s: 'Preferred when enabled for GRECOITALICO.',
            href: 'https://github.com/sponsors/GRECOITALICO',
            state: 'Check availability on GitHub',
          },
          {
            t: 'Open Collective',
            s: 'Transparent collective if adopted.',
            href: null,
            state: 'Not opened yet',
          },
          {
            t: 'Direct / crypto',
            s: 'For infra invoices — contact via GitHub or LinkedIn.',
            href: 'https://github.com/GRECOITALICO',
            state: 'On request',
          },
        ].map((c) => (
          <div key={c.t} className="border border-line bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h2 className="font-display font-bold">{c.t}</h2>
              <span className="text-[10px] uppercase tracking-widest text-gold">{c.state}</span>
            </div>
            <p className="text-sm text-mute mb-3">{c.s}</p>
            {c.href && (
              <a
                className="text-sm text-accent hover:underline"
                href={c.href}
                target="_blank"
                rel="noreferrer"
              >
                Open →
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-mute">
        Customer economics remain CAS-4 (local free / cloud deploy pays). Donations ≠ product billing.
      </p>
      <div className="mt-8">
        <Link
          to="/economic-model"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline"
        >
          Read economic model →
        </Link>
      </div>
    </div>
  )
}

export function EconomicPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">CAS-4</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">Economic model</h1>
      <ul className="space-y-4 text-mute leading-relaxed mb-8">
        <li>
          <strong className="text-ink">Local is free.</strong> Develop, simulate, and run locally with
          the open SDK.
        </li>
        <li>
          <strong className="text-ink">Pay boundary:</strong> institutional deploy / attestation /
          cloud targets — not charging for curiosity.
        </li>
        <li>
          <strong className="text-ink">Evidence before tokenomics.</strong> Monetize evidence; do not
          invent it.
        </li>
        <li>
          <strong className="text-ink">Self-serve billing:</strong> Planned — not live on this surface
          yet.
        </li>
      </ul>
      <a
        className="text-sm text-accent hover:underline"
        href="/ecosystem/documentation"
        target="_blank"
        rel="noreferrer"
      >
        CAS-4 on GitHub →
      </a>
    </article>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center gap-3 mb-6">
        <img src="/icon-48.png" alt="" width={28} height={28} className="w-7 h-7" />
        <Wordmark className="text-2xl" />
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">About</h1>
      <p className="text-mute leading-relaxed mb-6">
        CONRRAD is infrastructure for governed AI work: runtime + governance so delegated work stays
        authorized, observable, and causally traceable. We sell operational continuity with evidence
        — not model hosting.
      </p>
      <h2 className="font-display text-xl font-bold mb-3">Founder</h2>
      <p className="text-mute leading-relaxed mb-2">
        <span className="text-ink font-medium">GRECOITALICO</span>
      </p>
      <ul className="text-sm space-y-1 mb-8">
        <li>
          <a
            className="text-accent hover:underline"
            href="https://github.com/GRECOITALICO"
            target="_blank"
            rel="noreferrer"
          >
            github.com/GRECOITALICO
          </a>
        </li>
        <li>
          <a
            className="text-accent hover:underline"
            href="https://www.linkedin.com/in/grecoitalico/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            className="text-accent hover:underline"
            href="https://www.youtube.com/@ConrradLab"
            target="_blank"
            rel="noreferrer"
          >
            YouTube @ConrradLab
          </a>
        </li>
        <li>
          <a
            className="text-accent hover:underline"
            href="https://x.com/conrradlab"
            target="_blank"
            rel="noreferrer"
          >
            X @CONRRADLAB
          </a>
        </li>
      </ul>
      <h2 className="font-display text-xl font-bold mb-3">Mission</h2>
      <p className="text-mute leading-relaxed mb-6">
        Convert AI work into governed, verifiable, economically sustainable infrastructure.
      </p>
      <h2 className="font-display text-xl font-bold mb-3">Principles</h2>
      <ul className="grid sm:grid-cols-2 gap-2 mb-10 font-mono text-sm">
        {PRINCIPLES.map((p) => (
          <li key={p} className="border border-line bg-white px-3 py-2">
            ✔ {p}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link to="/organization" className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Organization layer →
        </Link>
        <Link
          to="/organization/nikkole"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-gold"
        >
          Nikkole · Research · NOT AVAILABLE →
        </Link>
      </div>
    </div>
  )
}

export function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-10">FAQ</h1>
      <div className="space-y-8">
        {FAQ.map((f) => (
          <div key={f.q} className="border-b border-line pb-6">
            <h2 className="font-display font-bold text-lg mb-2">{f.q}</h2>
            <p className="text-mute leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-10">Changelog</h1>
      <div className="space-y-10">
        {PUBLIC_CHANGELOG.map((c) => (
          <section key={c.ver} className="border border-line bg-white p-6 font-mono text-xs">
            <p className="font-bold text-sm mb-1">
              Version {c.ver} · {c.date}
            </p>
            {c.added.length > 0 && (
              <>
                <p className="text-accent mt-4 mb-2">Added</p>
                <ul className="space-y-1 text-mute">
                  {c.added.map((a) => (
                    <li key={a}>✓ {a}</li>
                  ))}
                </ul>
              </>
            )}
            {c.fixed.length > 0 && (
              <>
                <p className="text-ink mt-4 mb-2">Fixed</p>
                <ul className="space-y-1 text-mute">
                  {c.fixed.map((a) => (
                    <li key={a}>✓ {a}</li>
                  ))}
                </ul>
              </>
            )}
            {c.known.length > 0 && (
              <>
                <p className="text-gold mt-4 mb-2">Known Issues</p>
                <ul className="space-y-1 text-mute">
                  {c.known.map((a) => (
                    <li key={a}>• {a}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export function WhitepapersPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Whitepapers</h1>
      <p className="text-mute mb-8 leading-relaxed">
        Canonical papers live in the repository. This page is the public index — not a claim that
        every paper is product-ready.
      </p>
      <ul className="space-y-4">
        {[
          {
            t: 'Whitepaper v2',
            h: '/investors',
          },
          {
            t: 'CAS-1 Architecture',
            h: '/technology/architecture',
          },
          {
            t: 'CAS-4 Economic',
            h: '/ecosystem/documentation',
          },
        ].map((w) => (
          <li key={w.t}>
            <a className="text-accent hover:underline font-medium" href={w.h} target="_blank" rel="noreferrer">
              {w.t} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TwinOverviewPage() {
  const counts = countByStatus()
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Digital twin</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-3">Full horizon</h1>
      <p className="text-mute max-w-2xl mb-8 leading-relaxed">
        {MODULES.length} modules across four layers — each with an honest status from day one.
      </p>
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.entries(counts).map(([k, n]) =>
          n > 0 ? (
            <span
              key={k}
              className="border border-line bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mute"
            >
              {k.replace('_', ' ')} · {n}
            </span>
          ) : null,
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {LAYERS.map((l) => (
          <Link key={l.id} to={l.path} className="border border-line bg-white p-6 hover:border-accent">
            <h2 className="font-display text-2xl font-bold mb-2">{l.title}</h2>
            <p className="text-sm text-mute mb-3">{l.blurb}</p>
            <p className="font-mono text-xs text-accent">{modulesByLayer(l.id).length} modules →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
