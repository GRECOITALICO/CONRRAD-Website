/** Public identity & socials — SSOT for surface chrome. */

export const FOUNDER = {
  displayName: 'GRECOITALICO',
  github: 'https://github.com/GRECOITALICO',
  linkedin: 'https://www.linkedin.com/in/grecoitalico/',
  youtube: 'https://www.youtube.com/@ConrradLab',
  x: 'https://x.com/conrradlab',
}

/** Public product surfaces only — never link private monorepo trees. */
export const PUBLIC_PRODUCT = {
  sdk: 'https://github.com/GRECOITALICO/CONRRAD-SDK',
  docsHome: '/documentation',
  docsRepo: 'https://github.com/GRECOITALICO/CONRRAD-Docs',
  whitepaper: '/whitepaper',
  whitepaperPdf: '/CONRRAD_INSTITUTIONAL_WHITEPAPER_v1.pdf',
  whitepaperMd: '/CONRRAD_INSTITUTIONAL_WHITEPAPER_v1.md',
  evidence: '/evidence',
  architecture: '/architecture',
  examples: 'https://github.com/GRECOITALICO/CONRRAD-Examples',
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
  // Purge any prior insecure session keys
  sessionStorage.removeItem('conrrad_guest_session_v0')
  const session: GuestSession = { role: 'guest', at: Date.now() }
  sessionStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearGuestSession() {
  sessionStorage.removeItem(GUEST_SESSION_KEY)
  sessionStorage.removeItem('conrrad_guest_session_v0')
}
