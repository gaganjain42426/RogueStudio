'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import VaultEntrance from '@/components/vault/VaultEntrance'
import VaultGrid from '@/components/vault/VaultGrid'
import type { VaultClient as VaultClientType } from '@/data/vault-clients'

interface Props {
  projects: VaultClientType[]
}

export default function VaultClient({ projects }: Props) {
  const [entered, setEntered] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered && <VaultEntrance onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && <VaultGrid projects={projects} />}
    </>
  )
}
