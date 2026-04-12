import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-end overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/roguestudio-hero/1440/900"
          alt="Rogue Studio — Dark cinematic background"
          fill
          priority
          quality={90}
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="text-[25vw] font-black text-white/[0.03] uppercase leading-none"
          style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
        >
          Rogue
        </span>
      </div>

      {/* Top label */}
      <div className="absolute top-28 left-6 md:left-8 z-10">
        <span className="text-secondary text-xs font-bold tracking-widest uppercase">
          Social Media &amp; Creative Agency · Jaipur, India
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-20 md:pb-28 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* Left — description */}
        <div className="max-w-md hidden md:block">
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
            Based in Jaipur, we are a collective of misfits and masters redefining the digital
            frontier through raw creativity.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 border border-outline-variant/30 text-on-surface px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-container transition-colors"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            See Our Work →
          </Link>
        </div>

        {/* Right — headline stack */}
        <div className="text-right">
          <div className="flex flex-col items-end">
            <h1
              className="text-7xl md:text-[9rem] font-black text-white leading-[0.85]"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              SOCIAL
            </h1>
            <h1
              className="text-7xl md:text-[9rem] font-black text-white leading-[0.85]"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              CREATIVE
            </h1>
            <h1
              className="text-7xl md:text-[9rem] font-black text-primary-container leading-[0.85] italic"
              style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
            >
              Studio
            </h1>
          </div>
          <div className="mt-6 md:hidden text-left">
            <p className="text-lg text-on-surface-variant">
              We are a Jaipur-based agency crafting cinematic digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <span className="material-symbols-outlined text-white/40 text-3xl">expand_more</span>
      </div>
    </header>
  )
}
