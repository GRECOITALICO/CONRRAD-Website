import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FOUNDER, SOCIALS } from '../lib/identity'
import { Wordmark } from './Wordmark'

/** Primary public nav (exactly 8). Demo/Atlas are static products. */
const PRIMARY: { to: string; label: string; external?: boolean }[] = [
  { to: '/', label: 'Home' },
  { to: '/citizen', label: 'Citizen' },
  { to: '/atlas/', label: 'Atlas', external: true },
  { to: '/trust', label: 'Trust' },
  { to: '/demo/', label: 'Demo', external: true },
  { to: '/documentation', label: 'Documentation' },
  { to: '/whitepaper', label: 'Whitepaper' },
  { to: '/executive-brief', label: 'Executive Brief' },
]

function NavLink({
  to,
  label,
  external,
  onClick,
  className,
}: {
  to: string
  label: string
  external?: boolean
  onClick?: () => void
  className?: string
}) {
  if (external) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {label}
      </a>
    )
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {label}
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={close}>
          <img src="/icon-48.png" alt="" width={22} height={22} className="w-[22px] h-[22px]" />
          <Wordmark className="text-lg text-ink" />
          <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.18em] text-mute border border-line px-2 py-0.5">
            Public
          </span>
        </Link>

        <button
          type="button"
          className="lg:hidden text-xs font-semibold uppercase tracking-widest text-mute"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav className="hidden lg:flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
          {PRIMARY.map((l) => (
            <NavLink key={l.to} {...l} className="hover:text-ink" />
          ))}
          <Link to="/login" className="bg-ink text-paper px-3 py-2 hover:bg-accent">
            Visitor
          </Link>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper px-5 py-4 grid grid-cols-2 gap-3 text-[11px] font-semibold uppercase tracking-[0.12em]">
          {PRIMARY.map((l) => (
            <NavLink key={l.to} {...l} onClick={close} />
          ))}
          <Link to="/login" onClick={close}>
            Visitor
          </Link>
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="mx-auto max-w-6xl px-5 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/icon-48.png" alt="" width={20} height={20} className="w-5 h-5" />
            <Wordmark className="text-base" />
          </div>
          <p className="text-mute text-xs leading-relaxed mb-3">
            Public surface for the CONRRAD Citizen. Founder {FOUNDER.displayName}.
          </p>
          <div className="flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-widest text-mute">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Canon</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/citizen" className="hover:text-accent">
                Citizen
              </Link>
            </li>
            <li>
              <a href="/atlas/" className="hover:text-accent">
                Atlas
              </a>
            </li>
            <li>
              <Link to="/trust" className="hover:text-accent">
                Trust
              </Link>
            </li>
            <li>
              <a href="/demo/" className="hover:text-accent">
                Demo
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Depth</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/documentation" className="hover:text-accent">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/executive-brief" className="hover:text-accent">
                Executive Brief
              </Link>
            </li>
            <li>
              <Link to="/whitepaper" className="hover:text-accent">
                Whitepaper
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Utility</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/login" className="hover:text-accent">
                Visitor
              </Link>
            </li>
            <li>
              <Link to="/changelog" className="hover:text-accent">
                Changelog
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="hover:text-accent">
                Roadmap
              </Link>
            </li>
            <li>
              <a className="hover:text-accent" href={FOUNDER.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center font-mono text-[10px] text-mute">
        conrrad.org · Website Canon v1.0 · Control Plane
      </div>
    </footer>
  )
}
