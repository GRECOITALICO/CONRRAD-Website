/** Official YC demonstration flow — compact. */

export type StageStatus = 'AVAILABLE' | 'ACTIVE' | 'PUBLIC_DISABLED'

export type YcDemoStage = {
  id: string
  label: string
  role: string
  status: StageStatus
  fact: string
}

export const YC_DEMO_STAGES: YcDemoStage[] = [
  {
    id: 'founder',
    label: 'Founder',
    role: 'Final accountability',
    status: 'AVAILABLE',
    fact: 'Starts the institutional path.',
  },
  {
    id: 'anny',
    label: 'ANNY',
    role: 'Operational Director · Deployment Authority',
    status: 'ACTIVE',
    fact: 'Keeps institutional identity and holds deploy authority.',
  },
  {
    id: 'harlemm',
    label: 'HARLEMM',
    role: 'Institutional Decision Authority',
    status: 'ACTIVE',
    fact: 'Decides before execution. The institution owns the decision.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    role: 'Sealed record',
    status: 'ACTIVE',
    fact: 'Records decisions and outcomes for audit.',
  },
  {
    id: 'deployment',
    label: 'Deployment Authority',
    role: 'ANNY',
    status: 'ACTIVE',
    fact: 'Deploy intent is governed before cloud execution.',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    role: 'Institution Platform',
    status: 'PUBLIC_DISABLED',
    fact: 'Enterprise destination. Not exposed on the public surface.',
  },
  {
    id: 'telemetry',
    label: 'Telemetry',
    role: 'Return path',
    status: 'ACTIVE',
    fact: 'Returns cost and outcome into Evidence.',
  },
]

const STATUS_LABEL: Record<StageStatus, string> = {
  AVAILABLE: 'Available',
  ACTIVE: 'Active',
  PUBLIC_DISABLED: 'Disabled in public',
}

const STATUS_CLASS: Record<StageStatus, string> = {
  AVAILABLE: 'border-ink text-ink bg-white',
  ACTIVE: 'border-ink text-ink bg-white',
  PUBLIC_DISABLED: 'border-line text-mute bg-white border-dashed',
}

export function YcDemoFlow() {
  return (
    <div className="border border-line bg-white p-5 my-6" aria-label="Atlas institutional flow">
      <ol className="space-y-0 font-mono text-xs text-ink">
        {YC_DEMO_STAGES.map((step, i) => (
          <li key={step.id}>
            <div className="border border-line bg-paper px-3 py-3 space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold tracking-wide">{step.label}</span>
                <span
                  className={`shrink-0 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${STATUS_CLASS[step.status]}`}
                >
                  {STATUS_LABEL[step.status]}
                </span>
              </div>
              <p className="text-[11px] text-mute font-sans">{step.role}</p>
              <p className="text-[11px] text-ink font-sans leading-relaxed">{step.fact}</p>
            </div>
            {i < YC_DEMO_STAGES.length - 1 && (
              <div className="pl-4 py-1 text-mute" aria-hidden>
                ↓
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
