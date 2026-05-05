'use client'

import { useState } from 'react'

export interface FAQ {
  q: string
  a: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  industryName: string
}

export function FAQAccordion({ faqs, industryName }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <span
            className="text-[#C8A96E] font-bold text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--loaded-inter, Inter, sans-serif)' }}
          >
            FAQs
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
          >
            Questions we get from{' '}
            <span className="text-[#C8A96E]">{industryName}</span> brands.
          </h2>
        </div>

        <div className="max-w-3xl divide-y divide-white/10 border-t border-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 text-left group"
                aria-expanded={openIdx === i}
              >
                <span
                  className="text-white font-bold text-lg leading-snug group-hover:text-[#C8A96E] transition-colors duration-200"
                  style={{ fontFamily: 'var(--loaded-epilogue, Epilogue, sans-serif)' }}
                >
                  {faq.q}
                </span>
                <span className="material-symbols-outlined text-[#C8A96E] text-2xl flex-shrink-0 mt-0.5 select-none transition-transform duration-300">
                  {openIdx === i ? 'remove' : 'add'}
                </span>
              </button>

              {/* Answer — animated with max-height */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIdx === i ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[#9CA3AF] leading-relaxed pr-10">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
