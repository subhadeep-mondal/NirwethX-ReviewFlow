import type * as React from 'react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { getError } from '../lib/api'
import { ErrorNotice } from '../components/UI'

function AuthFrame({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return <div className="auth-page"><div className="auth-aside"><div className="auth-brand"><span className="brand-mark"><Sparkles size={19}/></span>NirwethX <span>ReviewFlow</span></div><div className="auth-message"><div className="auth-kicker">A better way to grow</div><h1>Turn every experience into a <em>better connection.</em></h1><p>Make it effortless for customers to share feedback, and easier for your team to act on it.</p><div className="auth-proof"><div className="proof-avatars"><span>R</span><span>A</span><span>S</span><span>+</span></div><div><b>Made for local businesses</b><small>Simple. Insightful. Customer-first.</small></div></div></div><div className="auth-aside-foot">© {new Date().getFullYear()} NirwethX ReviewFlow</div></div><div className="auth-main"><div className="auth-card"><div className="auth-mobile-brand"><span className="brand-mark"><Sparkles size={19}/></span>NirwethX ReviewFlow</div><div className="auth-heading"><span className="eyebrow">YOUR BUSINESS, BETTER HEARD</span><h2>{title}</h2><p>{subtitle}</p></div>{children}<div className="auth-privacy"><ShieldCheck size={15}/> Your account and customer data stay private.</div></div></div></div>
}

export function LoginPage() {
  const { login, user, loading } = useAuth(); const navigate = useNavigate()
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  if (!loading && user) return <Navigate to="/app" replace/>
  const submit = async (e: FormEvent) => { e.preventDefault(); setError(''); setBusy(true); try { await login(email, password); navigate('/app') } catch (err) { setError(getError(err)) } finally { setBusy(false) } }
  return <AuthFrame title="Welcome back" subtitle="Sign in to your ReviewFlow workspace."><form onSubmit={submit} className="form-stack"><label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@business.com"/></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/></label>{error && <ErrorNotice message={error}/>}<button className="btn btn-primary btn-wide" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'} <ArrowRight size={17}/></button></form><div className="auth-switch">New to ReviewFlow? <Link to="/register">Create an account</Link></div></AuthFrame>
}

export function RegisterPage() {
  const { register, user, loading } = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({full_name:'', email:'', password:'', business_name:'', category:'Cafe & Restaurant', city:'', state:'', phone:'', google_review_url:'https://www.google.com/maps'})
  const [error,setError]=useState(''); const [busy,setBusy]=useState(false)
  if (!loading && user) return <Navigate to="/app" replace/>
  const change = (key: string, value: string) => setForm(v=>({...v,[key]:value}))
  const submit = async (e: FormEvent) => { e.preventDefault(); setError(''); setBusy(true); try { await register(form); navigate('/app') } catch(err) { setError(getError(err)) } finally { setBusy(false) } }
  return <AuthFrame title="Create your workspace" subtitle="A few details to get your business started."><form onSubmit={submit} className="form-stack"><div className="form-grid"><label>Your name<input required value={form.full_name} onChange={e=>change('full_name',e.target.value)} placeholder="Full name"/></label><label>Business name<input required value={form.business_name} onChange={e=>change('business_name',e.target.value)} placeholder="Business name"/></label></div><label>Work email<input type="email" required value={form.email} onChange={e=>change('email',e.target.value)} placeholder="you@business.com"/></label><label>Password <small className="field-hint">At least 10 characters</small><input type="password" required minLength={10} value={form.password} onChange={e=>change('password',e.target.value)} placeholder="Create a strong password"/></label><label>Business category<select value={form.category} onChange={e=>change('category',e.target.value)}>{['Cafe & Restaurant','Clinic & Healthcare','Salon & Wellness','Retail & Boutique','Hotel & Hospitality','Fitness & Studio','Home & Repair Services','Education & Coaching','Other'].map(x=><option key={x}>{x}</option>)}</select></label><div className="form-grid"><label>City<input value={form.city} onChange={e=>change('city',e.target.value)} placeholder="Kolkata"/></label><label>State<input value={form.state} onChange={e=>change('state',e.target.value)} placeholder="West Bengal"/></label></div><label>Google review link<input type="url" required value={form.google_review_url} onChange={e=>change('google_review_url',e.target.value)} placeholder="https://g.page/r/..."/></label>{error && <ErrorNotice message={error}/>}<button className="btn btn-primary btn-wide" disabled={busy}>{busy?'Creating workspace...':'Create account'} <ArrowRight size={17}/></button><p className="terms-note">By creating an account, you agree to our Terms and Privacy Policy.</p></form><div className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></div></AuthFrame>
}
