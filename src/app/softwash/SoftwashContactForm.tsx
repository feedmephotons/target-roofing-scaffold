'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { submitSoftwashLead } from '@/app/actions'

export default function SoftwashContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceAddress: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[e.target.name]
        return next
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setErrors({})

    try {
      const res = await submitSoftwashLead(formData)
      if (res.success) {
        setSubmitted(true)
      } else {
        setErrors(res.errors || {})
        setError(res.error || 'Please correct the highlighted fields.')
      }
    } catch {
      setError('A connection error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-10 text-center border-t-4 border-[var(--red)]">
        <CheckCircle className="h-12 w-12 text-[var(--red)] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[var(--black)] font-[family-name:var(--font-display)] uppercase mb-2">
          Thank You!
        </h3>
        <p className="text-[var(--gray-600)]">
          We&apos;ve received your request and will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8 md:p-10 border-t-4 border-[var(--red)]"
      noValidate
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)] mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full rounded border px-4 py-3 text-[var(--black)] focus:outline-none focus:ring-2 transition-colors ${
              errors.firstName
                ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)] mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full rounded border px-4 py-3 text-[var(--black)] focus:outline-none focus:ring-2 transition-colors ${
              errors.lastName
                ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)] mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded border px-4 py-3 text-[var(--black)] focus:outline-none focus:ring-2 transition-colors ${
              errors.phone
                ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
            }`}
            placeholder="(239) 555-0123"
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)] mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded border px-4 py-3 text-[var(--black)] focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <label
          htmlFor="serviceAddress"
          className="block text-sm font-semibold text-[var(--black)] uppercase tracking-wide font-[family-name:var(--font-display)] mb-2"
        >
          Service Address
        </label>
        <input
          type="text"
          id="serviceAddress"
          name="serviceAddress"
          value={formData.serviceAddress}
          onChange={handleChange}
          className={`w-full rounded border px-4 py-3 text-[var(--black)] focus:outline-none focus:ring-2 transition-colors ${
            errors.serviceAddress
              ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
              : 'border-[var(--gray-300)] focus:border-[var(--red)] focus:ring-[var(--red)]/20'
          }`}
          placeholder="123 Main St, Fort Myers, FL"
        />
        {errors.serviceAddress && (
          <p className="mt-1 text-xs font-semibold text-red-600">
            {errors.serviceAddress}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Get My Free Quote'}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-xs text-[var(--gray-400)] text-center leading-relaxed">
        By submitting this form, you agree to receive text messages at the number provided.
        Standard message rates apply.
      </p>
    </form>
  )
}
