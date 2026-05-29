'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FileText,
  Camera,
  CalendarDays,
  CreditCard,
  MessageSquare,
  ClipboardCheck,
  Bell,
  User,
  Lock,
  Mail,
  ArrowRight,
  Phone,
  Shield,
  HardHat,
  ChevronRight,
} from 'lucide-react'
import { submitPortalLogin } from '@/app/actions'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDemo, setShowDemo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (showDemo) {
    return <PortalDashboard onLogout={() => setShowDemo(false)} />
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <div className="flex min-h-[calc(100vh-7.5rem)]">
        {/* Left - Login Form */}
        <div className="flex w-full items-center justify-center px-6 py-16 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--red)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--red)]">
                <Shield className="h-4 w-4" />
                Secure Customer Portal
              </div>
              <h1 className="mb-3 text-4xl font-bold font-[family-name:var(--font-display)] uppercase tracking-tight text-[var(--black)]">
                Welcome Back
              </h1>
              <p className="text-[var(--gray-500)]">
                Sign in to view your projects, invoices, and inspection reports.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setError(null)
                setErrors({})

                try {
                  const res = await submitPortalLogin({ email, password })
                  if (res.success) {
                    setShowDemo(true)
                  } else {
                    setErrors(res.errors || {})
                    setError(res.error || 'Invalid credentials. Please try again.')
                  }
                } catch (err) {
                  setError('A connection error occurred. Please try again later.')
                } finally {
                  setLoading(false)
                }
              }}
              className="space-y-5"
              noValidate
            >
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[var(--gray-700)]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--gray-400)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.email
                          return next
                        })
                      }
                    }}
                    placeholder="you@company.com"
                    className={`w-full rounded-lg border bg-white py-3 pl-12 pr-4 text-[var(--black)] placeholder:text-[var(--gray-400)] focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-[var(--gray-700)]">
                    Password
                  </label>
                  <button type="button" className="text-sm text-[var(--red)] hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--gray-400)]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) {
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.password
                          return next
                        })
                      }
                    }}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-white py-3 pl-12 pr-4 text-[var(--black)] placeholder:text-[var(--gray-400)] focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--red)] py-3.5 font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--red-dark)] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--gray-500)]">
                Don&apos;t have an account?{' '}
                <Link href="/contact" className="font-semibold text-[var(--red)] hover:underline">
                  Contact us
                </Link>{' '}
                to get set up.
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-[var(--gray-200)] bg-white p-4">
              <p className="text-center text-xs text-[var(--gray-500)]">
                <Shield className="mb-0.5 mr-1 inline h-3.5 w-3.5" />
                Your data is protected with 256-bit SSL encryption.
                <br />
                Licensed &amp; Insured — CCC1334168
              </p>
            </div>
          </div>
        </div>

        {/* Right - Feature showcase */}
        <div className="hidden lg:flex lg:w-1/2 bg-[var(--black)] relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--red)] rounded-full opacity-10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--red)] rounded-full opacity-5 blur-[80px]" />

          <div className="relative z-10 max-w-lg px-12">
            <Image
              src="/images/logos/target-roofing-logo.png"
              alt="Target Roofing"
              width={200}
              height={46}
              className="mb-12 h-10 w-auto brightness-0 invert"
            />

            <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-display)] uppercase tracking-tight text-white">
              Your Roofing Projects,<br />
              <span className="text-[var(--red)]">All in One Place</span>
            </h2>

            <div className="space-y-6">
              {[
                { icon: FileText, title: 'Project Tracking', desc: 'Real-time status updates on every job' },
                { icon: Camera, title: 'Photo Inspections', desc: 'Detailed photo reports from every visit' },
                { icon: CreditCard, title: 'Easy Payments', desc: 'View invoices and pay online securely' },
                { icon: CalendarDays, title: 'Schedule Service', desc: 'Book maintenance and repairs in a click' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--red)]/20">
                    <Icon className="h-5 w-5 text-[var(--red)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-sm text-[var(--gray-400)]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <Phone className="h-5 w-5 text-[var(--red)]" />
              <div>
                <p className="text-sm text-[var(--gray-400)]">Need help? Call us</p>
                <a href="tel:239-332-5707" className="font-semibold text-white">239-332-5707</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mockProjects = [
  { id: 'TR-2024-0847', name: 'Colonial Country Club - Bldg 12', status: 'In Progress', progress: 65, type: 'Reroofing', updated: '2 hours ago' },
  { id: 'TR-2024-0833', name: 'Regatta Condominiums - Phase 2', status: 'Scheduled', progress: 0, type: 'New Roof', updated: '1 day ago' },
  { id: 'TR-2024-0791', name: 'Sanibel Harbour Tower B', status: 'Completed', progress: 100, type: 'Repairs', updated: '3 days ago' },
  { id: 'TR-2024-0756', name: 'Cape Coral Shopping Plaza', status: 'Inspection', progress: 85, type: 'Maintenance', updated: '5 days ago' },
]

const mockInvoices = [
  { id: 'INV-4821', project: 'Colonial Country Club', amount: '$47,250.00', status: 'Due', due: 'Jun 15, 2026' },
  { id: 'INV-4798', project: 'Sanibel Harbour Tower B', amount: '$12,800.00', status: 'Paid', due: 'May 20, 2026' },
  { id: 'INV-4765', project: 'Cape Coral Shopping Plaza', amount: '$8,450.00', status: 'Paid', due: 'May 1, 2026' },
]

const mockNotifications = [
  { text: 'Progress photos uploaded for Colonial Country Club', time: '2 hours ago', unread: true },
  { text: 'Inspection report ready for Cape Coral Shopping Plaza', time: '5 hours ago', unread: true },
  { text: 'Invoice INV-4821 is due in 18 days', time: '1 day ago', unread: false },
  { text: 'Maintenance visit scheduled for Jun 3, 2026', time: '2 days ago', unread: false },
]

function PortalDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'projects' | 'invoices' | 'messages'>('projects')

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Portal top bar */}
      <div className="border-b border-[var(--gray-200)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--red)] text-sm font-bold text-white">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--black)]">John Davis</p>
              <p className="text-xs text-[var(--gray-500)]">Property Manager — Coastal Realty Group</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-sm font-medium text-[var(--gray-500)] hover:text-[var(--red)] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome + Stats */}
        <div className="mb-8">
          <h1 className="mb-1 text-3xl font-bold font-[family-name:var(--font-display)] uppercase tracking-tight text-[var(--black)]">
            Good Morning, John
          </h1>
          <p className="text-[var(--gray-500)]">Here&apos;s what&apos;s happening with your projects.</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Active Projects', value: '3', icon: HardHat, color: 'bg-blue-50 text-blue-600' },
            { label: 'Pending Invoices', value: '1', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
            { label: 'Upcoming Visits', value: '2', icon: CalendarDays, color: 'bg-green-50 text-green-600' },
            { label: 'Unread Messages', value: '2', icon: Bell, color: 'bg-red-50 text-[var(--red)]' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-[var(--gray-200)] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gray-500)]">{label}</p>
                  <p className="mt-1 text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--black)]">{value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-[var(--gray-200)] bg-white p-1 w-fit">
          {(['projects', 'invoices', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-5 py-2 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-[var(--red)] text-white'
                  : 'text-[var(--gray-500)] hover:text-[var(--black)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--gray-400)]">{project.id}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : project.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : project.status === 'Scheduled'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--black)]">{project.name}</h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      {project.type} &middot; Updated {project.updated}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-48">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-[var(--gray-500)]">Progress</span>
                        <span className="font-semibold text-[var(--black)]">{project.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--gray-200)]">
                        <div
                          className="h-full rounded-full bg-[var(--red)] transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-semibold text-[var(--red)] hover:underline">
                      View <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="overflow-hidden rounded-xl border border-[var(--gray-200)] bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--gray-200)]">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--gray-50)] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-[var(--black)]">{inv.id}</td>
                    <td className="px-6 py-4 text-sm text-[var(--gray-600)]">{inv.project}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[var(--black)]">{inv.amount}</td>
                    <td className="px-6 py-4 text-sm text-[var(--gray-500)]">{inv.due}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-semibold text-[var(--red)] hover:underline">
                        {inv.status === 'Paid' ? 'Download' : 'Pay Now'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {mockNotifications.map((notif, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-xl border bg-white p-5 transition-shadow hover:shadow-md ${
                  notif.unread ? 'border-[var(--red)]/30' : 'border-[var(--gray-200)]'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    notif.unread ? 'bg-[var(--red)]/10' : 'bg-[var(--gray-100)]'
                  }`}
                >
                  <Bell className={`h-4 w-4 ${notif.unread ? 'text-[var(--red)]' : 'text-[var(--gray-400)]'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${notif.unread ? 'font-semibold text-[var(--black)]' : 'text-[var(--gray-600)]'}`}>
                    {notif.text}
                  </p>
                  <p className="mt-1 text-xs text-[var(--gray-400)]">{notif.time}</p>
                </div>
                {notif.unread && (
                  <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--red)]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PortalPage() {
  return <LoginForm />
}
