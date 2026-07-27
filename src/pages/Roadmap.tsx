import { Link } from 'react-router-dom'
import { ROADMAP, mvpProgressPct } from '../lib/productCatalog'

export default function Roadmap() {
  const pct = mvpProgressPct()
  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
        Visible Evolution
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">Roadmap</h1>
      <p className="text-mute mb-8 max-w-xl leading-relaxed">
        Each train keeps everything before it. Honest checkboxes only — never permanent empty promises.
      </p>

      <div className="mb-10 border border-line bg-white p-5">
        <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-mute mb-2">
          <span>Overall product progress</span>
          <span className="text-accent">{pct}%</span>
        </div>
        <div className="h-1.5 bg-line overflow-hidden">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        {ROADMAP.map((train) => {
          const done = train.items.filter((i) => i.done).length
          const bar = Math.round((done / train.items.length) * 100)
          return (
            <section key={train.id} className="border border-line bg-white p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h2 className="font-display text-xl font-bold">
                  {train.title}{' '}
                  <span className="text-sm font-semibold text-mute">{train.label}</span>
                </h2>
                <span className="text-xs font-mono text-mute">
                  {done}/{train.items.length}
                </span>
              </div>
              <div className="h-1 bg-line mb-4 overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${bar}%` }} />
              </div>
              <ul className="space-y-2 font-mono text-sm">
                {train.items.map((i) => (
                  <li key={i.text} className={i.done ? 'text-ink' : 'text-mute'}>
                    {i.done ? '✓' : '□'} {i.text}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="mt-10 text-xs text-mute">
        Principles:{' '}
        <Link to="/docs" className="text-accent hover:underline">
          Visible Evolution
        </Link>{' '}
        · Single Web Surface
      </p>
    </div>
  )
}
