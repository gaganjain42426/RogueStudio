/**
 * ProofTicker — the marquee slot, doing persuasion work instead of taglines.
 *
 * Every item is a real client and a real number from the portfolio data.
 * Server component; the loop is pure CSS (with a reduced-motion guard in
 * globals.css).
 */

const RECEIPTS = [
  { client: 'Sarvatra Energy', result: '10X return on ad spend' },
  { client: 'Solar leads', result: 'under ₹15 each' },
  { client: 'Naman Vaastu', result: '5X minimum ROI' },
  { client: 'The Secret Grapher', result: '1M+ view reels' },
  { client: 'Rogue Studio', result: '40M+ views delivered' },
  { client: 'Since 2021', result: '150+ projects shipped' },
]

export default function ProofTicker() {
  return (
    <section className="bg-primary-container py-5 overflow-hidden" aria-label="Client results">
      <div className="flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center shrink-0 min-w-full animate-marquee"
            aria-hidden={i === 1}
          >
            {RECEIPTS.map((r) => (
              <span
                key={`${i}-${r.client}`}
                className="flex items-baseline gap-3 pr-16"
              >
                <span
                  className="text-on-primary-fixed font-black text-xl md:text-3xl uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {r.client}
                </span>
                <span
                  className="text-on-primary-fixed/80 italic text-lg md:text-2xl"
                  style={{ fontFamily: 'var(--font-serif-accent)' }}
                >
                  {r.result}
                </span>
                <span className="text-on-primary-fixed/50 text-2xl" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
