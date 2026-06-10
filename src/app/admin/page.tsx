'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  CheckCircle,
  AlertCircle,
  Plus,
  Star,
  Inbox,
  Settings,
  LogOut,
  Shield,
  Filter,
  Globe,
  RefreshCw,
  Clock,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'
import {
  getLeads,
  updateLeadStatus,
  addReview,
  getSeoConfig,
  updateSeoConfig,
  type LeadRecord,
} from '@/app/actions'

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Simulate authentication check
    setTimeout(() => {
      if (email === 'admin@targetroofing.com' && password === 'target2026') {
        onLogin()
      } else {
        setError('Invalid admin credentials. Access Denied.')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-[var(--gray-200)] rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--red)]/10 px-4 py-1.5 text-xs font-bold text-[var(--red)] uppercase tracking-wider">
            <Shield className="h-4 w-4" />
            Superintendent Access Only
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] uppercase tracking-tight text-[var(--black)]">
            Target Management
          </h1>
          <p className="text-xs text-[var(--gray-400)] font-semibold mt-1">Target Roofing Administrative Console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1.5">
              Superintendent Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="super@targetroofing.com"
              className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] bg-white text-sm text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1.5">
              Access Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] bg-white text-sm text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[var(--red)] hover:bg-[var(--red-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
          >
            {loading ? 'Authenticating...' : 'Sign In to Console'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'leads' | 'seo' | 'reviews'>('leads')
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'processed' | 'spam'>('all')
  const [leadSearch, setLeadSearch] = useState('')
  const [actionStatus, setActionStatus] = useState<string | null>(null)

  // SEO config state
  const [seoConfig, setSeoConfig] = useState<Record<string, { title: string; description: string; keywords: string }>>({})
  const [loadingSeo, setLoadingSeo] = useState(false)
  const [selectedSeoRoute, setSelectedSeoRoute] = useState<string>('home')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('')
  const [seoSaved, setSeoSaved] = useState(false)

  // Review state
  const [newReviewAuthor, setNewReviewAuthor] = useState('')
  const [newReviewText, setNewReviewText] = useState('')
  const [newReviewSource, setNewReviewSource] = useState('Google')
  const [newReviewSaved, setNewReviewSaved] = useState(false)

  const fetchLeadsData = async () => {
    setLoadingLeads(true)
    try {
      const data = await getLeads()
      // sort leads descending by date/timestamp
      data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setLeads(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingLeads(false)
    }
  }

  const fetchSeoData = async () => {
    setLoadingSeo(true)
    try {
      const data = await getSeoConfig()
      setSeoConfig(data)
      if (data[selectedSeoRoute]) {
        setSeoTitle(data[selectedSeoRoute].title)
        setSeoDescription(data[selectedSeoRoute].description)
        setSeoKeywords(data[selectedSeoRoute].keywords)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingSeo(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeadsData()
    } else if (activeTab === 'seo') {
      fetchSeoData()
    }
  }, [activeTab])

  // sync form inputs when active route changes in SEO
  useEffect(() => {
    if (seoConfig[selectedSeoRoute]) {
      setSeoTitle(seoConfig[selectedSeoRoute].title)
      setSeoDescription(seoConfig[selectedSeoRoute].description)
      setSeoKeywords(seoConfig[selectedSeoRoute].keywords)
    }
  }, [selectedSeoRoute, seoConfig])

  const handleUpdateStatus = async (id: string, status: 'new' | 'processed' | 'spam') => {
    setActionStatus('Updating status...')
    try {
      const res = await updateLeadStatus(id, status)
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        )
      } else {
        alert(res.error || 'Failed to update status.')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setActionStatus(null)
    }
  }

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSeo(true)
    setSeoSaved(false)
    try {
      const res = await updateSeoConfig(selectedSeoRoute, {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
      })
      if (res.success) {
        setSeoSaved(true)
        // Refresh local cache
        setSeoConfig(prev => ({
          ...prev,
          [selectedSeoRoute]: { title: seoTitle, description: seoDescription, keywords: seoKeywords }
        }))
        setTimeout(() => setSeoSaved(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingSeo(false)
    }
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return
    setNewReviewSaved(false)
    try {
      const res = await addReview({
        name: newReviewAuthor,
        source: newReviewSource,
        text: newReviewText,
      })
      if (res.success) {
        setNewReviewSaved(true)
        setNewReviewAuthor('')
        setNewReviewText('')
        setTimeout(() => setNewReviewSaved(false), 3000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    // tab filter
    if (leadFilter !== 'all' && lead.status !== leadFilter) return false
    
    // search query
    if (!leadSearch.trim()) return true
    const q = leadSearch.toLowerCase()
    return (
      (lead.firstName || '').toLowerCase().includes(q) ||
      (lead.lastName || '').toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      (lead.city || '').toLowerCase().includes(q) ||
      (lead.service || '').toLowerCase().includes(q)
    )
  })

  // Leads statistics
  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'new').length
  const processedLeads = leads.filter(l => l.status === 'processed').length
  const spamRate = totalLeads > 0 ? Math.round((leads.filter(l => l.status === 'spam').length / totalLeads) * 100) : 0

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Top Admin Header */}
      <div className="bg-[var(--black)] text-white border-b border-white/10 noise-overlay shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--red)] text-white font-bold rounded-lg flex items-center justify-center shadow-lg font-[family-name:var(--font-display)] uppercase">
              TR
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-display)]">Target Roofing Admin</h2>
              <p className="text-[10px] text-[var(--gray-400)] font-semibold">Superintendent Control Console</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-[var(--gray-400)] font-medium">Logged in as: <span className="text-white font-bold">Superintendent</span></span>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 rounded hover:border-[var(--red)] hover:text-[var(--red-light)] transition-all text-xs font-bold uppercase bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 flex border-b border-[var(--gray-200)] bg-white p-2 rounded-xl shadow-sm gap-2">
          {[
            { id: 'leads', label: 'Lead Manager', icon: Inbox },
            { id: 'seo', label: 'SEO Settings', icon: Globe },
            { id: 'reviews', label: 'Add Review', icon: Star }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--red)] text-white shadow-md'
                    : 'text-[var(--gray-500)] hover:bg-[var(--gray-50)] hover:text-[var(--black)]'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── LEADS MANAGER TAB ── */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Lead statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads Captured', value: totalLeads, desc: 'All Form submissions', color: 'border-l-blue-500' },
                { label: 'Active New Leads', value: newLeads, desc: 'Needs attention', color: 'border-l-[var(--red)]' },
                { label: 'Processed Inquiries', value: processedLeads, desc: 'Surveyed / Completed', color: 'border-l-green-500' },
                { label: 'Spam Reject Rate', value: `${spamRate}%`, desc: 'Filter rate', color: 'border-l-amber-500' }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-white rounded-xl border border-[var(--gray-200)] border-l-4 ${stat.color} p-5 shadow-sm`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray-400)]">{stat.label}</p>
                  <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--black)] mt-1">{stat.value}</p>
                  <p className="text-[10px] text-[var(--gray-400)] mt-1.5 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Filter and search bar */}
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'new', 'processed', 'spam'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setLeadFilter(status)}
                    className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      leadFilter === status
                        ? 'bg-[var(--black)] text-white font-bold'
                        : 'bg-[var(--gray-50)] text-[var(--gray-500)] border border-[var(--gray-200)] hover:text-[var(--black)]'
                    }`}
                  >
                    {status} ({status === 'all' ? totalLeads : leads.filter(l => l.status === status).length})
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--gray-400)]" />
                <input
                  type="text"
                  placeholder="Search by name, email, city..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] transition-all placeholder-[var(--gray-400)] font-medium"
                />
              </div>
            </div>

            {/* Lead list table */}
            <div className="bg-white rounded-xl border border-[var(--gray-200)] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[var(--gray-200)] flex justify-between items-center bg-[var(--gray-50)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-500)] flex items-center gap-1.5">
                  <Inbox className="h-4 w-4" />
                  Submitted Forms List ({filteredLeads.length})
                </h3>
                <button 
                  onClick={fetchLeadsData}
                  disabled={loadingLeads}
                  className="p-1 rounded text-[var(--gray-400)] hover:text-[var(--red)] transition-colors hover:bg-white border border-[var(--gray-200)]"
                  title="Reload Leads"
                >
                  <RefreshCw className={`h-4 w-4 ${loadingLeads ? 'animate-spin text-[var(--red)]' : ''}`} />
                </button>
              </div>

              {loadingLeads ? (
                <div className="p-16 text-center text-xs text-[var(--gray-400)] font-semibold space-y-2">
                  <RefreshCw className="h-8 w-8 text-[var(--red)] mx-auto animate-spin" />
                  <p>Loading lead records from server...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-16 text-center text-xs text-[var(--gray-400)] font-semibold space-y-1">
                  <Inbox className="h-10 w-10 text-[var(--gray-200)] mx-auto mb-2" />
                  <p>No lead inquiries found matching the criteria.</p>
                  <p className="font-light">Make sure to submit forms on the site to register leads.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)] text-[10px] font-bold uppercase text-[var(--gray-500)] tracking-wider">
                        <th className="px-6 py-3">Lead Info</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3">Details</th>
                        <th className="px-6 py-3">Timestamp</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--gray-200)]">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[var(--gray-50)] transition-colors text-xs">
                          {/* Info */}
                          <td className="px-6 py-4">
                            <p className="font-bold text-[var(--black)]">
                              {lead.firstName ? `${lead.firstName} ${lead.lastName}` : 'System Log'}
                            </p>
                            <span className="text-[10px] font-bold font-mono text-[var(--gray-400)] bg-[var(--gray-100)] rounded px-1.5 py-0.5 mt-1 block w-fit">
                              {lead.formType.toUpperCase()}
                            </span>
                          </td>
                          {/* Contact */}
                          <td className="px-6 py-4 space-y-1">
                            <div className="flex items-center gap-1.5 text-[var(--gray-600)]">
                              <Mail className="h-3 w-3" />
                              <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-1.5 text-[var(--gray-600)]">
                                <Phone className="h-3 w-3" />
                                <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                              </div>
                            )}
                          </td>
                          {/* Details */}
                          <td className="px-6 py-4 space-y-1.5 max-w-xs">
                            {lead.streetAddress && (
                              <div className="flex items-start gap-1 text-[var(--gray-500)]">
                                <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5 text-[var(--red)]" />
                                <span>{lead.streetAddress}, {lead.city}, FL {lead.zip}</span>
                              </div>
                            )}
                            {lead.serviceAddress && (
                              <div className="flex items-start gap-1 text-[var(--gray-500)] font-medium">
                                <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5 text-[var(--red)]" />
                                <span>Site: {lead.serviceAddress}</span>
                              </div>
                            )}
                            {lead.service && (
                              <p className="text-[10px] font-bold text-[var(--black)] uppercase tracking-wide">
                                Service: <span className="text-[var(--red)]">{lead.service}</span>
                              </p>
                            )}
                            {lead.message && (
                              <p className="text-[11px] text-[var(--gray-600)] font-light italic leading-relaxed border-l border-[var(--gray-200)] pl-2">
                                &ldquo;{lead.message}&rdquo;
                              </p>
                            )}
                          </td>
                          {/* Date */}
                          <td className="px-6 py-4 text-[var(--gray-500)] font-semibold font-mono">
                            {new Date(lead.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} &bull;{' '}
                            {new Date(lead.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                lead.status === 'new'
                                  ? 'bg-red-50 text-[var(--red)] border border-red-200'
                                  : lead.status === 'processed'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              {lead.status !== 'processed' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'processed')}
                                  className="text-[10px] font-bold uppercase tracking-wider text-green-700 hover:bg-green-50 border border-green-200 bg-white rounded px-2.5 py-1 transition-all"
                                  title="Mark as Processed"
                                >
                                  Process
                                </button>
                              )}
                              {lead.status !== 'spam' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'spam')}
                                  className="text-[10px] font-bold uppercase tracking-wider text-amber-700 hover:bg-amber-50 border border-amber-200 bg-white rounded px-2.5 py-1 transition-all"
                                  title="Flag as Spam"
                                >
                                  Spam
                                </button>
                              )}
                              {lead.status !== 'new' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'new')}
                                  className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray-600)] hover:bg-[var(--gray-50)] border border-[var(--gray-200)] bg-white rounded px-2.5 py-1 transition-all"
                                  title="Restore to New"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SEO SETTINGS TAB ── */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Page Routes Select */}
            <div className="lg:col-span-4 border border-[var(--gray-200)] rounded-xl bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-4">Select Page Route</h3>
              {[
                { id: 'home', label: 'Homepage (/)', path: '/' },
                { id: 'services', label: 'Services (/roofing-services)', path: '/roofing-services' },
                { id: 'about', label: 'About Us (/about)', path: '/about' },
                { id: 'softwash', label: 'Softwash (/softwash)', path: '/softwash' }
              ].map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedSeoRoute(route.id)}
                  className={`w-full text-left rounded-lg p-3 border transition-all text-xs font-bold uppercase tracking-wider flex justify-between items-center ${
                    selectedSeoRoute === route.id
                      ? 'border-[var(--red)] bg-[var(--red)]/5 text-[var(--red)]'
                      : 'border-[var(--gray-200)] hover:border-[var(--red)] bg-white text-[var(--gray-600)]'
                  }`}
                >
                  <div>
                    <p>{route.label}</p>
                    <span className="text-[10px] font-mono text-[var(--gray-400)] lowercase font-normal">{route.path}</span>
                  </div>
                  <Globe className="h-4 w-4 opacity-55" />
                </button>
              ))}
            </div>

            {/* Right Form Editor */}
            <div className="lg:col-span-8 border border-[var(--gray-200)] rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--black)] font-[family-name:var(--font-display)] mb-4 border-b border-[var(--gray-100)] pb-3">
                SEO Metadata Configurator &bull; {selectedSeoRoute.toUpperCase()}
              </h3>

              {loadingSeo ? (
                <div className="py-12 text-center text-xs text-[var(--gray-400)] font-semibold space-y-2">
                  <RefreshCw className="h-7 w-7 text-[var(--red)] mx-auto animate-spin" />
                  <p>Loading metadata configurations...</p>
                </div>
              ) : (
                <form onSubmit={handleSaveSeo} className="space-y-5">
                  {seoSaved && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4.5 w-4.5" />
                      SEO parameters updated successfully in configuration database.
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1.5">Meta Title Tag</label>
                    <input
                      type="text"
                      required
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Target Roofing | Roof Repair SWFL"
                      className="w-full px-4.5 py-3 rounded-lg border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] transition-all font-medium"
                    />
                    <p className="text-[10px] text-[var(--gray-400)] mt-1.5">Optimal length: 50-60 characters. Current: <span className="font-bold text-[var(--gray-600)]">{seoTitle.length}</span></p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1.5">Meta Description</label>
                    <textarea
                      required
                      rows={4}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Target Roofing specializes in commercial roof repairs..."
                      className="w-full px-4.5 py-3 rounded-lg border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] transition-all font-medium resize-none"
                    />
                    <p className="text-[10px] text-[var(--gray-400)] mt-1.5">Optimal length: 150-160 characters. Current: <span className="font-bold text-[var(--gray-600)]">{seoDescription.length}</span></p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1.5">Focus Keywords (Comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="roof repair, roof replacement, fort myers"
                      className="w-full px-4.5 py-3 rounded-lg border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] transition-all font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--red)] hover:bg-[var(--red-dark)] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm font-[family-name:var(--font-display)]"
                  >
                    Save Route Metadata
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ── REVIEWS MODERATOR TAB ── */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form to Add Review */}
            <div className="lg:col-span-6 border border-[var(--gray-200)] rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--black)] font-[family-name:var(--font-display)] mb-4 border-b border-[var(--gray-100)] pb-3">
                Register Customer Review
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                {newReviewSaved && (
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5" />
                    Review saved. It has been integrated into the testimonials components.
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="E.g., Samantha Miller"
                    className="w-full px-4.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Review Source</label>
                  <select
                    value={newReviewSource}
                    onChange={(e) => setNewReviewSource(e.target.value)}
                    className="w-full px-4.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)]"
                  >
                    <option value="Google">Google Reviews</option>
                    <option value="Facebook">Facebook Recommendations</option>
                    <option value="Yelp">Yelp</option>
                    <option value="Direct Call">Direct Client Callout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--gray-500)] mb-1">Review Text</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Paste the review text here..."
                    className="w-full px-4.5 py-2.5 rounded border border-[var(--gray-300)] bg-white text-xs text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-[var(--red)] hover:bg-[var(--red-dark)] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm font-[family-name:var(--font-display)]"
                >
                  <Plus className="h-4.5 w-4.5" />
                  Save and Publish Review
                </button>
              </form>
            </div>

            {/* Direct Reviews Feed Preview */}
            <div className="lg:col-span-6 border border-[var(--gray-200)] rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)] mb-3">Live Reviews Stream Preview</h3>
              <p className="text-[10px] text-[var(--gray-400)] mb-5">These reviews populate the review templates and site testimonials grid.</p>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {[
                  { name: "John H.", text: "Target Roofing repaired our facility in Fort Myers in under 24 hours. The crew in red polos was tidy and thorough. Highly recommended for commercial property managers.", source: "Google", date: "May 25, 2026" },
                  { name: "Sarah L.", text: "After heavy storms in Sarasota, Matt O'Berski inspected our community roof. Gave a clear photo report and repaired it on time. Very professional.", source: "Google", date: "May 10, 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-150)] flex flex-col justify-between text-xs gap-3">
                    <p className="text-[var(--gray-600)] italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                    <div className="flex justify-between items-center border-t border-[var(--gray-200)] pt-3 text-[10px] font-semibold text-[var(--gray-500)]">
                      <span>{item.name} &bull; {item.source}</span>
                      <span className="font-mono text-[var(--gray-400)]">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
  }

  return <AdminLogin onLogin={() => setIsLoggedIn(true)} />
}
