import type { Metadata } from 'next'
import { getAdminSession } from '@/lib/ops/session'
import AdminLogin from './_ops/AdminLogin'
import AdminShell from './_ops/AdminShell'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) return <AdminLogin />
  return <AdminShell email={session.email}>{children}</AdminShell>
}
