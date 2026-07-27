import { Link } from 'react-router-dom'
import { FOUNDER, SOCIALS } from '../lib/identity'
import { MODULES, PRINCIPLES, getModule } from '../lib/siteCatalog'
import { StatusBadge } from '../components/StatusBadge'
import { Wordmark } from '../components/Wordmark'

const PHASE = [
  { label: 'Current Phase', value: 'Public Product' },
  { label: 'Website', value: 'Stable', id: null },
  { label: 'Runtime', value: 'Preview', id: 'runtime' },
  { label: 'SDK', value: 'Public', id: 'sdk' },
  { label: 'Scheduler', value: 'Stable', id: 'scheduler' },
  { label: 'Marketplace', value: 'Planned', id: 'marketplace' },
  { label: 'Nikkole', value: 'Research', id: 'nikkole' },
]

const ARCH = [
  'Cloudflare',
  'Vercel',
  'Control Plane',
  'Runtime (Node-01)',
  'Governance',
  'Execution',
  'Memory',
  'Capabilities',
  'Providers',
]

const TECH_IDS = [
  'harlemm',
  'scheduler',
  'memory-fabric',
  'governance',
  'evidence-system',
  'runtime',
  'execution',
  'observability',
  'marketplace',
  'nikkole',
  'sdk',
  'cli',
  'apis',
  'packages',
  'ige',
]

/** Investor-grade home — explain, do not sell. */
export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-24 pb-20">
          <div className="flex items-center gap-3 mb-10">
            <img src="/icon-48.png" alt="" width={28} height={28} className="w-7 h-7" />
            <Wordmark className="text-2xl" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mute mb-4">
            Governed AI Work · Not another model
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-3xl mb-6">
            Delegate work.
            <br />
            Keep control.
          </h1>
          <p className="text-lg text-mute max-w-2xl leading-relaxed mb-10">
            The market does not need more AI answers. It needs systems that can delegate work without
            losing authority, evidence, or cost control — across whatever intelligence the policy
            requires.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/architecture" className="bg-ink text-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent">
              Architecture
            </Link>
            <Link to="/documentation" className="border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Documentation
            </Link>
            <Link to="/sdk" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink">
              SDK
            </Link>
            <Link to="/yc-demo" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink">
              YC Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-[200px_1fr] gap-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Problem</p>
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">AI produces text. Enterprises need work.</h2>
            <p className="text-mute leading-relaxed max-w-2xl mb-6">
              Today a human still prompts, decides, executes, verifies, and files the trail — or an
              agent acts with no authority, no replay, and no accountable cost. That is the gap
              CONRRAD addresses.
            </p>
            <ul className="space-y-3 text-mute leading-relaxed max-w-2xl">
              <li>— Who authorized the action?</li>
              <li>— Which intelligence ran, under what policy, at what cost?</li>
              <li>— Can it be replayed, audited, and evidenced?</li>
              <li>— Can complex goals be split into governed, executable units?</li>
              <li>— Can you change providers without losing control of the work?</li>
            </ul>
            <Link to="/problem" className="inline-block mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Full problem statement →
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-[200px_1fr] gap-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Why CONRRAD</p>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold mb-4">Governed AI work — not a model zoo</h2>
            <p className="text-mute leading-relaxed mb-6">
              Models are a resource, like CPU. CONRRAD is the governance and evidence layer: route
              work to the appropriate intelligence under policy, keep authority and cost bound, and
              leave a trail you can audit. Local development stays free; cloud deploy is the Pay
              boundary. We show honest status — not mass-market PMF claims.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 font-mono text-xs mb-6">
              {PRINCIPLES.map((p) => (
                <li key={p} className="border border-line px-3 py-2">
                  ✔ {p}
                </li>
              ))}
            </ul>
            <Link to="/why" className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Why CONRRAD →
            </Link>
          </div>
        </div>
      </section>

      {/* Project status */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Project status</p>
          <h2 className="font-display text-2xl font-bold mb-8">Current phase — honest ledger</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PHASE.map((p) => (
              <div key={p.label} className="border border-line bg-white p-4">
                <p className="text-[10px] uppercase tracking-widest text-mute mb-2">{p.label}</p>
                <p className="font-display font-bold text-lg">{p.value}</p>
              </div>
            ))}
          </div>
          <Link to="/status" className="inline-block mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Full status ledger →
          </Link>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Architecture</p>
          <h2 className="font-display text-2xl font-bold mb-8">Public path (ADR-058)</h2>
          <div className="flex flex-col gap-0 max-w-md font-mono text-sm">
            {ARCH.map((step, i) => (
              <div key={step}>
                <div className="border border-line bg-paper px-4 py-3">{step}</div>
                {i < ARCH.length - 1 && <div className="pl-6 py-1 text-mute text-xs">↓</div>}
              </div>
            ))}
          </div>
          <Link to="/technology/architecture" className="inline-block mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Architecture module →
          </Link>
        </div>
      </section>

      {/* Digital Twin CTA */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Digital Twin</p>
          <h2 className="font-display text-2xl font-bold mb-4">
            {MODULES.length} modules · four layers · day one
          </h2>
          <p className="text-mute max-w-2xl mb-8 leading-relaxed">
            Product · Technology · Organization · Ecosystem. Every module has Available today / Not yet.
            Showing a module does not mean it is ready.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/twin" className="bg-ink text-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Open Digital Twin
            </Link>
            <Link to="/product" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Product
            </Link>
            <Link to="/technology" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Technology
            </Link>
            <Link to="/organization" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Organization
            </Link>
            <Link to="/ecosystem" className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]">
              Ecosystem
            </Link>
          </div>
        </div>
      </section>

      {/* Technology strip */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Technology</p>
          <h2 className="font-display text-2xl font-bold mb-8">Horizon with status</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TECH_IDS.map((id) => {
              const m = getModule(id)
              if (!m) return null
              return (
                <Link key={id} to={`/${m.layer}/${m.id}`} className="border border-line p-4 hover:border-accent flex justify-between gap-3">
                  <span className="font-semibold text-sm">{m.title}</span>
                  <StatusBadge status={m.status} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Org / Eco / audiences */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-3 gap-6">
          <Link to="/organization" className="border border-line bg-white p-6 hover:border-accent">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">Organization</p>
            <h3 className="font-display font-bold text-lg mb-2">Vision · Mission · ADRs</h3>
            <p className="text-sm text-mute">Founder {FOUNDER.displayName}. Governance, releases, changelog.</p>
          </Link>
          <Link to="/investors" className="border border-line bg-white p-6 hover:border-accent">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold mb-2">Investors</p>
            <h3 className="font-display font-bold text-lg mb-2">What exists · risks · why now</h3>
            <p className="text-sm text-mute">Accelerator-grade brief without hype.</p>
          </Link>
          <Link to="/developers" className="border border-line bg-white p-6 hover:border-accent">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent mb-2">Developers</p>
            <h3 className="font-display font-bold text-lg mb-2">Architecture · ADRs · SDK</h3>
            <p className="text-sm text-mute">Technical entry — GitHub is the deep docs store.</p>
          </Link>
        </div>
      </section>

      {/* Donate + Evidence + social */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">Sustainability</p>
            <h2 className="font-display text-2xl font-bold mb-4">Community funded</h2>
            <p className="text-mute leading-relaxed mb-4">
              Donations keep CONRRAD independent while preparing accelerator applications. Total received
              to date is published transparently — including zero.
            </p>
            <Link to="/donate" className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              Donate →
            </Link>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Evidence</p>
            <h2 className="font-display text-2xl font-bold mb-4">Traceable status</h2>
            <p className="text-mute leading-relaxed mb-4">
              Builds, deploys, runtime health, and certification posture — no screenshots pretending to be
              proofs.
            </p>
            <Link to="/evidence" className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Evidence page →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 flex flex-wrap gap-4 text-xs text-mute">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink uppercase tracking-widest font-semibold">
            {s.label}
          </a>
        ))}
        <span className="text-line">·</span>
        <span>Founder {FOUNDER.displayName}</span>
      </section>
    </div>
  )
}
