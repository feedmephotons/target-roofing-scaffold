'use client'

import { useState, type FormEvent } from 'react'
import { Send, CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { submitContactLead } from '@/app/actions'

interface InlineLeadFormProps {
  defaultService?: string
  title?: string
  subtitle?: string
  buttonText?: string
  darkTheme?: boolean
}

export default function InlineLeadForm({
  defaultService = '',
  title = 'Request a Roof Repair Survey',
  subtitle = 'Get a professional evaluation and itemized estimate within 24 hours.',
  buttonText = 'Submit Repair Request',
  darkTheme = false,
}: InlineLeadFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    zip: '',
    service: defaultService,
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[e.target.name]
        return next
      })
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setErrors({})
    setSuccess(false)

    try {
      const res = await submitContactLead(form)
      if (res.success) {
        setSuccess(true)
        setForm({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          streetAddress: '',
          city: '',
          zip: '',
          service: defaultService,
          message: '',
        })
      } else {
        setErrors(res.errors || {})
        setError(res.error || 'Please correct the highlighted fields.')
      }
    } catch (err) {
      setError('A connection error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const textClass = darkTheme ? 'text-white' : 'text-[var(--black)]'
  const subtextClass = darkTheme ? 'text-[var(--gray-300)]' : 'text-[var(--gray-600)]'
  const bgClass = darkTheme ? 'bg-white/5 border border-white/10 backdrop-blur-sm' : 'bg-white shadow-xl border border-[var(--gray-200)]'
  const labelClass = darkTheme ? 'text-white/90' : 'text-[var(--gray-700)]'
  const inputClass = (fieldName: string) => `w-full px-4 py-2.5 border rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 transition-colors ${
    errors[fieldName]
      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
      : 'border-[var(--gray-300)] focus:ring-[var(--red)] focus:border-[var(--red)]'
  }`

  if (success) {
    return (
      <div className={`rounded-lg p-8 text-center border-t-4 border-[var(--red)] ${bgClass}`}>
        <CheckCircle className="h-12 w-12 text-[var(--red)] mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold uppercase mb-2 font-[family-name:var(--font-display)]">
          Thank You!
        </h3>
        <p className={subtextClass}>
          Your roof repair request has been submitted. A Target Roofing technician will contact you shortly to schedule your survey.
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-lg p-6 sm:p-8 border-t-4 border-[var(--red)] ${bgClass}`}>
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-[family-name:var(--font-display)]">
          {title}
        </h3>
        <p className={`text-sm mt-1 leading-relaxed ${subtextClass}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              First Name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={inputClass('firstName')}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              Last Name <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={inputClass('lastName')}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              Phone <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass('phone')}
              placeholder="(239) 332-5707"
            />
            {errors.phone && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              Email <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="streetAddress" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
            Street Address <span className="text-[var(--red)]">*</span>
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            className={inputClass('streetAddress')}
            placeholder="Property Address"
          />
          {errors.streetAddress && (
            <p className="mt-0.5 text-[10px] font-semibold text-red-600">
              {errors.streetAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              City <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              className={inputClass('city')}
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="zip" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              ZIP Code <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className={inputClass('zip')}
              placeholder="ZIP"
            />
            {errors.zip && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.zip}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label htmlFor="service" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              Service <span className="text-[var(--red)]">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded bg-white text-[var(--black)] focus:outline-none focus:ring-2 transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
              }}
            >
              <option value="">Select service...</option>
              <option value="repairs">Roof Repair</option>
              <option value="maintenance-plans">Maintenance Plan</option>
              <option value="reroofing">Reroofing</option>
              <option value="new-roofs">New Roof</option>
            </select>
            {errors.service && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.service}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-xs font-semibold mb-1 uppercase tracking-wider font-[family-name:var(--font-display)]">
              Describe Needs <span className="text-[var(--red)]">*</span>
            </label>
            <input
              type="text"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={inputClass('message')}
              placeholder="e.g. Active leak in main office ceiling"
            />
            {errors.message && (
              <p className="mt-0.5 text-[10px] font-semibold text-red-600">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg hover:shadow-xl font-[family-name:var(--font-display)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Submitting Request...' : buttonText}
        </button>

        <p className="text-[10px] text-[var(--gray-400)] leading-relaxed text-center">
          By submitting, you authorize Target Roofing to text/call/email you regarding repairs.
        </p>
      </form>
    </div>
  )
}
