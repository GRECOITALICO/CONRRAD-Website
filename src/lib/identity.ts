/** Public identity & socials — SSOT for surface chrome. */

export const FOUNDER = {
  displayName: 'GRECOITALICO',
  github: 'https://github.com/GRECOITALICO',
  linkedin: 'https://www.linkedin.com/in/grecoitalico/',
  youtube: 'https://www.youtube.com/@ConrradLab',
  x: 'https://x.com/conrradlab',
}

/** Public product surfaces — Canon v1.0 destinations (Citizen-era). */
export const PUBLIC_PRODUCT = {
  docsHome: '/documentation',
  whitepaper: '/whitepaper',
  /** Certified Citizen-era whitepaper (exact copy of CONRRAD/docs/public/Whitepaper.md). */
  whitepaperMd: '/docs/Whitepaper.md',
  executiveBrief: '/executive-brief',
  executiveBriefMd: '/docs/Executive_Brief.md',
  evidence: '/trust#evidence',
  architecture: '/citizen#architecture',
  citizen: '/citizen',
  trust: '/trust',
  atlas: '/atlas/',
  demo: '/demo/',
  glossary: '/documentation/glossary',
  faq: '/documentation/faq',
} as const

export const SOCIALS = [
  { label: 'GitHub', href: FOUNDER.github },
  { label: 'LinkedIn', href: FOUNDER.linkedin },
  { label: 'YouTube', href: FOUNDER.youtube },
  { label: 'X', href: FOUNDER.x },
] as const

/** Guest-only preview session. Never Founder/Admin/Root. */
export const GUEST_SESSION_KEY = 'conrrad_guest_session'

export type GuestSession = {
  role: 'guest'
  at: number
}

export function readGuestSession(): GuestSession | null {
  try {
    const raw = sessionStorage.getItem(GUEST_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as GuestSession
    if (parsed?.role !== 'guest') return null
    return parsed
  } catch {
    return null
  }
}

export function startGuestSession(): GuestSession {
  sessionStorage.removeItem('conrrad_guest_session_v0')
  const session: GuestSession = { role: 'guest', at: Date.now() }
  sessionStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearGuestSession() {
  sessionStorage.removeItem(GUEST_SESSION_KEY)
  sessionStorage.removeItem('conrrad_guest_session_v0')
}
