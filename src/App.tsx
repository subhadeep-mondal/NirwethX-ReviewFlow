import type * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, QrCode, MessageSquareText, ChartNoAxesCombined, Bell, Settings, CreditCard, LogOut, Menu, X, Sparkles, ExternalLink, LifeBuoy, Store } from 'lucide-react'
import { useAuth } from './lib/auth'
import { api } from './lib/api'
import { Loading } from './components/UI'
import { LoginPage, RegisterPage } from './pages/AuthPages'
import Overview from './pages/Overview'
import QRsPage from './pages/QRs'
import FeedbackPage from './pages/Feedback'
import AnalyticsPage from './pages/Analytics'
import NotificationsPage from './pages/Notifications'
import SettingsPage from './pages/Settings'
import BillingPage from './pages/Billing'
import PublicReviewPage from './pages/PublicReview'
import ContactPage from './pages/Contact'
import LandingPage from './pages/Landing'
import LegalPage from './pages/LegalPage'

type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean; count?: number }

function Protected({ children }: { children: React.ReactNode }) { const { user, loading } = useAuth(); if (loading) return <Loading/>; return user ? <>{children}</> : <Navigate to="/login" replace/> }

function AppLayout() {
  const { user, business, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const [toast, setToast] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    let source: EventSource | undefined
    let active = true
    api.get('/api/notifications').then(({data}) => { if (active) setUnread(data.filter((n: {is_read:boolean}) => !n.is_read).length) }).catch(() => {})
    const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    source = new EventSource(`${base}/api/notifications/stream`, { withCredentials: true })
    source.addEventListener('notification', () => { setUnread(n => n + 1); setToast('New customer feedback received'); window.setTimeout(() => setToast(''), 4200) })
    return () => { active = false; source?.close() }
  }, [])
  useEffect(() => setOpen(false), [location.pathname])
  const navItems: NavItem[] = [
    { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/app/qrs', label: 'QR standees', icon: QrCode },
    { to: '/app/feedback', label: 'Feedback inbox', icon: MessageSquareText },
    { to: '/app/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
    { to: '/app/notifications', label: 'Notifications', icon: Bell, count: unread },
  ]
  const secondary: NavItem[] = [{to:'/app/settings', label:'Business settings', icon:Settings}, {to:'/app/billing', label:'Plans & billing', icon:CreditCard}]
  return <div className="app-shell">
    {open && <button className="mobile-scrim" onClick={() => setOpen(false)} aria-label="Close menu"/>}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Sparkles size={19}/></span><span>NirwethX<span className="brand-light">ReviewFlow</span></span><button className="mobile-close" onClick={() => setOpen(false)}><X/></button></div>
      <div className="workspace-switch"><span className="workspace-icon"><Store size={16}/></span><span><b>{business?.business_name || 'Your business'}</b><small>{business?.city || 'Workspace'}</small></span><span className="switch-dot"/></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav">{navItems.map(item => <NavLink key={item.to} to={item.to} end={item.end} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}><item.icon size={18}/><span>{item.label}</span>{item.count ? <em>{item.count > 9 ? '9+' : item.count}</em> : null}</NavLink>)}</nav>
      <div className="nav-caption second-caption">PREFERENCES</div>
      <nav className="side-nav">{secondary.map(item => <NavLink key={item.to} to={item.to} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}><item.icon size={18}/><span>{item.label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="support-card"><div className="support-icon"><LifeBuoy size={17}/></div><b>Need a hand?</b><p>Our team is here to help you grow.</p><button onClick={() => navigate('/contact')}>Contact support <ExternalLink size={13}/></button></div><div className="profile-row"><div className="avatar">{user?.full_name?.charAt(0).toUpperCase() || 'U'}</div><span><b>{user?.full_name}</b><small>{user?.email}</small></span><button title="Sign out" onClick={async () => { await logout(); navigate('/login') }}><LogOut size={17}/></button></div></div>
    </aside>
    <main className="main-area"><header className="topbar"><button className="menu-button" onClick={() => setOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{navItems.find(x => x.to === location.pathname)?.label || secondary.find(x => x.to === location.pathname)?.label || (location.pathname.includes('contact') ? 'Support' : 'Overview')}</b></div><div className="topbar-right"><span className="live-status"><i/> All systems operational</span><button className="icon-button" title="Notifications" onClick={() => navigate('/app/notifications')}><Bell size={18}/>{unread > 0 && <i className="notification-dot"/>}</button><div className="top-avatar">{user?.full_name?.charAt(0).toUpperCase() || 'U'}</div></div></header><div className="content"><Outlet/></div>
      {toast && <div className="toast"><span className="toast-pulse"/> {toast}</div>}
    </main>
  </div>
}

export default function App() {
  return <Routes>
    <Route path="/" element={<LandingPage/>}/><Route path="/legal/:policy" element={<LegalPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/r/:code" element={<PublicReviewPage/>}/><Route path="/contact" element={<ContactPage/>}/>
    <Route path="/app" element={<Protected><AppLayout/></Protected>}>
      <Route index element={<Overview/>}/><Route path="qrs" element={<QRsPage/>}/><Route path="feedback" element={<FeedbackPage/>}/><Route path="analytics" element={<AnalyticsPage/>}/><Route path="notifications" element={<NotificationsPage/>}/><Route path="settings" element={<SettingsPage/>}/><Route path="billing" element={<BillingPage/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
