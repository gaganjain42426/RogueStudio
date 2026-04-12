export default function Marquee() {
  const items = [
    'Creativity that Disrupts',
    'Social Strategy',
    'Content Production',
    'Jaipur to the World',
  ]

  const text = items.join(' · ') + ' · '

  return (
    <section className="bg-primary-container py-5 overflow-hidden" aria-label="Agency taglines">
      <div className="flex whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center shrink-0 min-w-full animate-marquee"
            aria-hidden={i === 1}
          >
            <span
              className="text-on-primary-fixed font-black text-2xl md:text-4xl uppercase tracking-tighter pr-12"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
