import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Service-role client for the operations suite. All ops tables have RLS on with no
// policies, so only server code using this client can read or write them.
export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rciyoqdtejxcjqnvbsoi.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { persistSession: false } },
)

export async function logAssistant(channel: string, actor: string | null, action: string, detail?: unknown) {
  await db.from('assistant_log').insert({ channel, actor, action, detail: detail ?? null })
}
