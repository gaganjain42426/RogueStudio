'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import {
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  X,
  Loader2,
  ImageIcon,
  ExternalLink,
} from 'lucide-react'
import type { PortfolioProject } from '@/types'

// ── Types ────────────────────────────────────────────────────────────
type FormState = {
  title: string
  client: string
  category: string
  ref_code: string
  published: boolean
  sort_order: number
  tagline: string
  description: string
  live_url: string
  cover_image: string | null
  images: string[]
  services: string[]
  stats: { value: string; label: string }[]
}

const EMPTY_FORM: FormState = {
  title: '',
  client: '',
  category: 'commercial',
  ref_code: '',
  published: false,
  sort_order: 0,
  tagline: '',
  description: '',
  live_url: '',
  cover_image: null,
  images: [],
  services: [],
  stats: [],
}

const CATEGORY_OPTIONS = [
  { value: 'commercial', label: 'COMMERCIAL' },
  { value: 'wellness', label: 'WELLNESS' },
  { value: 'industrial', label: 'INDUSTRIAL' },
]

const SERVICE_SUGGESTIONS = [
  'Social Media',
  'Reels',
  'Photography',
  'Brand Strategy',
  'Paid Ads',
  'Content Writing',
  'Graphic Design',
  'Video Editing',
]

// ── Helpers ──────────────────────────────────────────────────────────
function projectToForm(p: PortfolioProject): FormState {
  return {
    title: p.title,
    client: p.client,
    category: p.category,
    ref_code: p.ref_code ?? '',
    published: p.published,
    sort_order: p.sort_order,
    tagline: p.tagline ?? '',
    description: p.description ?? '',
    live_url: p.live_url ?? '',
    cover_image: p.cover_image,
    images: p.images ?? [],
    services: p.services ?? [],
    stats: p.stats ?? [],
  }
}

// ── Main Component ───────────────────────────────────────────────────
export default function PortfolioAdminClient({
  initialProjects,
}: {
  initialProjects: PortfolioProject[]
}) {
  const supabase = createClient()

  // List state
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [pendingId, setPendingId] = useState<string>('')
  const [isNew, setIsNew] = useState(true)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [serviceInput, setServiceInput] = useState('')
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  // ── Modal helpers ──────────────────────────────────────────────────
  function openAdd() {
    const newId = crypto.randomUUID()
    setPendingId(newId)
    setIsNew(true)
    setForm({ ...EMPTY_FORM, sort_order: projects.length })
    setServiceInput('')
    setFormError(null)
    setModalOpen(true)
  }

  function openEdit(project: PortfolioProject) {
    setPendingId(project.id)
    setIsNew(false)
    setForm(projectToForm(project))
    setServiceInput('')
    setFormError(null)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setFormError(null)
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // ── Toggle publish ─────────────────────────────────────────────────
  async function handleTogglePublish(project: PortfolioProject) {
    setTogglingId(project.id)
    const newVal = !project.published
    const { error } = await supabase
      .from('portfolio')
      .update({ published: newVal })
      .eq('id', project.id)
    if (!error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: newVal } : p))
      )
    }
    setTogglingId(null)
  }

  // ── Delete ─────────────────────────────────────────────────────────
  async function handleDelete(project: PortfolioProject) {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return
    setDeletingId(project.id)
    const { error } = await supabase.from('portfolio').delete().eq('id', project.id)
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== project.id))
    }
    setDeletingId(null)
  }

  // ── Drag reorder ───────────────────────────────────────────────────
  function onDragStart(id: string) {
    setDraggedId(id)
  }

  function onDragOver(e: React.DragEvent, id: string) {
    e.preventDefault()
    setDragOverId(id)
  }

  async function onDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault()
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null)
      setDragOverId(null)
      return
    }
    const fromIndex = projects.findIndex((p) => p.id === draggedId)
    const toIndex = projects.findIndex((p) => p.id === targetId)
    const reordered = [...projects]
    const [moved] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, moved)
    const withOrder = reordered.map((p, i) => ({ ...p, sort_order: i }))
    setProjects(withOrder)
    setDraggedId(null)
    setDragOverId(null)
    // Persist new sort_orders
    await Promise.all(
      withOrder.map((p, i) =>
        supabase.from('portfolio').update({ sort_order: i }).eq('id', p.id)
      )
    )
  }

  function onDragEnd() {
    setDraggedId(null)
    setDragOverId(null)
  }

  // ── Image upload ───────────────────────────────────────────────────
  const uploadImage = useCallback(
    async (file: File, type: 'cover' | 'gallery'): Promise<string | null> => {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('projectId', pendingId)
      fd.append('type', type)
      const res = await fetch('/api/admin/upload-portfolio-image', {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) return null
      const json = await res.json()
      return json.url as string
    },
    [pendingId]
  )

  async function handleUploadCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const url = await uploadImage(file, 'cover')
    if (url) setField('cover_image', url)
    setUploadingCover(false)
    e.target.value = ''
  }

  async function handleUploadGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    const remaining = 8 - form.images.length
    const toUpload = files.slice(0, remaining)
    setUploadingGallery(true)
    const urls = await Promise.all(toUpload.map((f) => uploadImage(f, 'gallery')))
    const validUrls = urls.filter(Boolean) as string[]
    setField('images', [...form.images, ...validUrls])
    setUploadingGallery(false)
    e.target.value = ''
  }

  // ── Services input ─────────────────────────────────────────────────
  function handleServiceKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = serviceInput.trim()
      if (val && !form.services.includes(val)) {
        setField('services', [...form.services, val])
      }
      setServiceInput('')
    }
  }

  function addSuggestion(s: string) {
    if (!form.services.includes(s)) {
      setField('services', [...form.services, s])
    }
  }

  // ── Save ───────────────────────────────────────────────────────────
  async function handleSave() {
    if (!form.title.trim() || !form.client.trim()) {
      setFormError('Title and Client are required.')
      return
    }
    setSaving(true)
    setFormError(null)

    const payload = {
      id: pendingId,
      title: form.title.trim(),
      client: form.client.trim(),
      category: form.category,
      ref_code: form.ref_code.trim() || null,
      published: form.published,
      sort_order: form.sort_order,
      tagline: form.tagline.trim() || null,
      description: form.description.trim() || null,
      live_url: form.live_url.trim() || null,
      cover_image: form.cover_image,
      images: form.images.length ? form.images : null,
      services: form.services.length ? form.services : null,
      stats: form.stats.filter((s) => s.value.trim() && s.label.trim()).length
        ? form.stats.filter((s) => s.value.trim() && s.label.trim())
        : null,
    }

    const { data, error } = await supabase
      .from('portfolio')
      .upsert(payload)
      .select()
      .single()

    if (error) {
      setFormError(error.message)
      setSaving(false)
      return
    }

    if (isNew) {
      setProjects((prev) => [...prev, data as PortfolioProject])
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === pendingId ? (data as PortfolioProject) : p))
      )
    }
    setSaving(false)
    closeModal()
  }

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#fa5c1b] hover:bg-[#e04d0f] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Project List */}
      <div className="bg-[#1c1b1b] rounded-xl border border-white/5 overflow-hidden">
        {projects.length === 0 ? (
          <div className="py-24 text-center text-gray-600 text-sm">
            No projects yet. Click &quot;Add Project&quot; to get started.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {projects.map((project) => (
              <div
                key={project.id}
                draggable
                onDragStart={() => onDragStart(project.id)}
                onDragOver={(e) => onDragOver(e, project.id)}
                onDrop={(e) => onDrop(e, project.id)}
                onDragEnd={onDragEnd}
                className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                  dragOverId === project.id && draggedId !== project.id
                    ? 'bg-[#fa5c1b]/10 border-l-2 border-[#fa5c1b]'
                    : 'hover:bg-white/[0.02]'
                } ${draggedId === project.id ? 'opacity-40' : ''}`}
              >
                {/* Drag handle */}
                <GripVertical
                  size={16}
                  className="text-gray-600 cursor-grab active:cursor-grabbing flex-shrink-0"
                />

                {/* Cover thumbnail */}
                <div className="w-10 h-10 rounded-md overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={14} className="text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Title + client */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{project.title}</p>
                  <p className="text-xs text-gray-500 truncate">{project.client}</p>
                </div>

                {/* Category badge */}
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-xs uppercase tracking-wider flex-shrink-0">
                  {project.category}
                </span>

                {/* Ref code */}
                <span className="hidden md:block text-xs text-gray-600 flex-shrink-0 font-mono">
                  {project.ref_code ?? '—'}
                </span>

                {/* Published toggle */}
                <button
                  onClick={() => handleTogglePublish(project)}
                  disabled={togglingId === project.id}
                  className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
                    project.published ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                  aria-label={project.published ? 'Published' : 'Draft'}
                >
                  {togglingId === project.id ? (
                    <Loader2 size={12} className="absolute inset-0 m-auto animate-spin text-white" />
                  ) : (
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        project.published ? 'left-5' : 'left-1'
                      }`}
                    />
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => openEdit(project)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Edit project"
                >
                  <Pencil size={15} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(project)}
                  disabled={deletingId === project.id}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Delete project"
                >
                  {deletingId === project.id ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[400] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal panel */}
          <div className="relative z-10 w-full max-w-4xl mx-auto my-8 bg-[#1c1b1b] rounded-2xl border border-white/10 shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">
                {isNew ? 'Add Project' : 'Edit Project'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-8 py-8 space-y-10">
              {formError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {formError}
                </div>
              )}

              {/* SECTION 1 — Basic Info */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">
                  Basic Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">
                      Title <span className="text-[#fa5c1b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setField('title', e.target.value)}
                      placeholder="e.g. Sarvatra Energy Campaign"
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">
                      Client <span className="text-[#fa5c1b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.client}
                      onChange={(e) => setField('client', e.target.value)}
                      placeholder="e.g. Sarvatra Energy"
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setField('category', e.target.value)}
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#fa5c1b]/60"
                    >
                      {CATEGORY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Ref Code</label>
                    <input
                      type="text"
                      value={form.ref_code}
                      onChange={(e) => setField('ref_code', e.target.value)}
                      placeholder="RGS-2026-XX"
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Sort Order</label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setField('sort_order', Number(e.target.value))}
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#fa5c1b]/60"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => setField('published', !form.published)}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        form.published ? 'bg-green-600' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`absolute top-1.5 w-4 h-4 rounded-full bg-white transition-all ${
                          form.published ? 'left-7' : 'left-1.5'
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-300">
                      {form.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 2 — Story */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">Story</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={form.tagline}
                      onChange={(e) => setField('tagline', e.target.value)}
                      placeholder='e.g. "Powering Perception"'
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setField('description', e.target.value)}
                      rows={5}
                      placeholder="Tell the project story…"
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">
                      Live URL <span className="text-gray-600">(optional)</span>
                    </label>
                    <div className="relative">
                      <ExternalLink
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                      />
                      <input
                        type="url"
                        value={form.live_url}
                        onChange={(e) => setField('live_url', e.target.value)}
                        placeholder="https://instagram.com/…"
                        className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3 — Cover Image */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">
                  Cover Image
                </h3>
                <div className="flex items-start gap-6">
                  {/* Preview */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#0e0e0e] border border-white/10 flex-shrink-0 flex items-center justify-center">
                    {form.cover_image ? (
                      <Image
                        src={form.cover_image}
                        alt="Cover"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleUploadCover}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={uploadingCover}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors disabled:opacity-50"
                    >
                      {uploadingCover ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Plus size={14} />
                      )}
                      {uploadingCover ? 'Uploading…' : 'Upload Cover'}
                    </button>
                    {form.cover_image && (
                      <button
                        type="button"
                        onClick={() => setField('cover_image', null)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm text-red-400 transition-colors"
                      >
                        <X size={14} />
                        Remove Cover
                      </button>
                    )}
                    <p className="text-xs text-gray-600">JPG, PNG or WebP · max 5 MB</p>
                  </div>
                </div>
              </section>

              {/* SECTION 4 — Gallery */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">
                  Project Gallery{' '}
                  <span className="text-gray-600 normal-case tracking-normal text-[11px]">
                    ({form.images.length}/8)
                  </span>
                </h3>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                    {form.images.map((url) => (
                      <div
                        key={url}
                        className="relative aspect-square rounded-md overflow-hidden bg-[#0e0e0e] group"
                      >
                        <Image
                          src={url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setField(
                              'images',
                              form.images.filter((u) => u !== url)
                            )
                          }
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleUploadGallery}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery || form.images.length >= 8}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors disabled:opacity-50"
                >
                  {uploadingGallery ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Plus size={14} />
                  )}
                  {uploadingGallery ? 'Uploading…' : 'Add Images'}
                </button>
              </section>

              {/* SECTION 5 — Services */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">
                  Services Delivered
                </h3>
                {/* Tag pills */}
                {form.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.services.map((s) => (
                      <span
                        key={s}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fa5c1b]/15 border border-[#fa5c1b]/30 text-xs text-white"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() =>
                            setField(
                              'services',
                              form.services.filter((x) => x !== s)
                            )
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyDown={handleServiceKeyDown}
                  placeholder="Type a service and press Enter…"
                  className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60 mb-3"
                />
                {/* Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {SERVICE_SUGGESTIONS.filter((s) => !form.services.includes(s)).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSuggestion(s)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* SECTION 6 — Stats */}
              <section>
                <h3 className="text-xs uppercase tracking-widest text-[#fa5c1b] mb-5">
                  Results / Stats
                </h3>
                <div className="space-y-3 mb-4">
                  {form.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...form.stats]
                          updated[i] = { ...updated[i], value: e.target.value }
                          setField('stats', updated)
                        }}
                        placeholder="+280%"
                        className="w-28 bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60 font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...form.stats]
                          updated[i] = { ...updated[i], label: e.target.value }
                          setField('stats', updated)
                        }}
                        placeholder="Engagement"
                        className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#fa5c1b]/60"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setField(
                            'stats',
                            form.stats.filter((_, idx) => idx !== i)
                          )
                        }
                        className="p-2 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                {form.stats.length < 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      setField('stats', [...form.stats, { value: '', label: '' }])
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                    Add Stat
                  </button>
                )}
              </section>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-white/5">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#fa5c1b] hover:bg-[#e04d0f] disabled:opacity-60 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                {saving ? 'Saving…' : isNew ? 'Create Project' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
