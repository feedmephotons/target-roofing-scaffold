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

