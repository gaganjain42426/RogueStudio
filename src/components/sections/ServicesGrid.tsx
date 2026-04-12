import { SERVICE_TILES } from '@/lib/constants'
import { AnimatedSection, AnimatedCard } from '@/components/ui/AnimatedSection'

export default function ServicesGrid() {
  return (
    <section className="bg-background py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SERVICE_TILES.map((tile, i) => (
              <AnimatedCard key={tile.label} delay={i * 0.05}>
                <div className="bg-surface-container-high p-6 md:p-8 rounded-lg flex flex-col items-center text-center hover:bg-surface-bright transition-colors duration-300 cursor-default">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4">
                    {tile.icon}
                  </span>
                  <span
                    className="font-bold text-sm text-on-surface"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {tile.label}
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
