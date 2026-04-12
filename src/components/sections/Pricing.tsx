import { PRICING_PLANS } from '@/lib/constants'
import { AnimatedSection, AnimatedCard } from '@/components/ui/AnimatedSection'

export default function Pricing() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-32 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black"
              style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
            >
              Choose Your{' '}
              <span
                className="text-primary-container italic font-normal"
                style={{ fontFamily: 'var(--loaded-playfair, "Playfair Display", serif)' }}
              >
                Pace
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PRICING_PLANS.map((plan, i) => (
              <AnimatedCard key={plan.name} delay={i * 0.1}>
                <div
                  className={`p-10 rounded-lg flex flex-col relative ${
                    plan.featured
                      ? 'bg-primary-container text-on-primary-fixed scale-[1.03] shadow-2xl z-10'
                      : 'bg-white/50 border border-outline-variant/10'
                  }`}
                >
                  {plan.featured && (
                    <div
                      className="absolute top-0 right-0 bg-white text-primary-container px-4 py-1 rounded-bl-lg font-bold text-xs uppercase"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      Most Popular
                    </div>
                  )}
                  <h3
                    className="text-2xl font-black"
                    style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      plan.featured ? 'text-on-primary-fixed/80' : 'text-on-tertiary-fixed-variant'
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mt-8 mb-8">
                    <span
                      className="text-4xl font-black"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-lg">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-12 flex-grow">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <span
                          className={`material-symbols-outlined text-xl ${
                            plan.featured ? 'text-white' : 'text-primary-container'
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  {plan.featured ? (
                    <button
                      className="w-full bg-white text-primary-container py-4 rounded-full font-bold hover:bg-surface transition-colors"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {plan.ctaLabel}
                    </button>
                  ) : (
                    <button
                      className="w-full border-2 border-primary-container text-primary-container py-4 rounded-full font-bold hover:bg-primary-container hover:text-white transition-all"
                      style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                    >
                      {plan.ctaLabel}
                    </button>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
