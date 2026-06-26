'use server'

import { supabase } from '@/lib/supabase'

// ---------------------------------------------------------------------------
// Admin Authentication
// ---------------------------------------------------------------------------

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@targetroofers.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'target2026'

export async function verifyAdminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return { success: true }
  }
  return { success: false, error: 'Invalid admin credentials. Access Denied.' }
}

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

interface LeadSaveResult {
  success: boolean
  error?: string
  errors?: Record<string, string>
}

export interface LeadRecord {
  id: string
  created_at: string
  form_type: 'contact' | 'softwash' | 'portal_login'
  status: 'new' | 'processed' | 'spam'
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  street_address?: string
  city?: string
  zip?: string
  service?: string
  message?: string
  service_address?: string
}

async function saveLead(
  formType: 'contact' | 'softwash' | 'portal_login',
  data: Record<string, string | undefined>
): Promise<LeadSaveResult> {
  try {
    const { error } = await supabase.from('leads').insert({
      form_type: formType,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      street_address: data.streetAddress,
      city: data.city,
      zip: data.zip,
      service: data.service,
      message: data.message,
      service_address: data.serviceAddress,
    })
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error saving lead:', error)
    return { success: false, error: 'Failed to save lead details.' }
  }
}

export async function submitContactLead(formData: {
  firstName: string
  lastName: string
  phone: string
  email: string
  streetAddress: string
  city: string
  zip: string
  service: string
  message: string
}) {
  const errors: Record<string, string> = {}

  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = 'First Name is required and must be at least 2 characters.'
  }
  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.lastName = 'Last Name is required and must be at least 2 characters.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'A valid email address is required.'
  }

  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
  if (!formData.phone || !phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'A valid phone number is required (e.g., 239-332-5707).'
  }

  if (!formData.streetAddress || !formData.streetAddress.trim()) {
    errors.streetAddress = 'Street Address is required.'
  }
  if (!formData.city || !formData.city.trim()) {
    errors.city = 'City is required.'
  }
  if (!formData.zip || !formData.zip.trim()) {
    errors.zip = 'ZIP Code is required.'
  }
  if (!formData.service || !formData.service.trim()) {
    errors.service = 'Service of Interest is required.'
  }
  if (!formData.message || !formData.message.trim()) {
    errors.message = 'Please describe your needs.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, error: 'Please correct the highlighted fields.' }
  }

  return await saveLead('contact', formData)
}

export async function submitSoftwashLead(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceAddress: string
}) {
  const errors: Record<string, string> = {}

  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = 'First Name is required and must be at least 2 characters.'
  }
  if (!formData.lastName || formData.lastName.trim().length < 2) {
    errors.lastName = 'Last Name is required and must be at least 2 characters.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'A valid email address is required.'
  }

  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
  if (!formData.phone || !phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'A valid phone number is required (e.g., 239-332-5707).'
  }

  if (!formData.serviceAddress || !formData.serviceAddress.trim()) {
    errors.serviceAddress = 'Service Address is required.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, error: 'Please correct the highlighted fields.' }
  }

  return await saveLead('softwash', formData)
}

export async function submitPortalLogin(formData: {
  email: string
  password?: string
}) {
  if (!formData.email?.trim() && !formData.password?.trim()) {
    return { success: true }
  }

  const errors: Record<string, string> = {}

  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required.'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
  }

  if (!formData.password) {
    errors.password = 'Password is required.'
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, error: 'Please correct the highlighted fields.' }
  }

  return await saveLead('portal_login', { email: formData.email })
}

export async function getLeads(): Promise<LeadRecord[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

export async function updateLeadStatus(
  id: string,
  status: 'new' | 'processed' | 'spam'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error updating lead status:', error)
    return { success: false, error: 'Failed to update lead status.' }
  }
}

export async function getReviews(): Promise<{ name: string; date: string; source: string; text: string }[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('name, date, source, text')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export async function addReview(reviewData: {
  name: string
  source: string
  text: string
  date?: string
}) {
  try {
    const { error } = await supabase.from('reviews').insert({
      name: reviewData.name,
      date: reviewData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      source: reviewData.source || 'Google',
      text: reviewData.text,
    })
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error adding review:', error)
    return { success: false, error: 'Failed to save review.' }
  }
}

export async function getSeoConfig() {
  try {
    const { data, error } = await supabase.from('seo_config').select('*')
    if (error) throw error
    const config: Record<string, { title: string; description: string; keywords: string }> = {}
    for (const row of data || []) {
      config[row.route] = { title: row.title, description: row.description, keywords: row.keywords }
    }
    return config
  } catch (error) {
    console.error('Error getting SEO config:', error)
    return {}
  }
}

export async function updateSeoConfig(route: string, data: { title: string; description: string; keywords: string }) {
  try {
    const { error } = await supabase
      .from('seo_config')
      .upsert({ route, ...data })
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error updating SEO config:', error)
    return { success: false, error: 'Failed to save SEO config.' }
  }
}

// ---------------------------------------------------------------------------
// Showcase Videos
// ---------------------------------------------------------------------------

export interface ShowcaseVideo {
  id: string
  title: string
  description: string
  duration: string
}

export async function getShowcaseVideos(): Promise<ShowcaseVideo[]> {
  try {
    const { data, error } = await supabase
      .from('showcase_videos')
      .select('id, title, description, duration')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching showcase videos:', error)
    return []
  }
}

export interface GalleryVideo {
  title: string
  url: string
  description: string
}

export async function getGalleryVideos(): Promise<GalleryVideo[]> {
  try {
    const { data, error } = await supabase
      .from('showcase_videos')
      .select('id, title, description')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data || []).map(v => ({
      title: v.title,
      url: `https://www.youtube.com/embed/${v.id}`,
      description: v.description,
    }))
  } catch (error) {
    console.error('Error fetching gallery videos:', error)
    return []
  }
}

export async function addShowcaseVideo(data: {
  id: string
  title: string
  description: string
  duration: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: existing } = await supabase
      .from('showcase_videos')
      .select('id')
      .eq('id', data.id)
      .single()
    if (existing) {
      return { success: false, error: 'A video with that ID already exists.' }
    }

    const { data: maxOrder } = await supabase
      .from('showcase_videos')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    const nextOrder = (maxOrder?.sort_order ?? -1) + 1

    const { error } = await supabase.from('showcase_videos').insert({
      id: data.id,
      title: data.title,
      description: data.description,
      duration: data.duration,
      sort_order: nextOrder,
    })
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error adding showcase video:', error)
    return { success: false, error: 'Failed to add showcase video.' }
  }
}

export async function removeShowcaseVideo(videoId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('showcase_videos')
      .delete()
      .eq('id', videoId)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error removing showcase video:', error)
    return { success: false, error: 'Failed to remove showcase video.' }
  }
}

export async function reorderShowcaseVideos(ids: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    for (let i = 0; i < ids.length; i++) {
      const { error } = await supabase
        .from('showcase_videos')
        .update({ sort_order: i })
        .eq('id', ids[i])
      if (error) throw error
    }
    return { success: true }
  } catch (error) {
    console.error('Error reordering showcase videos:', error)
    return { success: false, error: 'Failed to reorder showcase videos.' }
  }
}

// ---------------------------------------------------------------------------
// Job Listings
// ---------------------------------------------------------------------------

export interface JobListing {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  active: boolean
  created_at: string
}

export async function getJobListings(): Promise<JobListing[]> {
  try {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching job listings:', error)
    return []
  }
}

export async function addJobListing(data: {
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('job_listings').insert({
      title: data.title,
      department: data.department,
      type: data.type,
      location: data.location,
      description: data.description,
      requirements: data.requirements,
    })
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error adding job listing:', error)
    return { success: false, error: 'Failed to add job listing.' }
  }
}

export async function updateJobListing(
  id: string,
  data: Partial<Omit<JobListing, 'id' | 'created_at'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('job_listings')
      .update(data)
      .eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error updating job listing:', error)
    return { success: false, error: 'Failed to update job listing.' }
  }
}

export async function removeJobListing(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('job_listings')
      .delete()
      .eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error removing job listing:', error)
    return { success: false, error: 'Failed to remove job listing.' }
  }
}

export async function toggleJobListing(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: listing, error: fetchError } = await supabase
      .from('job_listings')
      .select('active')
      .eq('id', id)
      .single()
    if (fetchError) throw fetchError
    if (!listing) return { success: false, error: 'Job listing not found.' }

    const { error } = await supabase
      .from('job_listings')
      .update({ active: !listing.active })
      .eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error toggling job listing:', error)
    return { success: false, error: 'Failed to toggle job listing status.' }
  }
}
