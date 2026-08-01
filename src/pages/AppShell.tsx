import { NavLink, Outlet } from 'react-router-dom'

const NAV = [
  { to: '/app', label: 'Overview', end: true },
  { to: '/app/roadmap', label: 'Roadmap' },
  { to: '/app/projects', label: 'Projects' },
  { to: '/app/execution', label: 'Execution' },
  { to: '/app/packages', label: 'Packages' },
  { to: '/app/evidence', label: 'Evidence' },
  { to: '/app/certificates', label: 'Certificates' },
  { to: '/app/agents', label: 'Agents' },
  { to: '/app/memory', label: 'Memory' },
  { to: '/app/deploy', label: 'Deploy' },
  { to: '/app/logs', label: 'Logs' },
  { to: '/app/settings', label: 'Settings' },
  { to: '/app/profile', label: 'Profile' },
]

export default function AppShell() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex bg-paper">
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-line bg-white">
        <div className="px-4 py-5 border-b border-line">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">Product</p>
          <p className="font-display font-bold text-sm mt-1">CONRRAD</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                  isActive ? 'bg-accentSoft text-accent' : 'text-mute hover:text-ink hover:bg-paper'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden border-b border-line bg-white overflow-x-auto flex gap-1 px-2 py-2">
          {NAV.slice(0, 6).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `shrink-0 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider border ${
                  isActive ? 'border-accent text-accent bg-accentSoft' : 'border-line text-mute'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  )
}
