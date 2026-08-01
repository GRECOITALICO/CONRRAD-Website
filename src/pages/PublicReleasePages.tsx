import { Link } from 'react-router-dom'
import { CITIZEN_PUBLIC } from '../lib/identity'
import type { ReactNode } from 'react'

const btnPrimary =
  'inline-block bg-ink text-paper px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-accent'
const btnGhost =
  'inline-block border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:bg-paper'
const btnLine =
  'inline-block border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] hover:border-ink'

function PageShell({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-b border-line bg-white min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-5 pt-20 pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mute mb-4">{kicker}</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-8">{title}</h1>
        {children}
      </div>
    </div>
  )
}

/** https://conrrad.org/download/ — official download gate */
export function DownloadPage() {
  return (
    <PageShell kicker="Official entry" title="Citizen Seed 0.1">
      <p className="text-lg text-mute leading-relaxed mb-10 max-w-2xl">
        First Empirical Birth — certified public seed. Install once, wake as a permanent living
        Citizen. Download always opens the official GitHub Release — never a file hosted on this
        website.
      </p>
      <div className="flex flex-wrap gap-3 mb-12">
        <a href={CITIZEN_PUBLIC.githubRelease} className={btnPrimary} rel="noopener noreferrer">
          Download
        </a>
        <Link to="/install/" className={btnGhost}>
          Documentation
        </Link>
        <Link to="/verify/" className={btnLine}>
          Verify
        </Link>
        <Link to="/releases/" className={btnLine}>
          Release Notes
        </Link>
      </div>
      <ol className="space-y-3 text-mute text-sm leading-relaxed border border-line bg-paper p-6">
        <li>
          <strong className="text-ink">1.</strong> Download from GitHub Releases
        </li>
        <li>
          <strong className="text-ink">2.</strong> Follow Install → Birth → Sync
        </li>
        <li>
          <strong className="text-ink">3.</strong> Verify integrity, then open the Citizen Console
        </li>
      </ol>
      <p className="mt-8 text-xs text-mute">
        Canonical path: <code className="text-ink">https://conrrad.org/download/</code>
      </p>
    </PageShell>
  )
}

/** https://conrrad.org/releases/ */
export function ReleasesPage() {
  const rows = CITIZEN_PUBLIC.releases
  return (
    <PageShell kicker="Releases" title="Citizen Releases">
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold mb-4">Current Stable</h2>
        <div className="border border-line bg-paper p-6">
          <p className="font-display text-2xl font-bold mb-2">{CITIZEN_PUBLIC.currentStable.name}</p>
          <p className="text-sm text-mute mb-1">Released {CITIZEN_PUBLIC.currentStable.date}</p>
          <p className="text-sm text-mute mb-4">Tag {CITIZEN_PUBLIC.currentStable.tag}</p>
          <a href={CITIZEN_PUBLIC.githubRelease} className={btnPrimary} rel="noopener noreferrer">
            Open GitHub Release
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl font-bold mb-4">Previous Releases</h2>
        {rows.filter((r) => !r.current).length === 0 ? (
          <p className="text-mute text-sm">No previous public releases — 0.1 is the first.</p>
        ) : (
          <ul className="space-y-3">
            {rows
              .filter((r) => !r.current)
              .map((r) => (
                <li key={r.tag} className="border border-line p-4 flex flex-wrap justify-between gap-2">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-sm text-mute">{r.date}</span>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl font-bold mb-4">Integrity Hashes</h2>
        <p className="text-mute text-sm mb-4">
          Official SHA-256 checksums ship with every GitHub Release asset set. Never trust a file
          without verifying against the release checksums.
        </p>
        <a href={CITIZEN_PUBLIC.githubReleaseChecksums} className={btnGhost} rel="noopener noreferrer">
          View checksums on GitHub
        </a>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-4">Release Dates</h2>
        <table className="w-full text-sm border border-line">
          <thead>
            <tr className="bg-paper text-left">
              <th className="p-3 border-b border-line">Release</th>
              <th className="p-3 border-b border-line">Date</th>
              <th className="p-3 border-b border-line">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tag}>
                <td className="p-3 border-b border-line">{r.name}</td>
                <td className="p-3 border-b border-line text-mute">{r.date}</td>
                <td className="p-3 border-b border-line">{r.current ? 'Current Stable' : 'Previous'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  )
}

/** https://conrrad.org/install/ */
export function InstallPage() {
  const steps = [
    {
      t: 'Instalación',
      d: 'Unpack the platform archive from the GitHub Release. Enter the citizen directory.',
    },
    {
      t: 'Primer nacimiento',
      d: 'Run ./install.sh (or the platform service installer). Birth seals identity once.',
    },
    {
      t: 'Primer arranque',
      d: 'Citizen wakes: self-check → memory → identity → heartbeat. OS service keeps it alive.',
    },
    {
      t: 'Primer Sync',
      d: 'Open the Citizen Console and press SYNC — Handshake, Evidence, Telemetry, Update, Synchronization.',
    },
    {
      t: 'Citizen Alive',
      d: 'Console at http://localhost:3434 — Alive is independent of Connected.',
    },
  ]
  return (
    <PageShell kicker="Install" title="Install Citizen Seed 0.1">
      <ol className="space-y-6 mb-10">
        {steps.map((s, i) => (
          <li key={s.t} className="border border-line bg-paper p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-1">
              Step {i + 1}
            </p>
            <h2 className="font-display text-xl font-bold mb-2">{s.t}</h2>
            <p className="text-mute text-sm leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        <a href={CITIZEN_PUBLIC.githubRelease} className={btnPrimary} rel="noopener noreferrer">
          Download
        </a>
        <Link to="/verify/" className={btnGhost}>
          Verify
        </Link>
      </div>
    </PageShell>
  )
}

/** https://conrrad.org/verify/ */
export function VerifyPage() {
  return (
    <PageShell kicker="Verify" title="Verify Citizen Seed">
      <div className="space-y-8 text-mute leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-2">SHA256</h2>
          <p>
            Compute SHA-256 of each downloaded archive and compare to{' '}
            <code className="text-ink">SHA256SUMS.txt</code> attached to the GitHub Release.
          </p>
          <pre className="mt-3 bg-paper border border-line p-4 text-xs text-ink overflow-x-auto">{`sha256sum citizen-seed-0.1.0-*.tar.gz
# or: shasum -a 256 …`}</pre>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-2">Firma</h2>
          <p>
            Seed Assets use the publisher signature model inside the package. Public release
            archives are integrity-checked via SHA-256 checksums published with the Release.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-2">Integridad</h2>
          <p>
            Do not run install.sh on an archive whose checksum does not match. Prefer the official
            Release assets for Linux, Windows, and macOS.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-2">Verificación</h2>
          <p>After install:</p>
          <pre className="mt-3 bg-paper border border-line p-4 text-xs text-ink overflow-x-auto">{`# from CONRRAD scripts/ or citizen/scripts/
./scripts/verify_service.sh
# Citizen Console → http://localhost:3434/`}</pre>
        </section>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={CITIZEN_PUBLIC.githubRelease} className={btnPrimary} rel="noopener noreferrer">
          GitHub Release
        </a>
        <Link to="/download/" className={btnGhost}>
          Download
        </Link>
      </div>
    </PageShell>
  )
}
