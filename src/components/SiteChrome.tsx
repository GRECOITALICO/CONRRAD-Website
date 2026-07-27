import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FOUNDER, SOCIALS } from '../lib/identity'
import { Wordmark } from './Wordmark'

const PRIMARY = [
  { to: '/architecture', label: 'Architecture' },
  { to: '/technology', label: 'Technology' },
  { to: '/documentation', label: 'Docs' },
  { to: '/sdk', label: 'SDK' },
  { to: '/whitepaper', label: 'Whitepaper' },
  { to: '/blog', label: 'Blog' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/download', label: 'Download' },
  { to: '/yc-demo', label: 'YC Demo' },
]

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

        <nav className="hidden lg:flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
          {PRIMARY.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link to="/donate" className="text-gold hover:text-ink">
            Donate
          </Link>
          <Link to="/app" className="hover:text-ink">
            App
          </Link>
          <Link to="/login" className="bg-ink text-paper px-3 py-2 hover:bg-accent">
            Visitor
          </Link>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper px-5 py-4 grid grid-cols-2 gap-3 text-[11px] font-semibold uppercase tracking-[0.12em]">
          {PRIMARY.map((l) => (
            <Link key={l.to} to={l.to} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link to="/donate" onClick={close} className="text-gold">
            Donate
          </Link>
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
            Public digital twin of CONRRAD. Founder {FOUNDER.displayName}.
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Explore</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/twin" className="hover:text-accent">
                Digital Twin
              </Link>
            </li>
            <li>
              <Link to="/status" className="hover:text-accent">
                Status
              </Link>
            </li>
            <li>
              <Link to="/evidence" className="hover:text-accent">
                Evidence
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="hover:text-accent">
                Roadmap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Build</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/developers" className="hover:text-accent">
                Developers
              </Link>
            </li>
            <li>
              <Link to="/investors" className="hover:text-accent">
                Investors
              </Link>
            </li>
            <li>
              <a className="hover:text-accent" href={FOUNDER.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <Link to="/faq" className="hover:text-accent">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-3">Sustain</p>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/donate" className="text-gold hover:text-ink">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/economic-model" className="hover:text-accent">
                Economic model
              </Link>
            </li>
            <li>
              <Link to="/changelog" className="hover:text-accent">
                Changelog
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center font-mono text-[10px] text-mute">
        conrrad.org · Control Plane · runtime.conrrad.org · Node-01
      </div>
    </footer>
  )
}
