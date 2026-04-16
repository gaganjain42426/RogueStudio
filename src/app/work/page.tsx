import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { createClient } from '@/lib/supabase/server'
import VaultClient from './VaultClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'The Vault — Our Work',
  description:
    'Step into The Vault — Rogue Studio\'s portfolio of cinematic brands, social campaigns, video production, and digital content crafted in Jaipur, India.',
  path: '/work',
  keywords: ['portfolio', 'brand design portfolio Jaipur', 'social media campaigns India', 'the vault rogue studio'],
})

export default async function WorkPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('portfolio')
    .select('*')
    .eq('published', true)
    .order('sort_order')

  return <VaultClient projects={data ?? []} />
}
