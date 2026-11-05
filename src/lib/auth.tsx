import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from './api'
import type { Business, User } from './types'

type AuthValue = { user: User | null; business: Business | null; loading: boolean; refresh: () => Promise<void>; login: (email: string, password: string) => Promise<void>; register: (data: Record<string, string>) => Promise<void>; logout: () => Promise<void> }
const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const refresh = async () => {
    try { const { data } = await api.get('/api/auth/me'); setUser(data.user); setBusiness(data.business) }
    catch { setUser(null); setBusiness(null) }
    finally { setLoading(false) }
  }
  useEffect(() => { void refresh() }, [])
  const login = async (email: string, password: string) => { await api.post('/api/auth/login', { email, password }); await refresh() }
  const register = async (data: Record<string, string>) => { await api.post('/api/auth/register', data); await refresh() }
  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
    } finally {
      // Clear local auth state even if the logout request cannot reach the API.
      setUser(null)
      setBusiness(null)
    }
  }
  return <AuthContext.Provider value={{ user, business, loading, refresh, login, register, logout }}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be inside AuthProvider'); return context }
