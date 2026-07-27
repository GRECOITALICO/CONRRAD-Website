import { Link, useNavigate } from 'react-router-dom'
import { startGuestSession } from '../lib/identity'

/**
 * Preview Authentication — not connected to Runtime Identity.
 * Guest Session only. No Founder / Admin / demo accounts.
 */
export default function Login() {
  const nav = useNavigate()

  function continueAsVisitor() {
    startGuestSession()
    nav('/app')
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-5">
      <div className="w-full max-w-md border border-line bg-white p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute mb-3">
          Preview Authentication
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight mb-3">Sign in</h1>
        <p className="text-sm text-mute mb-6 leading-relaxed">
          Not yet connected to Runtime Identity. There is no Founder, Admin, or demo account on this
          surface. Until real auth exists, you may continue as a visitor.
        </p>

        <ol className="font-mono text-xs text-mute space-y-2 mb-8 border border-line bg-paper p-4">
          <li>1. Login</li>
          <li>2. Preview Authentication</li>
          <li>3. Not yet connected to Runtime Identity</li>
          <li>4. Continue as Visitor → Guest Session</li>
        </ol>

        <button
          type="button"
          onClick={continueAsVisitor}
          className="w-full bg-ink text-paper py-3 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-accent transition-colors"
        >
          Continue as Visitor
        </button>

        <p className="mt-4 text-[11px] text-mute leading-relaxed">
          Guest Session stores only <code className="text-ink">role: guest</code> in sessionStorage.
          No email, JWT, or privileged claim.
        </p>

        <p className="mt-6 text-center text-xs text-mute">
          <Link to="/" className="hover:text-ink">
            ← Home
          </Link>
          {' · '}
          <Link to="/app" className="hover:text-ink">
            Explore product without session
          </Link>
        </p>
      </div>
    </div>
  )
}
