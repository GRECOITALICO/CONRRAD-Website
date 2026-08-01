/** Institutional public narrative — visitor-facing. One idea. Fast scan. */

export const PUBLIC_CANON = {
  thesis:
    'CONRRAD allows an organization to delegate work to multiple AI systems while maintaining institutional control, evidence, and governance.',
  problem:
    'Organizations can generate AI text, but cannot safely delegate real work across multiple AI systems without losing authority, evidence, or cost control.',
  how:
    'Governance before execution: ANNY keeps identity and Deployment Authority; HARLEMM is Institutional Decision Authority; SULLY executes under contract; Evidence records outcomes.',
  why:
    'Every institution that uses AI will need to delegate work without surrendering control. That layer becomes shared infrastructure.',
  authority: {
    harlemm: 'Institutional Decision Authority',
    harlemmAlt: 'Institutional Governance Authority',
    anny: 'Operational Director · Deployment Authority',
    sully: 'Execution Worker · Infrastructure Executor',
  },
  ycFlow:
    'Founder → ANNY → HARLEMM → Evidence → Deployment Authority → Cloud → Telemetry',
  githubOwner: 'GRECOITALICO',
} as const
