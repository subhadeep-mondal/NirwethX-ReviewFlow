import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export function getError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as { detail?: unknown } | undefined
    const detail = body?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail)) return detail.map((x: { msg?: string }) => x.msg).join(', ')
    return error.message || 'Something went wrong'
  }
  return error instanceof Error ? error.message : 'Something went wrong'
}

export const money = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
export const shortDate = (value: string) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
