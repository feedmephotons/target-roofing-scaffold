import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rciyoqdtejxcjqnvbsoi.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjaXlvcWR0ZWp4Y2pxbnZic29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTE0ODQsImV4cCI6MjA5ODM2NzQ4NH0.kBpvfZ7l3Ao0HfqwYw8Lqy9S3OwPQeBmfQiA9_9f1WA'

export const supabase = createClient(supabaseUrl, supabaseKey)
