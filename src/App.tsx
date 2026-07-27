import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { SiteHeader, SiteFooter } from './components/SiteChrome'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AppShell from './pages/AppShell'
import AppOverview from './pages/AppOverview'
import Roadmap from './pages/Roadmap'
import SurfacePage from './pages/SurfacePage'
import { LayerHub, ModuleDetail } from './pages/LayerPages'
import EvidencePage from './pages/EvidencePage'
import {
  AboutPage,
  ChangelogPage,
  DevelopersPage,
  DonatePage,
  EconomicPage,
  FaqPage,
  InvestorsPage,
  ProblemPage,
  StatusPage,
  TwinOverviewPage,
  WhitepapersPage,
  WhyPage,
} from './pages/AudiencePages'
import {
  ArchitecturePage,
  BlogPage,
  DocumentationPage,
  DownloadPage,
  SdkPage,
  TechnologyPage,
  WhitepaperPage,
  YcDemoPage,
} from './pages/ProductPages'

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/docs" element={<Navigate to="/documentation" replace />} />
          <Route path="/sdk" element={<SdkPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/whitepapers" element={<Navigate to="/whitepaper" replace />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/yc-demo" element={<YcDemoPage />} />
          <Route path="/demo" element={<Navigate to="/yc-demo" replace />} />

          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/why" element={<WhyPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/twin" element={<TwinOverviewPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/economic-model" element={<EconomicPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/product" element={<LayerHub layer="product" />} />
          <Route path="/product/:id" element={<ModuleDetail layer="product" />} />
          <Route path="/technology/:id" element={<ModuleDetail layer="technology" />} />
          <Route path="/organization" element={<LayerHub layer="organization" />} />
          <Route path="/organization/:id" element={<ModuleDetail layer="organization" />} />
          <Route path="/ecosystem" element={<LayerHub layer="ecosystem" />} />
          <Route path="/ecosystem/:id" element={<ModuleDetail layer="ecosystem" />} />
          <Route path="/ecosystem/documentation" element={<Navigate to="/documentation" replace />} />

          <Route path="/pricing" element={<Navigate to="/download" replace />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<AppOverview />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path=":surface" element={<SurfacePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
