import { Link } from 'react-router-dom'
import { FOUNDER, SOCIALS } from '../lib/identity'
import { Wordmark } from '../components/Wordmark'

/** HOME — Canon first-visitor entry. Branding/layout system preserved. */
export default function Landing() {
  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-24 pb-20">
          <div className="flex items-center gap-3 mb-10">
            <img src="/icon-48.png" alt="" width={28} height={28} className="w-7 h-7" />
            <Wordmark className="text-2xl" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mute mb-4">
            Institutional Digital Entity · Not another model
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-3xl mb-6">
            The Citizen
            <br />
            is always alive.
          </h1>
          <p className="text-lg text-mute max-w-2xl leading-relaxed mb-10">
            CONRRAD makes autonomous systems governable, attributable, and true. The product is the
            Citizen — a persistent institutional identity with Trust, Evidence, Atlas recognition, and
            a continuous timeline from Birth.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/download/"
              className="bg-ink text-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent"
            >
              Download Citizen
            </Link>
            <Link
              to="/citizen"
              className="border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]"
            >
              Citizen
            </Link>
            <a
              href="/demo/"
              className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink"
            >
              Demo
            </a>
            <Link
              to="/documentation"
              className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper" id="download-citizen">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-[200px_1fr] gap-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Download Citizen</p>
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Citizen Seed 0.1</h2>
            <p className="text-mute leading-relaxed max-w-2xl mb-6">
              Official public seed. One download experience — conrrad.org → Download → GitHub Release
              → install.sh → Citizen Alive.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/download/"
                className="bg-ink text-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent"
              >
                Download Citizen
              </Link>
              <Link
                to="/install/"
                className="border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]"
              >
                Install
              </Link>
              <Link
                to="/verify/"
                className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink"
              >
                Verify
              </Link>
              <Link
                to="/releases/"
                className="border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink"
              >
                Releases
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-[200px_1fr] gap-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Problem</p>
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">
              Enterprises need governed work — not more answers.
            </h2>
            <p className="text-mute leading-relaxed max-w-2xl mb-6">
              Without institutional identity, authority collapses onto a human — or onto ungoverned
              automation with no replay and no accountable cost. CONRRAD closes that gap with the
              Citizen.
            </p>
            <ul className="space-y-3 text-mute leading-relaxed max-w-2xl">
              <li>— Who authorized the action?</li>
              <li>— Which intelligence ran, under what policy, at what cost?</li>
              <li>— Can it be replayed, audited, and evidenced?</li>
              <li>— Does the same identity remain after Evolution?</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">First visit</p>
          <h2 className="font-display text-2xl font-bold mb-8">Canon path</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { to: '/citizen', label: 'Citizen', d: 'What the product is', external: false },
              { to: '/atlas/', label: 'Atlas', d: 'See the Citizen', external: true },
              { to: '/trust', label: 'Trust', d: 'Evidence & honesty', external: false },
              { to: '/demo/', label: 'Demo', d: 'Business Proof', external: true },
            ].map((c) =>
              c.external ? (
                <a key={c.to} href={c.to} className="border border-line bg-paper p-5 hover:border-accent">
                  <p className="font-display font-bold text-lg mb-1">{c.label}</p>
                  <p className="text-sm text-mute">{c.d}</p>
                </a>
              ) : (
                <Link key={c.to} to={c.to} className="border border-line bg-paper p-5 hover:border-accent">
                  <p className="font-display font-bold text-lg mb-1">{c.label}</p>
                  <p className="text-sm text-mute">{c.d}</p>
                </Link>
              ),
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.14em]">
            <Link to="/documentation" className="text-accent">
              Documentation →
            </Link>
            <Link to="/executive-brief" className="text-accent">
              Executive Brief →
            </Link>
            <Link to="/whitepaper" className="text-accent">
              Whitepaper →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-16 grid md:grid-cols-3 gap-6">
          <div className="border border-line bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">Birth</p>
            <h3 className="font-display font-bold text-lg mb-2">Once</h3>
            <p className="text-sm text-mute">
              Institutional creation of a Citizen. Bootstrap disappears afterward.
            </p>
          </div>
          <div className="border border-line bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">Directive</p>
            <h3 className="font-display font-bold text-lg mb-2">Policy</h3>
            <p className="text-sm text-mute">Rules may change. Identity does not.</p>
          </div>
          <div className="border border-line bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">Evolution</p>
            <h3 className="font-display font-bold text-lg mb-2">Same Citizen</h3>
            <p className="text-sm text-mute">Capability grows on one continuous timeline.</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-5 pb-16">
          <Link to="/citizen" className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Full Citizen explanation →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 flex flex-wrap gap-4 text-xs text-mute">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink uppercase tracking-widest font-semibold"
          >
            {s.label}
          </a>
        ))}
        <span className="text-line">·</span>
        <span>Founder {FOUNDER.displayName}</span>
      </section>
    </div>
  )
}
