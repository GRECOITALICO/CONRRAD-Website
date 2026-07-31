import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { SiteHeader, SiteFooter } from './components/SiteChrome'
import { HardRedirect } from './components/HardRedirect'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AppShell from './pages/AppShell'
import AppOverview from './pages/AppOverview'
import Roadmap from './pages/Roadmap'
import SurfacePage from './pages/SurfacePage'
import { DocumentationPage, WhitepaperPage } from './pages/ProductPages'
import { CitizenPage, TrustPage } from './pages/CanonPages'
import { ChangelogPage, DonatePage, FaqPage } from './pages/AudiencePages'

function PublicLayout() {
  return (
    <>
      <SiteHeader />
      <main className="pt-14 min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <SiteFooter />
      </main>
    </>
  )
}

function AppLayout() {
  return (
    <>
      <SiteHeader />
      <main className="pt-14 min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

/**
 * Website Canon v1.0 routes (INT-WEBSITE-IMPLEMENT-001).
 * Eliminated URLs → REDIRECT (never 404 for prior public content).
 * Static /demo/ and /atlas/ served by filesystem (vercel.json).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Canon Tier 0 */}
          <Route path="/" element={<Landing />} />
          <Route path="/citizen" element={<CitizenPage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/roadmap" element={<Roadmap />} />

          {/* Static products — hard redirect so SPA does not swallow filesystem */}
          <Route path="/demo" element={<HardRedirect to="/demo/" />} />
          <Route path="/yc-demo" element={<HardRedirect to="/demo/" />} />
          <Route path="/atlas" element={<HardRedirect to="/atlas/" />} />
          <Route path="/twin" element={<HardRedirect to="/atlas/" />} />

          {/* MERGE → REDIRECT */}
          <Route path="/architecture" element={<Navigate to="/citizen#architecture" replace />} />
          <Route path="/sdk" element={<Navigate to="/citizen#birth" replace />} />
          <Route path="/evidence" element={<Navigate to="/trust#evidence" replace />} />
          <Route path="/status" element={<Navigate to="/trust" replace />} />
          <Route path="/economic-model" element={<Navigate to="/trust#economy" replace />} />
          <Route path="/problem" element={<Navigate to="/" replace />} />
          <Route path="/why" element={<Navigate to="/citizen" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/investors" element={<Navigate to="/whitepaper" replace />} />
          <Route path="/developers" element={<Navigate to="/documentation" replace />} />
          <Route path="/download" element={<Navigate to="/documentation#get" replace />} />
          <Route path="/pricing" element={<Navigate to="/documentation#get" replace />} />
          <Route path="/technology" element={<Navigate to="/documentation" replace />} />
          <Route path="/technology/:id" element={<Navigate to="/documentation" replace />} />
          <Route path="/product" element={<Navigate to="/documentation" replace />} />
          <Route path="/product/:id" element={<Navigate to="/documentation" replace />} />
          <Route path="/organization" element={<Navigate to="/roadmap" replace />} />
          <Route path="/organization/:id" element={<Navigate to="/roadmap" replace />} />
          <Route path="/ecosystem" element={<Navigate to="/documentation" replace />} />
          <Route path="/ecosystem/:id" element={<Navigate to="/documentation" replace />} />
          <Route path="/ecosystem/documentation" element={<Navigate to="/documentation" replace />} />
          <Route path="/docs" element={<Navigate to="/documentation" replace />} />
          <Route path="/whitepapers" element={<Navigate to="/whitepaper" replace />} />
          <Route path="/blog" element={<Navigate to="/changelog" replace />} />

          {/* Utility KEEP */}
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/donate" element={<DonatePage />} />

          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/app" element={<AppShell />}>
            <Route index element={<AppOverview />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path=":surface" element={<SurfacePage />} />
          </Route>
        </Route>

        {/* Unknown → HOME (compat; prior public URLs all have explicit redirects) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
