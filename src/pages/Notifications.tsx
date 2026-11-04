import { useEffect, useState } from 'react'
import { Bell, CheckCheck, Star, MessageSquareText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api, getError, shortDate } from '../lib/api'
import type { NotificationItem } from '../lib/types'
import { PageTitle, EmptyState, ErrorNotice, Loading } from '../components/UI'
export default function NotificationsPage(){
 const [items,setItems]=useState<NotificationItem[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const navigate=useNavigate()
 const load=()=>api.get('/api/notifications').then(r=>setItems(r.data)).catch(e=>setError(getError(e))).finally(()=>setLoading(false))
 useEffect(()=>{void load();const t=window.setInterval(()=>{void load()},15000);return()=>window.clearInterval(t)},[])
 const mark=async()=>{await api.post('/api/notifications/read-all');await load()}
 if(loading)return <Loading/>
 return <div className="page-stack"><PageTitle eyebrow="STAY IN THE LOOP" title="Notifications" subtitle="A live feed of customer activity and feedback." action={<button className="btn btn-secondary" onClick={mark}><CheckCheck size={16}/> Mark all as read</button>}/>{error&&<ErrorNotice message={error}/ >}
 {items.length?<div className="notification-list">{items.map(n=><button className={`notification-item ${n.is_read?'':'notification-unread'}`} key={n.id} onClick={()=>navigate('/app/feedback')}><span className={`notification-icon ${n.rating<=2?'notification-urgent':''}`}>{n.rating<=2?<Star size={18}/>:<MessageSquareText size={18}/>}</span><span className="notification-copy"><b>{n.title}</b><span>{n.message}</span><small>{n.qr_label} · {shortDate(n.created_at)}</small></span>{!n.is_read&&<i className="unread-indicator"/>}</button>)}</div>:<EmptyState title="You're all caught up" text="When a customer submits feedback, you'll see a notification here."/>}</div>
}
