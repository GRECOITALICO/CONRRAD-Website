/** Surface status lifecycle — honest product evolution (not permanent In progress). */

export type SurfaceStatus = 'informational' | 'early_access' | 'preview' | 'public' | 'stable'

export type SurfaceDef = {
  id: string
  title: string
  blurb: string
  train: string
  status: SurfaceStatus
  milestoneDone?: string[]
  milestoneNext?: string[]
}

export const STATUS_LABEL: Record<SurfaceStatus, string> = {
  informational: 'Informational',
  early_access: 'Early Access',
  preview: 'Preview',
  public: 'Public',
  stable: 'Stable',
}

export const SURFACES: Record<string, SurfaceDef> = {
  projects: {
    id: 'projects',
    title: 'Projects',
    blurb: 'Create and manage workspaces.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['Product shell', 'Navigation'],
    milestoneNext: ['Create project', 'List projects'],
  },
  workspace: {
    id: 'workspace',
    title: 'Workspace',
    blurb: 'Active habitat and runtime context for your agents.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['Product shell'],
    milestoneNext: ['Bind runtime context'],
  },
  agents: {
    id: 'agents',
    title: 'Agents',
    blurb: 'Spawn and govern autonomous agents under Harlemm.',
    train: 'Phase 1.5',
    status: 'informational',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Agent spawn UI'],
  },
  memory: {
    id: 'memory',
    title: 'Memory',
    blurb: 'Institutional memory fabric — read/write with evidence.',
    train: 'Phase 1.5',
    status: 'informational',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Memory browser'],
  },
  execution: {
    id: 'execution',
    title: 'Execution',
    blurb: 'Run tasks against runtime.conrrad.org.',
    train: 'Phase 1.1',
    status: 'preview',
    milestoneDone: ['Product shell', 'Runtime connectivity path'],
    milestoneNext: ['First execution'],
  },
  marketplace: {
    id: 'marketplace',
    title: 'Marketplace',
    blurb: 'Providers and plugins under IGE capability registry.',
    train: 'Phase 2.0',
    status: 'informational',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Provider catalog'],
  },
  packages: {
    id: 'packages',
    title: 'Packages',
    blurb: 'Execution Packages from the planning runtime (Freeze C0).',
    train: 'Phase 1.1',
    status: 'preview',
    milestoneDone: ['Package model', 'Scheduler Freeze C0'],
    milestoneNext: ['In-app package board'],
  },
  evidence: {
    id: 'evidence',
    title: 'Evidence',
    blurb: 'Regenerable receipts, CERT index, and audit trails.',
    train: 'Phase 1.1',
    status: 'preview',
    milestoneDone: ['Regen script', 'CERT index'],
    milestoneNext: ['Evidence viewer UI'],
  },
  certificates: {
    id: 'certificates',
    title: 'Certificates',
    blurb: 'CERT-C1 … CERT-004 lifecycle.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['CERT stubs'],
    milestoneNext: ['Pass seals after Founder gates'],
  },
  deploy: {
    id: 'deploy',
    title: 'Deploy',
    blurb: 'Control Plane (Vercel) + Runtime (Node-01). ADR-058.',
    train: 'Phase 1.1',
    status: 'preview',
    milestoneDone: ['DNS topology', 'Runtime health path'],
    milestoneNext: ['Deploy status panel'],
  },
  logs: {
    id: 'logs',
    title: 'Logs',
    blurb: 'Observability stream for executions and governance events.',
    train: 'Phase 1.5',
    status: 'informational',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Log stream UI'],
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    blurb: 'Org, tokens, and environment preferences.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Prefs form'],
  },
  profile: {
    id: 'profile',
    title: 'Profile',
    blurb: 'Account identity and session.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['Preview session stub'],
    milestoneNext: ['Real identity'],
  },
  pricing: {
    id: 'pricing',
    title: 'Pricing',
    blurb: 'Plans publish with billing in Phase 2.0.',
    train: 'Phase 2.0',
    status: 'informational',
    milestoneDone: ['Shell reserved'],
    milestoneNext: ['Public plans'],
  },
  docs: {
    id: 'docs',
    title: 'Docs',
    blurb: 'Public docs surface. Auditor onboarding remains on GitHub for now.',
    train: 'Phase 1.1',
    status: 'early_access',
    milestoneDone: ['GitHub docs'],
    milestoneNext: ['In-app docs hub'],
  },
}

export const ROADMAP = [
  {
    id: '1.0',
    title: 'Phase 1.0',
    label: 'Minimum Valuable Platform',
    items: [
      { text: 'Single Web Surface (unified product UI)', done: true },
      { text: 'Landing', done: true },
      { text: 'Login (preview)', done: true },
      { text: 'Product shell + navigation', done: true },
      { text: 'Surface lifecycle (Early Access → Stable)', done: true },
      { text: 'Roadmap + evolution card', done: true },
    ],
  },
  {
    id: '1.1',
    title: 'Phase 1.1',
    label: 'Execution Runtime',
    items: [
      { text: 'Runtime connected', done: false },
      { text: 'First execution', done: false },
      { text: 'Packages board in UI', done: false },
      { text: 'Evidence viewer', done: false },
      { text: 'Certificates panel', done: false },
    ],
  },
  {
    id: '1.5',
    title: 'Phase 1.5',
    label: 'Agents & Memory',
    items: [
      { text: 'Memory browser', done: false },
      { text: 'Agents UI', done: false },
      { text: 'Observability / logs', done: false },
    ],
  },
  {
    id: '2.0',
    title: 'Phase 2.0',
    label: 'Marketplace & Billing',
    items: [
      { text: 'Marketplace', done: false },
      { text: 'Billing', done: false },
      { text: 'API keys', done: false },
      { text: 'Providers', done: false },
    ],
  },
]

export function mvpProgressPct(): number {
  const all = ROADMAP.flatMap((r) => r.items)
  const done = all.filter((i) => i.done).length
  return Math.round((done / all.length) * 100)
}
