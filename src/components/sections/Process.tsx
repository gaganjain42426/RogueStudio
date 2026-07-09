import FadeInUp from '@/components/animations/FadeInUp'

/**
 * Process — how an engagement actually runs, brief to report.
 * A real sequence, so the numbering carries information. Server component.
 */

const STEPS = [
  { n: '01', title: 'Brief', detail: 'One call. Your goals, your audience, what "working" looks like in numbers.' },
  { n: '02', title: 'Shoot', detail: 'We come to you — founder features, product, on-site coverage. Our gear, our crew.' },
  { n: '03', title: 'Edit', detail: 'Cut, graded, subtitled, and sound-designed in-house. Nothing outsourced.' },
  { n: '04', title: 'Post', detail: 'Calendar-driven publishing with captions and community handled for you.' },
  { n: '05', title: 'Ads', detail: 'The best organic performers become paid creative. Same team, no handoff.' },
  { n: '06', title: 'Report', detail: 'A live client portal — calendar, tasks, invoices, results. No "monthly PDF."' },
]

export default function Process() {
  return (
    <section className="bg-background py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <FadeInUp>
          <span className="text-secondary font-bold text-xs tracking-widest uppercase">
            How it runs
          </span>
          <h2
            className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Brief on Monday.{' '}
            <span
              className="italic font-normal"
              style={{ fontFamily: 'var(--font-serif-accent)', color: '#fa5c1b' }}
            >
              Posting by Friday.
            </span>
          </h2>
        </FadeInUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-background p-8 md:p-10">
              <span
                className="text-xs"
                style={{ fontFamily: 'var(--font-label)', color: '#fa5c1b' }}
              >
                {step.n}
              </span>
              <h3
                className="mt-3 text-xl md:text-2xl font-black text-white"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(229,226,225,0.66)' }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
