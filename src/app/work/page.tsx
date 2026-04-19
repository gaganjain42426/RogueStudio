import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { VAULT_CLIENTS } from '@/data/vault-clients'
import VaultClient from './VaultClient'

export const metadata: Metadata = buildMetadata({
  title: 'The Vault — Our Work',
  description:
    'Step into The Vault — Rogue Studio\'s portfolio of cinematic brands, social campaigns, video production, and digital content crafted in Jaipur, India.',
  path: '/work',
  keywords: ['portfolio', 'brand design portfolio Jaipur', 'social media campaigns India', 'the vault rogue studio'],
})

export default function WorkPage() {
  return <VaultClient projects={VAULT_CLIENTS} />
}
