'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import VaultEntrance from '@/components/vault/VaultEntrance'
import VaultGrid from '@/components/vault/VaultGrid'

export default function VaultClient() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered && <VaultEntrance onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && <VaultGrid />}
    </>
  )
}
