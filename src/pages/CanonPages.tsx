import { Link } from 'react-router-dom'
import { useHashScroll } from '../components/HardRedirect'

function Page({
  title,
  kicker,
  children,
}: {
  title: string
  kicker: string
  children: React.ReactNode
}) {
  useHashScroll()
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">{kicker}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6">{title}</h1>
      <div className="prose-like text-mute leading-relaxed space-y-4 text-[15px]">{children}</div>
    </div>
  )
}

/**
 * CITIZEN — single official explanation of the product.
 * Architecture + Birth live here (MERGE from /architecture, /sdk).
 */
export function CitizenPage() {
  return (
    <Page title="Citizen" kicker="The product">
      <p className="text-ink font-medium text-lg">
        A Citizen is a persistent institutional identity — continuous timeline, governed life, memory,
        trust, evidence, and recognition. The Citizen is the product.
      </p>
      <p>
        Atlas, Demo, and the Control Plane are sibling surfaces. Bootstrap exists only for Birth —
        then it disappears. The Citizen is always alive.
      </p>

      <h2 id="what" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        What a Citizen is
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Single continuous identity from Birth</li>
        <li>Permanent governed life on a host</li>
        <li>Memory belonging to that identity</li>
        <li>Institutional Trust (identity · certificate · registration)</li>
        <li>Obligations of Evidence, Atlas, Observatory, and Governance</li>
        <li>Capacity to evolve without changing identity</li>
      </ul>

      <h2 id="not" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        What a Citizen is not
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Not an AI Agent</li>
        <li>Not a library, framework, or editor session</li>
        <li>Not a chat product or model zoo</li>
        <li>Not a disposable container process</li>
      </ul>

      <h2 id="birth" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        Birth
      </h2>
      <p>
        Birth is the one-time institutional creation of a Citizen. The Birth package installs once;
        afterward Bootstrap is gone. Package names such as <code className="text-ink">conrrad-sdk</code>{' '}
        are technical aliases only — not the product noun.
      </p>
      <p>
        Get started:{' '}
        <Link className="text-accent hover:underline" to="/documentation">
          Documentation
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

      <h2 id="directive" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        Directive
      </h2>
      <p>
        A Directive changes policy or rules. Identity does not change. Directives are governed — not
        prompt improvisation.
      </p>

      <h2 id="evolution" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        Evolution
      </h2>
      <p>
        Evolution grows capability on the same Citizen timeline. Updates are not reinstalls and not
        new Citizens. Always the same identity, advancing its lifeline.
      </p>

      <h2 id="architecture" className="font-display text-xl font-bold text-ink pt-6 scroll-mt-20">
        Architecture
      </h2>
      <p>
        CONRRAD separates human language, deterministic governance, inference economy, institutional
        identity, measured memory, and append-only evidence.
      </p>
      <pre className="bg-white border border-line p-4 text-xs font-mono text-ink overflow-x-auto whitespace-pre">{`Human language
  → HIT (translation)
    → HARLEMM (deterministic governance)
         → Deterministic tasks
         → InferenceRequired → SULLY
    → Institutional identity
    → Institutional Memory
    → Evidence (SHA-256 append-only)`}</pre>
      <p>
        Deep dive:{' '}
        <Link className="text-accent hover:underline" to="/documentation">
          Documentation
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/trust">
          Trust
        </Link>
        {' · '}
        <Link className="text-accent hover:underline" to="/whitepaper">
          Whitepaper
        </Link>
      </p>
    </Page>
  )
}

/**
 * TRUST — single official explanation of Trust / Evidence / status honesty.
 * MERGE from /evidence, /status, /economic-model.
 */
export function TrustPage() {
  useHashScroll()
  const rows = [
    { k: 'Website', v: 'Canon v1.0 surface on conrrad.org', s: 'live' },
    { k: 'Demo', v: 'Business Proof at /demo/', s: 'live', href: '/demo/' },
    { k: 'Atlas', v: 'Digital twin at /atlas/', s: 'live', href: '/atlas/' },
    {
      k: 'Host health',
      v: 'runtime.conrrad.org/__ppe/health',
      s: 'preview',
      href: 'https://runtime.conrrad.org/__ppe/health',
    },
    { k: 'Documentation', v: 'Official docs surface', s: 'live', href: '/documentation' },
    { k: 'Executive Brief', v: 'Certified brief', s: 'live', href: '/executive-brief' },
    { k: 'Whitepaper', v: 'Certified institutional whitepaper', s: 'live', href: '/whitepaper' },
    { k: 'Evidence posture', v: 'Append-only · hash-addressed · replayable (institutional)', s: 'partial' },
    { k: 'Economic boundary', v: 'Local Birth free · cloud deploy is the Pay boundary (CAS-4)', s: 'live' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">Institutional</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">Trust</h1>
      <p className="text-mute leading-relaxed mb-8 max-w-2xl">
        Trust is identity, certificate, registration, evidence, and honest status — not screenshots
        pretending to be proofs. Evidence lives here as the public board; it is not a second product
        story.
      </p>

      <h2 id="evidence" className="font-display text-xl font-bold text-ink mb-4 scroll-mt-20">
        Evidence
      </h2>
      <div className="border border-line divide-y divide-line bg-white mb-10">
        {rows.map((r) => (
          <div key={r.k} className="p-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mute w-40 shrink-0">{r.k}</p>
            <div className="flex-1">
              {r.href ? (
                <a href={r.href} className="text-sm text-accent hover:underline" {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {r.v}
                </a>
              ) : (
                <p className="text-sm text-ink">{r.v}</p>
              )}
              <p className="text-[10px] uppercase tracking-widest text-mute mt-1">{r.s}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="governance" className="font-display text-xl font-bold text-ink mb-3 scroll-mt-20">
        Governance
      </h2>
      <p className="text-mute leading-relaxed mb-8">
        Deterministic governance decides before inference. Policy bounds authority and cost. The
        Citizen remains attributable under institutional rules.
      </p>

      <h2 id="economy" className="font-display text-xl font-bold text-ink mb-3 scroll-mt-20">
        Economic boundary
      </h2>
      <p className="text-mute leading-relaxed mb-8">
        Local Birth and local work stay free. Cloud deploy and attestation are the monetization
        boundary. Sustainability donations are optional and never a primary product CTA.
      </p>

      <p className="text-xs text-mute">
        Related:{' '}
        <Link to="/citizen" className="text-accent hover:underline">
          Citizen
        </Link>
        {' · '}
        <a href="/atlas/" className="text-accent hover:underline">
          Atlas
        </a>
        {' · '}
        <a href="/demo/" className="text-accent hover:underline">
          Demo
        </a>
        {' · '}
        <Link to="/whitepaper" className="text-accent hover:underline">
          Whitepaper
        </Link>
        {' · '}
        <Link to="/executive-brief" className="text-accent hover:underline">
          Executive Brief
        </Link>
      </p>
    </div>
  )
}
