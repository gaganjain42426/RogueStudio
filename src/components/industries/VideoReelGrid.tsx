'use client'

import { useRef, useEffect, useState } from 'react'

export interface ReelItem {
  src: string
  label: string
  clientName: string
}

interface VideoCardProps {
  reel: ReelItem
}

function VideoCard({ reel }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasSetSrc = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return
        if (entry.isIntersecting) {
          if (!hasSetSrc.current) {
            video.src = reel.src
            hasSetSrc.current = true
          }
          video.play().catch(() => {
            // Autoplay blocked — silently fail (muted autoplay usually works)
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reel.src])

  return (
    <div className="flex flex-col gap-3">
      {/* Portrait video wrapper */}
      <div
        className="relative rounded-xl overflow-hidden bg-[#111827] cursor-pointer group"
        style={{ aspectRatio: '9 / 16' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="material-symbols-outlined text-white text-5xl select-none">
            play_circle
          </span>
          <p
            className="text-white font-black text-base text-center px-4 leading-tight"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            {reel.clientName}
          </p>
          <p className="text-[#C8A96E] text-sm font-bold">{reel.label}</p>
        </div>

        {/* Always-visible bottom gradient label */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 transition-opacity duration-300 ${
            hovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-[#C8A96E] text-xs font-bold uppercase tracking-wider">
            {reel.label}
          </p>
        </div>
      </div>

    </div>
  )
}

interface VideoReelGridProps {
  reels: ReelItem[]
}

export function VideoReelGrid({ reels }: VideoReelGridProps) {
  if (reels.length === 0) {
    return (
      <section className="bg-[#0a0a0a] py-24 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span
              className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
            >
              Our Work in Motion
            </span>
            <h2
              className="mt-4 text-3xl md:text-5xl font-black text-white"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Watch what we've built.
            </h2>
          </div>
          <div className="border-2 border-dashed border-[#C8A96E]/30 rounded-2xl py-20 text-center">
            <span className="material-symbols-outlined text-[#C8A96E] text-5xl select-none">
              video_library
            </span>
            <p
              className="mt-5 text-xl font-black text-white"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Client reels coming soon.
            </p>
            <p className="mt-2 text-[#9CA3AF] text-sm max-w-sm mx-auto">
              We're currently producing content for brands in this industry.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <span
            className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
          >
            Our Work in Motion
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Watch what we've built.
          </h2>
          <p className="mt-3 text-lg text-[#9CA3AF]">
            Real content produced for real clients. No stock. No filler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel, i) => (
            <VideoCard key={`${reel.src}-${i}`} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  )
}
