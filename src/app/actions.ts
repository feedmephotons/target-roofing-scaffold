'use server'

import fs from 'fs'
import path from 'path'

interface LeadSaveResult {
  success: boolean
  error?: string
  errors?: Record<string, string>
}

export interface LeadRecord {
  id: string;
  timestamp: string;
  formType: 'contact' | 'softwash' | 'portal_login';
  status: 'new' | 'processed' | 'spam';
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  zip?: string;
  service?: string;
  message?: string;
  serviceAddress?: string;
  password?: string;
}

function findWorkspaceRoot(): string {
  const startPaths = [];
  if (typeof __dirname !== 'undefined' && __dirname) {
    startPaths.push(__dirname);
  }
  startPaths.push(process.cwd());

  for (const startPath of startPaths) {
    let currentDir = path.resolve(startPath);
    const maxDepth = 12;
    for (let i = 0; i < maxDepth; i++) {
      const projectMdPath = path.join(currentDir, 'PROJECT.md');
      const agentsPath = path.join(currentDir, '.agents');
      if (fs.existsSync(projectMdPath) || fs.existsSync(agentsPath)) {
        return currentDir;
      }
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break;
      }
      currentDir = parentDir;
    }
  }
  return process.cwd();
}

let saveQueue: Promise<unknown> = Promise.resolve();

async function saveLead(
  formType: 'contact' | 'softwash' | 'portal_login',
  data: Partial<LeadRecord> & { email: string }
): Promise<LeadSaveResult> {
  return new Promise<LeadSaveResult>((resolve) => {
    saveQueue = saveQueue
      .then(async () => {
        try {
          const workspaceRoot = findWorkspaceRoot();
          const filePath = path.join(workspaceRoot, 'leads.json');
          let leads: LeadRecord[] = [];

          try {
            await fs.promises.access(filePath, fs.constants.F_OK);
            const fileContent = await fs.promises.readFile(filePath, 'utf8');
            if (fileContent.trim()) {
              leads = JSON.parse(fileContent);
            }
          } catch {
            leads = [];
          }

          const newLead: LeadRecord = {
            id: Math.random().toString(36).substring(2, 9),
            timestamp: new Date().toISOString(),
            formType,
            status: 'new',
            ...data,
          };

          // Backup log for serverless environment filesystem fallbacks
          console.log('Flat lead record captured:', newLead);

          leads.push(newLead);

          await fs.promises.writeFile(filePath, JSON.stringify(leads, null, 2), 'utf8');
          resolve({ success: true });
        } catch (error) {
          console.error('Error saving lead:', error);
          resolve({ success: false, error: 'Failed to save lead details locally.' });
        }
      })
      .catch((err) => {
        console.error('Unhandled error in saveQueue:', err);
        resolve({ success: false, error: 'Failed to save lead details due to queue error.' });
      });
  });
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

  return await saveLead('portal_login', {
    email: formData.email,
    password: '[REDACTED]',
  })
}

export async function getLeads(): Promise<LeadRecord[]> {
  try {
    const workspaceRoot = findWorkspaceRoot()
    const filePath = path.join(workspaceRoot, 'leads.json')
    try {
      await fs.promises.access(filePath, fs.constants.F_OK)
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      if (fileContent.trim()) {
        return JSON.parse(fileContent)
      }
    } catch {
      return []
    }
  } catch (error) {
    console.error('Error fetching leads:', error)
  }
  return []
}

export async function updateLeadStatus(
  id: string,
  status: 'new' | 'processed' | 'spam'
): Promise<{ success: boolean; error?: string }> {
  try {
    const workspaceRoot = findWorkspaceRoot()
    const filePath = path.join(workspaceRoot, 'leads.json')
    await fs.promises.access(filePath, fs.constants.F_OK)
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    let leads: LeadRecord[] = []
    if (fileContent.trim()) {
      leads = JSON.parse(fileContent)
    }

    const idx = leads.findIndex((l) => l.id === id)
    if (idx !== -1) {
      leads[idx].status = status
      await fs.promises.writeFile(filePath, JSON.stringify(leads, null, 2), 'utf8')
      return { success: true }
    }
    return { success: false, error: 'Lead not found.' }
  } catch (error) {
    console.error('Error updating lead status:', error)
    return { success: false, error: 'Failed to update lead status.' }
  }
}

export async function addReview(reviewData: {
  name: string
  source: string
  text: string
  date?: string
}) {
  try {
    const workspaceRoot = findWorkspaceRoot()
    const filePath = path.join(workspaceRoot, 'site/src/data/reviews.json')
    let reviews = []
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      reviews = JSON.parse(fileContent)
    } catch {
      reviews = []
    }

    const newReview = {
      name: reviewData.name,
      date: reviewData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      source: reviewData.source || 'Google',
      text: reviewData.text,
    }

    reviews.unshift(newReview)
    await fs.promises.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf8')
    return { success: true }
  } catch (error) {
    console.error('Error adding review:', error)
    return { success: false, error: 'Failed to save review.' }
  }
}

export async function getSeoConfig() {
  try {
    const workspaceRoot = findWorkspaceRoot()
    const filePath = path.join(workspaceRoot, 'site/src/data/seo-config.json')
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      return JSON.parse(fileContent)
    } catch {
      // Default initial config
      const defaultConfig = {
        home: { title: "Target Roofing | Roof Repair SWFL", description: "Target Roofing specializes in commercial roof repairs and proactive maintenance plans across Southwest Florida.", keywords: "roof repair, fort myers roofer, commercial roof maintenance" },
        services: { title: "Our Roofing Services | Target Roofing", description: "Extend your roof's service life with expert repairs, maintenance, and seamless replacement transitions.", keywords: "roof repairs, roof maintenance, commercial reroofing" },
        about: { title: "About Target Roofing | SWFL Roofer", description: "Learn about Target Roofing's team, direct-employee values, and process in Fort Myers, Naples, and Sarasota.", keywords: "about target roofing, roofing team, florida roofing contractor" },
        softwash: { title: "Target Softwash | Exterior Roof Cleaning", description: "Gentle, damage-free low-pressure softwash cleaning to extend roof life and restore curb appeal.", keywords: "softwash roof cleaning, florida roof wash, tile roof cleaning" }
      }
      await fs.promises.writeFile(filePath, JSON.stringify(defaultConfig, null, 2), 'utf8')
      return defaultConfig
    }
  } catch (error) {
    console.error('Error getting SEO config:', error)
    return {}
  }
}

export async function updateSeoConfig(route: string, data: { title: string; description: string; keywords: string }) {
  try {
    const workspaceRoot = findWorkspaceRoot()
    const filePath = path.join(workspaceRoot, 'site/src/data/seo-config.json')
    let config: Record<string, unknown> = {}
    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      config = JSON.parse(fileContent)
    } catch {
      config = {}
    }
    config[route] = data
    await fs.promises.writeFile(filePath, JSON.stringify(config, null, 2), 'utf8')
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

const DEFAULT_SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  { id: 'yz5H6FkrWhs', title: 'Target Roofing Overview', description: "See what makes Target Roofing Southwest Florida's trusted commercial roofing partner.", duration: '3:42' },
  { id: 'A7Qz9tz8nNU', title: 'Colonial Country Club', description: 'Full roof replacement at Colonial Country Club in Fort Myers.', duration: '2:18' },
  { id: 'Ywio4IhCQPI', title: 'Water Test Inspection', description: 'Our thorough water test procedure to detect and diagnose roof leaks.', duration: '2:57' },
  { id: '-o8JhirAPR8', title: 'Service Department', description: 'Behind the scenes with the Target Roofing service team on repairs and maintenance.', duration: '3:05' },
  { id: 'cGLaC7x9btw', title: 'Our Process', description: 'How we approach every project with precision, accountability, and cutting-edge technology.', duration: '2:31' },
]

async function readShowcaseVideosFile(): Promise<ShowcaseVideo[]> {
  const workspaceRoot = findWorkspaceRoot()
  const filePath = path.join(workspaceRoot, 'site/src/data/showcase-videos.json')
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    if (fileContent.trim()) {
      return JSON.parse(fileContent)
    }
  } catch {
    // File doesn't exist yet - create with defaults
    const dir = path.dirname(filePath)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(filePath, JSON.stringify(DEFAULT_SHOWCASE_VIDEOS, null, 2), 'utf8')
    return [...DEFAULT_SHOWCASE_VIDEOS]
  }
  return [...DEFAULT_SHOWCASE_VIDEOS]
}

async function writeShowcaseVideosFile(videos: ShowcaseVideo[]): Promise<void> {
  const workspaceRoot = findWorkspaceRoot()
  const filePath = path.join(workspaceRoot, 'site/src/data/showcase-videos.json')
  const dir = path.dirname(filePath)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(filePath, JSON.stringify(videos, null, 2), 'utf8')
}

export async function getShowcaseVideos(): Promise<ShowcaseVideo[]> {
  try {
    return await readShowcaseVideosFile()
  } catch (error) {
    console.error('Error fetching showcase videos:', error)
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
    const videos = await readShowcaseVideosFile()
    if (videos.some((v) => v.id === data.id)) {
      return { success: false, error: 'A video with that ID already exists.' }
    }
    videos.push({ id: data.id, title: data.title, description: data.description, duration: data.duration })
    await writeShowcaseVideosFile(videos)
    return { success: true }
  } catch (error) {
    console.error('Error adding showcase video:', error)
    return { success: false, error: 'Failed to add showcase video.' }
  }
}

export async function removeShowcaseVideo(videoId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const videos = await readShowcaseVideosFile()
    const idx = videos.findIndex((v) => v.id === videoId)
    if (idx === -1) {
      return { success: false, error: 'Video not found.' }
    }
    videos.splice(idx, 1)
    await writeShowcaseVideosFile(videos)
    return { success: true }
  } catch (error) {
    console.error('Error removing showcase video:', error)
    return { success: false, error: 'Failed to remove showcase video.' }
  }
}

export async function reorderShowcaseVideos(ids: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const videos = await readShowcaseVideosFile()
    const videoMap = new Map(videos.map((v) => [v.id, v]))
    const reordered: ShowcaseVideo[] = []
    for (const id of ids) {
      const video = videoMap.get(id)
      if (video) {
        reordered.push(video)
        videoMap.delete(id)
      }
    }
    // Append any videos not included in the ids list at the end
    for (const remaining of videoMap.values()) {
      reordered.push(remaining)
    }
    await writeShowcaseVideosFile(reordered)
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
  createdAt: string
}

const DEFAULT_JOB_LISTINGS: JobListing[] = [
  {
    id: '1',
    title: 'Commercial Roofing Foreman',
    department: 'Operations',
    type: 'Full-Time',
    location: 'Fort Myers, FL',
    description: 'Lead commercial roofing crews on projects across Southwest Florida.',
    requirements: ['5+ years commercial roofing experience', 'Foreman or supervisor experience', 'Valid Florida driver\'s license', 'OSHA 30 certification preferred'],
    active: true,
    createdAt: '2026-06-01',
  },
  {
    id: '2',
    title: 'Service Technician',
    department: 'Service',
    type: 'Full-Time',
    location: 'Fort Myers, FL',
    description: 'Perform roof repairs, maintenance inspections, and emergency service calls.',
    requirements: ['2+ years roofing repair experience', 'Ability to work at heights', 'Strong problem-solving skills', 'Clean driving record'],
    active: true,
    createdAt: '2026-06-15',
  },
]

async function readJobListingsFile(): Promise<JobListing[]> {
  const workspaceRoot = findWorkspaceRoot()
  const filePath = path.join(workspaceRoot, 'site/src/data/job-listings.json')
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    if (fileContent.trim()) {
      return JSON.parse(fileContent)
    }
  } catch {
    // File doesn't exist yet - create with defaults
    const dir = path.dirname(filePath)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(filePath, JSON.stringify(DEFAULT_JOB_LISTINGS, null, 2), 'utf8')
    return [...DEFAULT_JOB_LISTINGS]
  }
  return [...DEFAULT_JOB_LISTINGS]
}

async function writeJobListingsFile(listings: JobListing[]): Promise<void> {
  const workspaceRoot = findWorkspaceRoot()
  const filePath = path.join(workspaceRoot, 'site/src/data/job-listings.json')
  const dir = path.dirname(filePath)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(filePath, JSON.stringify(listings, null, 2), 'utf8')
}

export async function getJobListings(): Promise<JobListing[]> {
  try {
    return await readJobListingsFile()
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
    const listings = await readJobListingsFile()
    const maxId = listings.reduce((max, l) => {
      const num = parseInt(l.id, 10)
      return isNaN(num) ? max : Math.max(max, num)
    }, 0)
    const newListing: JobListing = {
      id: String(maxId + 1),
      title: data.title,
      department: data.department,
      type: data.type,
      location: data.location,
      description: data.description,
      requirements: data.requirements,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    }
    listings.push(newListing)
    await writeJobListingsFile(listings)
    return { success: true }
  } catch (error) {
    console.error('Error adding job listing:', error)
    return { success: false, error: 'Failed to add job listing.' }
  }
}

export async function updateJobListing(
  id: string,
  data: Partial<Omit<JobListing, 'id' | 'createdAt'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const listings = await readJobListingsFile()
    const idx = listings.findIndex((l) => l.id === id)
    if (idx === -1) {
      return { success: false, error: 'Job listing not found.' }
    }
    listings[idx] = { ...listings[idx], ...data }
    await writeJobListingsFile(listings)
    return { success: true }
  } catch (error) {
    console.error('Error updating job listing:', error)
    return { success: false, error: 'Failed to update job listing.' }
  }
}

export async function removeJobListing(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const listings = await readJobListingsFile()
    const idx = listings.findIndex((l) => l.id === id)
    if (idx === -1) {
      return { success: false, error: 'Job listing not found.' }
    }
    listings.splice(idx, 1)
    await writeJobListingsFile(listings)
    return { success: true }
  } catch (error) {
    console.error('Error removing job listing:', error)
    return { success: false, error: 'Failed to remove job listing.' }
  }
}

export async function toggleJobListing(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const listings = await readJobListingsFile()
    const idx = listings.findIndex((l) => l.id === id)
    if (idx === -1) {
      return { success: false, error: 'Job listing not found.' }
    }
    listings[idx].active = !listings[idx].active
    await writeJobListingsFile(listings)
    return { success: true }
  } catch (error) {
    console.error('Error toggling job listing:', error)
    return { success: false, error: 'Failed to toggle job listing status.' }
  }
}
