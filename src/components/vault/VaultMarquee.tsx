'use client'

interface Props {
  names: string[]
}

export default function VaultMarquee({ names }: Props) {
  const doubled = [...names, ...names]

  return (
    <div className="w-full overflow-hidden border-b border-outline-variant/20 py-5">
      <div className="flex animate-vault-marquee whitespace-nowrap">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-3xl md:text-5xl font-light tracking-wide text-on-background/15 mx-8 md:mx-16"
            style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
