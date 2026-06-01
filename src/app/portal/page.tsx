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
  CheckCircle,
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
  { id: 'TR-2024-0847', name: 'Colonial Country Club - Bldg 12', status: 'In Progress', progress: 65, type: 'Reroofing', updated: '2 hours ago', manager: 'Matt O\'Berski', scope: 'Tile Roof Replacement for Building 12. Removing existing clay tile, repairing structural underlayment, and installing premium hurricane-resistant tile.', completion: 'Jun 22, 2026', location: 'Fort Myers, FL' },
  { id: 'TR-2024-0833', name: 'Regatta Condominiums - Phase 2', status: 'Scheduled', progress: 0, type: 'New Roof', updated: '1 day ago', manager: 'Brent O\'Berski', scope: 'Installation of high-efficiency flat roof membrane (TPO) with custom tapered insulation for superior drainage.', completion: 'Jul 15, 2026', location: 'Naples, FL' },
  { id: 'TR-2024-0791', name: 'Sanibel Harbour Tower B', status: 'Completed', progress: 100, type: 'Repairs', updated: '3 days ago', manager: 'Erik O\'Berski', scope: 'Post-leak structural repair. Sealing joints, replacing damaged flashings, and water-testing to guarantee waterproofing.', completion: 'Completed May 28, 2026', location: 'Sanibel, FL' },
  { id: 'TR-2024-0756', name: 'Cape Coral Shopping Plaza', status: 'Inspection', progress: 85, type: 'Maintenance', updated: '5 days ago', manager: 'Matt O\'Berski', scope: 'Annual preventative maintenance checkup. Cleaning gutters, inspecting flashing seals, and replacing worn fasteners.', completion: 'Jun 05, 2026', location: 'Cape Coral, FL' },
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
  const [projects, setProjects] = useState(mockProjects)
  const [invoices, setInvoices] = useState(mockInvoices)
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null)
  
  // Payment states
  const [paymentStep, setPaymentStep] = useState<'idle' | 'paying' | 'success'>('idle')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  
  // Messaging state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'PM', text: 'Hi John, we uploaded the latest inspection photos for Colonial Country Club. Let us know if you have any questions.', time: '9:30 AM' },
    { sender: 'You', text: 'Thanks Matt. The photos look great. When do you expect building 12 to be finished?', time: '10:15 AM' },
    { sender: 'PM', text: 'We should be done with building 12 by Thursday, weather permitting. Then we start Phase 2 on Regatta.', time: '10:20 AM' }
  ])
  const [typedMessage, setTypedMessage] = useState('')
  const [isTypingReply, setIsTypingReply] = useState(false)
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!typedMessage.trim()) return
    
    const userMsg = { 
      sender: 'You', 
      text: typedMessage, 
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
    }
    setChatMessages(prev => [...prev, userMsg])
    const sentText = typedMessage
    setTypedMessage('')
    setIsTypingReply(true)
    
    setTimeout(() => {
      setIsTypingReply(false)
      let replyText = "Understood. I will review this with Matt and get back to you shortly."
      if (sentText.toLowerCase().includes('invoice') || sentText.toLowerCase().includes('pay') || sentText.toLowerCase().includes('money')) {
        replyText = "Thanks for the payment update. Our accounting team reviews records daily. Once processed, it will mark as Paid in your dashboard."
      } else if (sentText.toLowerCase().includes('when') || sentText.toLowerCase().includes('finish') || sentText.toLowerCase().includes('schedule') || sentText.toLowerCase().includes('time')) {
        replyText = "We are currently on track with the schedule. I will send over our progress update document at the end of the day."
      } else if (sentText.toLowerCase().includes('hello') || sentText.toLowerCase().includes('hi') || sentText.toLowerCase().includes('hey')) {
        replyText = "Hello John! Hope you're doing well today. Let me know if there's anything I can help you with."
      }
      setChatMessages(prev => [...prev, {
        sender: 'PM',
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1500)
  }
  
  const handlePayInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStep('paying')
    setTimeout(() => {
      setPaymentStep('success')
      if (selectedInvoice) {
        setInvoices(prev => prev.map(inv => inv.id === selectedInvoice.id ? { ...inv, status: 'Paid' } : inv))
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Portal top bar */}
      <div className="border-b border-[var(--gray-200)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--red)] text-sm font-bold text-white shadow-md">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--black)]">John Davis</p>
              <p className="text-xs text-[var(--gray-500)]">Property Manager &mdash; Coastal Realty Group</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] hover:text-[var(--red)] border border-[var(--gray-200)] px-4 py-2 rounded transition-all bg-white hover:border-[var(--red)]"
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
          <p className="text-[var(--gray-500)]">Coastal Realty Group Client Dashboard &middot; License CCC1334168</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Active Projects', value: projects.filter(p => p.status !== 'Completed').length, icon: HardHat, color: 'bg-blue-50 text-blue-600 border border-blue-100' },
            { label: 'Pending Invoices', value: invoices.filter(i => i.status !== 'Paid').length, icon: CreditCard, color: 'bg-amber-50 text-amber-600 border border-amber-100' },
            { label: 'Upcoming Visits', value: '2', icon: CalendarDays, color: 'bg-green-50 text-green-600 border border-green-100' },
            { label: 'Unread Messages', value: '2', icon: Bell, color: 'bg-red-50 text-[var(--red)] border border-red-100' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-[var(--gray-200)] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)]">{label}</p>
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
        <div className="mb-6 flex gap-1 rounded-lg border border-[var(--gray-200)] bg-white p-1 w-fit shadow-sm">
          {(['projects', 'invoices', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
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
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--red)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-[var(--gray-400)]">{project.id}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          project.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : project.status === 'Completed'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : project.status === 'Scheduled'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-xs text-[var(--gray-400)] font-medium">{project.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase tracking-wide">{project.name}</h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      {project.type} &middot; Manager: <span className="font-semibold text-[var(--gray-700)]">{project.manager}</span> &middot; Updated {project.updated}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 justify-between lg:justify-end">
                    <div className="w-40 sm:w-48">
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-[var(--gray-500)]">Progress</span>
                        <span className="font-semibold text-[var(--black)]">{project.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--gray-100)] border border-[var(--gray-200)]">
                        <div
                          className="h-full rounded-full bg-[var(--red)] transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--red)] hover:text-[var(--red-dark)] border border-[var(--red)] rounded-md px-4 py-2 hover:bg-[var(--red)]/5 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="overflow-hidden rounded-xl border border-[var(--gray-200)] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
                    <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--gray-500)]">Invoice ID</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--gray-500)]">Project</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--gray-500)]">Amount</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--gray-500)]">Due Date</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--gray-500)]">Status</th>
                    <th className="px-6 py-3.5 text-right" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--gray-200)]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[var(--gray-50)] transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-[var(--black)]">{inv.id}</td>
                      <td className="px-6 py-4 text-sm text-[var(--gray-700)] font-medium">{inv.project}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[var(--black)]">{inv.amount}</td>
                      <td className="px-6 py-4 text-sm text-[var(--gray-500)]">{inv.due}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            inv.status === 'Paid' 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {inv.status === 'Paid' ? (
                          <button className="text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] hover:text-[var(--black)] border border-[var(--gray-200)] px-3 py-1.5 rounded transition-all bg-white">
                            Download PDF
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              setSelectedInvoice(inv)
                              setPaymentStep('idle')
                              setCardName('')
                              setCardNumber('')
                              setCardExpiry('')
                              setCardCVV('')
                            }}
                            className="text-xs font-bold uppercase tracking-wider text-white bg-[var(--red)] hover:bg-[var(--red-dark)] px-4 py-1.5 rounded transition-all shadow-sm hover:shadow"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Direct Message Chat */}
            <div className="lg:col-span-8 border border-[var(--gray-200)] rounded-xl bg-white flex flex-col h-[500px] overflow-hidden shadow-sm">
              <div className="bg-[var(--black)] p-4 border-b border-[var(--gray-200)] text-white flex justify-between items-center noise-overlay">
                <div>
                  <h3 className="font-bold font-[family-name:var(--font-display)] uppercase tracking-wide">Project Manager Chat</h3>
                  <p className="text-[10px] text-[var(--gray-400)]">Active with Brent, Matt, and Erik O&apos;Berski</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[11px] text-[var(--gray-300)] font-semibold">Online</span>
                </div>
              </div>
              
              {/* Chat Log */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[var(--gray-50)]">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-[var(--gray-400)] font-semibold mb-1">{msg.sender} &bull; {msg.time}</span>
                    <div className={`p-3.5 rounded-xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'You' 
                        ? 'bg-[var(--red)] text-white rounded-tr-none' 
                        : 'bg-white text-[var(--black)] border border-[var(--gray-200)] rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTypingReply && (
                  <div className="flex items-center gap-2 text-xs text-[var(--gray-400)] font-semibold">
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-[var(--gray-400)] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-[var(--gray-400)] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 bg-[var(--gray-400)] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                    <span>PM is typing...</span>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[var(--gray-200)] bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about your project, estimate, or invoices..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  disabled={isTypingReply}
                  className="flex-1 px-4 py-3 rounded-lg border border-[var(--gray-200)] bg-[var(--gray-50)] text-sm text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!typedMessage.trim() || isTypingReply}
                  className="bg-[var(--red)] hover:bg-[var(--red-dark)] disabled:opacity-50 text-white rounded-lg px-6 py-3 font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  Send
                </button>
              </form>
            </div>
            
            {/* Right Column: PM Contacts & Alerts */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="border border-[var(--gray-200)] rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-4">Your Project Crew</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Matt O\'Berski', role: 'Project Superintendent', phone: '239-332-5707' },
                    { name: 'Erik O\'Berski', role: 'General Superintendent', phone: '239-332-5707' },
                    { name: 'Brent O\'Berski', role: 'President / Project Director', phone: '239-332-5707' }
                  ].map((pm, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-100)]">
                      <div className="w-8 h-8 rounded-full bg-[var(--red)]/10 text-[var(--red)] font-bold text-xs flex items-center justify-center font-[family-name:var(--font-display)]">
                        {pm.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[var(--black)]">{pm.name}</h4>
                        <p className="text-[10px] text-[var(--gray-400)] font-medium">{pm.role}</p>
                        <a href={`tel:${pm.phone}`} className="text-[10px] text-[var(--red)] font-bold hover:underline">{pm.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border border-[var(--gray-200)] rounded-xl bg-white p-5 shadow-sm flex-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-3">Recent Notifications</h3>
                <div className="space-y-3">
                  {mockNotifications.map((notif, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 text-xs p-3 rounded-lg border ${
                        notif.unread ? 'bg-red-50/30 border-[var(--red)]/20' : 'border-[var(--gray-100)]'
                      }`}
                    >
                      <Bell className={`h-4 w-4 flex-shrink-0 mt-0.5 ${notif.unread ? 'text-[var(--red)]' : 'text-[var(--gray-400)]'}`} />
                      <div>
                        <p className={`${notif.unread ? 'font-semibold text-[var(--black)]' : 'text-[var(--gray-600)]'}`}>
                          {notif.text}
                        </p>
                        <span className="text-[10px] text-[var(--gray-400)] font-medium mt-1 block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-[var(--gray-200)] flex flex-col max-h-[90vh]">
            <div className="bg-[var(--black)] p-5 text-white flex justify-between items-center noise-overlay">
              <div>
                <span className="text-xs font-mono font-semibold text-[var(--gray-400)]">{selectedProject.id}</span>
                <h2 className="text-xl font-bold uppercase font-[family-name:var(--font-display)] tracking-wide">{selectedProject.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full text-xs font-bold"
              >
                &times; Close
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-2">Scope of Work</h3>
                <p className="text-sm text-[var(--gray-700)] leading-relaxed">{selectedProject.scope}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-[var(--gray-50)] p-4 rounded-lg border border-[var(--gray-200)] text-xs">
                <div>
                  <span className="text-[var(--gray-400)] uppercase font-semibold">Superintendent</span>
                  <p className="text-[var(--black)] font-bold mt-0.5">{selectedProject.manager}</p>
                </div>
                <div>
                  <span className="text-[var(--gray-400)] uppercase font-semibold">Location</span>
                  <p className="text-[var(--black)] font-bold mt-0.5">{selectedProject.location}</p>
                </div>
                <div>
                  <span className="text-[var(--gray-400)] uppercase font-semibold">Estimated Completion</span>
                  <p className="text-[var(--black)] font-bold mt-0.5">{selectedProject.completion}</p>
                </div>
                <div>
                  <span className="text-[var(--gray-400)] uppercase font-semibold">Status</span>
                  <p className="text-[var(--red)] font-bold mt-0.5 uppercase tracking-wider">{selectedProject.status}</p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-3">Project Timeline</h3>
                <div className="space-y-4">
                  {[
                    { label: "Contract Signed & Deposit Received", done: true },
                    { label: "Permits Approved & Materials Delivered", done: selectedProject.progress >= 30 },
                    { label: "Roof Removal & Structural Repairs", done: selectedProject.progress >= 60 },
                    { label: "Installing Waterproofing & Roofing Material", done: selectedProject.progress >= 80 },
                    { label: "Final Superintendent & City Inspection", done: selectedProject.progress === 100 }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold ${
                        step.done 
                          ? 'bg-[var(--red)] border-[var(--red)] text-white' 
                          : 'border-[var(--gray-300)] text-[var(--gray-400)] bg-white'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`text-xs font-medium ${step.done ? 'text-[var(--black)] font-semibold' : 'text-[var(--gray-400)]'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Photo Galleries */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-3">Superintendent Progress Photos</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['watertest.jpg', 'site-safety.jpg', 'tpo-retrofit.jpg'].map((photo, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--gray-200)] shadow-sm bg-[var(--gray-100)] flex items-center justify-center group">
                      <span className="text-[10px] font-bold text-[var(--gray-400)] text-center p-2 uppercase">Progress Photo {i+1}</span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Inspect Photo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Document Downloads */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-3">Project Documents</h3>
                <div className="space-y-2">
                  {['Roofing_Contract_Executed.pdf', 'Inspection_Report_Preliminary.pdf', 'Warranty_Certificate_10Yr.pdf'].map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[var(--gray-50)] hover:bg-[var(--gray-100)] border border-[var(--gray-200)] p-3 rounded-lg transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[var(--red)]" />
                        <span className="text-xs font-medium text-[var(--gray-700)]">{doc}</span>
                      </div>
                      <button className="text-[10px] font-bold uppercase tracking-wider text-[var(--red)] hover:underline">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--gray-200)] bg-white flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-[var(--black)] text-white rounded font-bold uppercase tracking-wider text-xs hover:bg-[var(--black)]/80 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-[var(--gray-200)]">
            <div className="bg-[var(--black)] p-5 text-white flex justify-between items-center noise-overlay">
              <div>
                <span className="text-xs font-mono font-semibold text-[var(--gray-400)]">{selectedInvoice.id}</span>
                <h2 className="text-xl font-bold uppercase font-[family-name:var(--font-display)] tracking-wide">Secure Invoice Payment</h2>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-white/85 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs font-bold"
              >
                &times; Close
              </button>
            </div>

            {paymentStep !== 'success' ? (
              <form onSubmit={handlePayInvoice} className="p-6 space-y-4">
                <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] p-4 rounded-lg">
                  <div className="flex justify-between text-xs font-medium text-[var(--gray-500)] mb-1">
                    <span>Project:</span>
                    <span className="text-[var(--black)] font-bold">{selectedInvoice.project}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-[var(--gray-500)] mb-3">
                    <span>Due Date:</span>
                    <span className="text-[var(--black)] font-semibold">{selectedInvoice.due}</span>
                  </div>
                  <div className="border-t border-[var(--gray-200)] pt-3 flex justify-between items-center">
                    <span className="text-sm font-bold text-[var(--black)]">Total Due:</span>
                    <span className="text-xl font-bold text-[var(--red)] font-[family-name:var(--font-display)]">{selectedInvoice.amount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Name on Card</label>
                    <input
                      type="text"
                      required
                      placeholder="John Davis"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-sm text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => {
                        // basic space formatting
                        const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(v);
                      }}
                      className="w-full px-3.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-sm font-mono text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Expiration</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '');
                          if (v.length >= 2) {
                            setCardExpiry(v.slice(0,2) + '/' + v.slice(2,4));
                          } else {
                            setCardExpiry(v);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-sm font-mono text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-sm font-mono text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={paymentStep === 'paying'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded transition-all shadow-md hover:shadow-lg font-[family-name:var(--font-display)]"
                  >
                    {paymentStep === 'paying' ? 'Processing Securely...' : `Pay ${selectedInvoice.amount}`}
                  </button>
                </div>
                
                <p className="text-[10px] text-center text-[var(--gray-400)] leading-relaxed">
                  Secured with 256-bit SSL certificate &amp; PCI-DSS compliance. <br />
                  Target Roofing does not store your card details on local servers.
                </p>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <CheckCircle className="h-14 w-14 text-green-600 mx-auto animate-bounce" />
                <div>
                  <h3 className="text-xl font-bold uppercase font-[family-name:var(--font-display)] text-[var(--black)]">Payment Complete!</h3>
                  <p className="text-xs text-[var(--gray-500)] mt-1">Invoice {selectedInvoice.id} has been marked as paid successfully.</p>
                </div>
                <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] p-4 rounded-lg text-xs space-y-1 w-fit mx-auto text-left">
                  <p><span className="text-[var(--gray-400)] uppercase font-semibold">Confirmation:</span> <span className="font-mono font-bold text-[var(--black)]">TRP-PAY-8827931</span></p>
                  <p><span className="text-[var(--gray-400)] uppercase font-semibold">Paid Amount:</span> <span className="font-bold text-green-600">{selectedInvoice.amount}</span></p>
                  <p><span className="text-[var(--gray-400)] uppercase font-semibold">Paid Date:</span> <span className="font-medium text-[var(--gray-600)]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="px-6 py-2.5 bg-[var(--black)] text-white font-bold uppercase tracking-wider text-xs rounded hover:bg-[var(--black)]/80 transition-colors shadow-sm"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


export default function PortalPage() {
  return <LoginForm />
}
