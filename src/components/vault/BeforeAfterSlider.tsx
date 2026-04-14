'use client'

import { useState, useRef } from 'react'

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, x)))
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-surface-container rounded-sm overflow-hidden cursor-col-resize select-none"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Before side */}
      <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high">
        <span className="text-xs tracking-[0.2em] uppercase text-on-surface-variant">Raw</span>
      </div>

      {/* After side */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-surface-container-highest"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-on-surface-variant">
          Colour Graded
        </span>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-primary z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shadow-lg">
          <span className="text-on-primary-fixed text-xs font-bold">⇔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.15em] uppercase text-on-surface-variant/60">
        Before
      </span>
      <span className="absolute bottom-3 right-3 text-[10px] tracking-[0.15em] uppercase text-on-surface-variant/60">
        After
      </span>
    </div>
  )
}
