'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function SoftwashContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    serviceAddress: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate form submission endpoint
    setSubmitted(true)
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
    >
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
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded border border-[var(--gray-300)] px-4 py-3 text-[var(--black)] focus:border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]/20 focus:outline-none transition-colors"
            placeholder="John"
          />
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
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded border border-[var(--gray-300)] px-4 py-3 text-[var(--black)] focus:border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]/20 focus:outline-none transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="mb-6">
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
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded border border-[var(--gray-300)] px-4 py-3 text-[var(--black)] focus:border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]/20 focus:outline-none transition-colors"
          placeholder="(239) 555-0123"
        />
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
          required
          value={formData.serviceAddress}
          onChange={handleChange}
          className="w-full rounded border border-[var(--gray-300)] px-4 py-3 text-[var(--black)] focus:border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]/20 focus:outline-none transition-colors"
          placeholder="123 Main St, Fort Myers, FL"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--red)] text-white font-bold uppercase tracking-wider rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg text-sm"
      >
        Get My Free Quote
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-xs text-[var(--gray-400)] text-center leading-relaxed">
        By submitting this form, you agree to receive text messages at the number provided.
        Standard message rates apply.
      </p>
    </form>
  )
}
