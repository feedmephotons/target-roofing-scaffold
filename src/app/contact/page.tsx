'use client'

import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    zip: '',
    service: '',
    message: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    alert(
      'Thank you for your inquiry! A member of our team will be in touch shortly.'
    )
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[var(--black)] text-white overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-[var(--red)] hidden lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-[var(--red-light)] text-sm font-bold uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-display)]">
              <span className="w-8 h-[2px] bg-[var(--red)]" />
              Get In Touch
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6 font-[family-name:var(--font-display)]">
              Contact <span className="text-[var(--red)]">Us</span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-white mb-4 font-[family-name:var(--font-display)]">
              You Call. We Respond. It&apos;s That Simple.
            </p>

            <p className="text-lg md:text-xl text-[var(--gray-300)] leading-relaxed max-w-2xl">
              Hiring a roofer shouldn&apos;t be difficult. Target Roofing is
              ready to respond to your call 24 hours a day, seven days a week,
              365 days a year.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + CONTACT INFO ─── */}
      <section className="bg-[var(--gray-50)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Left: Contact Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-sm shadow-xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--black)] mb-2 font-[family-name:var(--font-display)]">
                  Request a Free Estimate
                </h2>
                <p className="text-[var(--gray-500)] mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        First Name <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        Last Name <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        Phone <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="(239) 555-0100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        Email <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                    >
                      Street Address <span className="text-[var(--red)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      required
                      value={form.streetAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                      placeholder="123 Main Street"
                    />
                  </div>

                  {/* City + ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        City <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="Fort Myers"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zip"
                        className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                      >
                        ZIP Code <span className="text-[var(--red)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        required
                        value={form.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors"
                        placeholder="33901"
                      />
                    </div>
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                    >
                      Service of Interest{' '}
                      <span className="text-[var(--red)]">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                      }}
                    >
                      <option value="">Select a service...</option>
                      <option value="new-roofs">New Roofs</option>
                      <option value="reroofing">Reroofing</option>
                      <option value="repairs">Repairs</option>
                      <option value="maintenance-plans">Maintenance Plans</option>
                      <option value="free-estimate">Free Estimate</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[var(--gray-700)] mb-1.5"
                    >
                      Describe Your Needs{' '}
                      <span className="text-[var(--red)]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--gray-300)] rounded bg-white text-[var(--black)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--red)] focus:border-[var(--red)] transition-colors resize-vertical"
                      placeholder="Tell us about your roofing project..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--red)] text-white text-sm font-bold uppercase tracking-wide rounded hover:bg-[var(--red-dark)] transition-colors shadow-lg hover:shadow-xl font-[family-name:var(--font-display)]"
                  >
                    <Send className="w-4 h-4" />
                    Request Free Estimate
                  </button>

                  {/* Disclaimer */}
                  <p className="text-xs text-[var(--gray-400)] leading-relaxed">
                    By submitting this form, you authorize Target Roofing to
                    text, call, and email you regarding your inquiry. Message and
                    data rates may apply.
                  </p>
                </form>
              </div>
            </div>

            {/* ── Right: Contact Info Cards ── */}
            <div className="lg:col-span-2 space-y-5">
              {/* Headquarters */}
              <div className="group bg-white rounded-sm shadow-md p-6 border-l-4 border-[var(--red)] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--red)]/10 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors">
                    <MapPin className="w-6 h-6 text-[var(--red)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--gray-400)] mb-1 font-[family-name:var(--font-display)]">
                      Headquarters
                    </h3>
                    <p className="text-[var(--black)] font-medium leading-relaxed">
                      2022 Hendry St #100
                      <br />
                      Fort Myers, Florida 33901
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group bg-white rounded-sm shadow-md p-6 border-l-4 border-[var(--red)] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--red)]/10 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors">
                    <Phone className="w-6 h-6 text-[var(--red)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--gray-400)] mb-1 font-[family-name:var(--font-display)]">
                      Phone
                    </h3>
                    <a
                      href="tel:239-332-5707"
                      className="text-[var(--black)] font-medium text-lg hover:text-[var(--red)] transition-colors"
                    >
                      (239) 332-5707
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white rounded-sm shadow-md p-6 border-l-4 border-[var(--red)] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--red)]/10 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors">
                    <Mail className="w-6 h-6 text-[var(--red)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--gray-400)] mb-1 font-[family-name:var(--font-display)]">
                      Email
                    </h3>
                    <a
                      href="mailto:projects@targetroofers.com"
                      className="text-[var(--black)] font-medium hover:text-[var(--red)] transition-colors"
                    >
                      projects@targetroofers.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="group bg-white rounded-sm shadow-md p-6 border-l-4 border-[var(--red)] hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--red)]/10 rounded-sm flex items-center justify-center group-hover:bg-[var(--red)] transition-colors">
                    <Clock className="w-6 h-6 text-[var(--red)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--gray-400)] mb-1 font-[family-name:var(--font-display)]">
                      Hours
                    </h3>
                    <p className="text-[var(--black)] font-medium leading-relaxed">
                      Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM
                      <br />
                      Saturday: 8:00 AM &ndash; 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Service */}
              <div className="bg-[var(--black)] rounded-sm shadow-md p-6 text-white">
                <div className="noise-overlay absolute inset-0 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 bg-[var(--red)] rounded-full animate-pulse" />
                    <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--red-light)] font-[family-name:var(--font-display)]">
                      Emergency Service
                    </h3>
                  </div>
                  <p className="text-[var(--gray-300)] mb-4">
                    24/7 Emergency Roof Repairs Available
                  </p>
                  <a
                    href="tel:239-332-5707"
                    className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:text-[var(--red-light)] transition-colors font-[family-name:var(--font-display)]"
                  >
                    <Phone className="w-7 h-7" />
                    239-332-5707
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE MAPS ─── */}
      <section className="w-full">
        <iframe
          title="Target Roofing Headquarters Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.4!2d-81.8723!3d26.6406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDM4JzI2LjIiTiA4McKwNTInMjAuMyJX!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </section>
    </>
  )
}
