import type { ReactNode } from 'react'
import { Star, TrendingUp, ArrowUpRight } from 'lucide-react'

export function PageTitle({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="page-title"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action && <div className="page-action">{action}</div>}</div>
}
export function MetricCard({ label, value, hint, icon, trend }: { label: string; value: string | number; hint: string; icon: ReactNode; trend?: string }) {
  return <div className="metric-card"><div className="metric-top"><span className="metric-icon">{icon}</span>{trend && <span className="metric-trend"><TrendingUp size={13}/>{trend}</span>}</div><div className="metric-value">{value}</div><div className="metric-label">{label}</div><div className="metric-hint">{hint}</div></div>
}
export function Stars({ value, size = 16 }: { value: number; size?: number }) { return <span className="stars" aria-label={`${value} out of 5 stars`}>{[1,2,3,4,5].map(n => <Star key={n} size={size} fill={n <= value ? 'currentColor' : 'none'} strokeWidth={1.7} />)}</span> }
export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) { return <div className="empty-state"><div className="empty-mark"><ArrowUpRight size={20}/></div><h3>{title}</h3><p>{text}</p>{action}</div> }
export function Loading() { return <div className="loading"><span className="spinner"/> Loading your workspace...</div> }
export function ErrorNotice({ message }: { message: string }) { return <div className="notice error-notice">{message}</div> }
export function SuccessNotice({ message }: { message: string }) { return <div className="notice success-notice">{message}</div> }
