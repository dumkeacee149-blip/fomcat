'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections } from '@/data/chapters'
import { quotes } from '@/data/quotes'
import type { Quote } from '@/types/book'
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconStar } from '@/components/icons/Icons'

const categoryLabels: Record<string, string> = {
  philosophy: 'PHILOSOPHY',
  business: 'BUSINESS',
  personal: 'PERSONAL',
  crypto: 'CRYPTO',
  resilience: 'RESILIENCE',
}

const categoryColors: Record<string, string> = {
  philosophy: '#A855F7',
  business: '#FFB800',
  personal: '#5DADE2',
  crypto: '#7ED957',
  resilience: '#FF6B9D',
}

function QuoteCard({ quote }: { quote: Quote }) {
  const label = categoryLabels[quote.category] ?? 'QUOTE'
  const color = categoryColors[quote.category] ?? '#FFB800'

  return (
    <motion.div
      className="sticker-card p-8 text-center min-h-[280px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, x: 80, rotate: 5 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: -80, rotate: -5 }}
      transition={{ type: 'spring', bounce: 0.3 }}
    >
      <span
        className="sticker-badge mb-5"
        style={{ background: `${color}20`, color, borderColor: color }}
      >
        {label}
      </span>
      <p className="text-lg text-[var(--color-text-primary)] mb-4 leading-relaxed font-extrabold">
        &ldquo;{quote.text}&rdquo;
      </p>
      <span className="sticker-badge sticker-badge-gold text-xs">P.{quote.page}</span>
    </motion.div>
  )
}

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'quotes'>('chapters')
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const nextQuote = () => setCurrentQuoteIndex((i) => (i + 1) % quotes.length)
  const prevQuote = () => setCurrentQuoteIndex((i) => (i - 1 + quotes.length) % quotes.length)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
          Chapter Guide
        </h1>
        <p className="text-[var(--color-text-secondary)] font-bold">Key takeaways & spicy quotes</p>
      </motion.div>

      {/* Tab Bar */}
      <div className="flex gap-3 mb-8 justify-center">
        {(['chapters', 'quotes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-sm rounded-full transition-all border-3 ${
              activeTab === tab
                ? 'bg-[var(--color-gold)] text-[#2D1B0E] border-[var(--color-gold-dark)] shadow-md'
                : 'text-[var(--color-text-muted)] bg-white border-[var(--color-border-thick)] hover:border-[var(--color-gold)]'
            }`}
            style={{ fontFamily: 'Lilita One, cursive', boxShadow: activeTab === tab ? '0 4px 0 var(--color-gold-dark)' : 'none' }}
          >
            {tab === 'chapters' ? 'CHAPTERS' : 'QUOTES'}
          </button>
        ))}
      </div>

      {/* Chapters Tab */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          {sections.map((section, i) => {
            const isExpanded = expandedSection === section.id
            const rotations = [-1, 0.5, -0.5, 1, -0.8, 0.3]
            return (
              <motion.div
                key={section.id}
                className="sticker-card overflow-hidden"
                style={{ transform: `rotate(${rotations[i % 6]}deg)` }}
                layout
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-[var(--color-gold)]/5 transition-colors"
                >
                  <span
                    className="text-2xl font-black text-[var(--color-gold)]"
                    style={{ fontFamily: 'Lilita One, cursive' }}
                  >
                    {section.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-black text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>
                      {section.titleEn}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-bold">P.{section.pageRange[0]}-{section.pageRange[1]}</p>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <IconChevronDown size={20} className="text-[var(--color-text-muted)]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t-3 border-[var(--color-border-thick)]"
                    >
                      <div className="p-5">
                        <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-4">{section.description}</p>
                        <div className="space-y-3">
                          {section.chapters.map((ch) => (
                            <div key={ch.id} className="bg-[var(--color-bg-primary)] rounded-2xl p-4 border-3 border-[var(--color-border)]">
                              <h4 className="font-black text-sm text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                                {ch.title}
                              </h4>
                              <p className="text-xs text-[var(--color-text-secondary)] font-bold mb-3">{ch.summary}</p>
                              <div className="space-y-1.5">
                                {ch.keyTakeaways.map((t, j) => (
                                  <p key={j} className="text-xs flex gap-2 items-start">
                                    <IconStar size={12} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                                    <span className="text-[var(--color-text-secondary)] font-bold">{t}</span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Quotes Tab */}
      {activeTab === 'quotes' && (
        <div>
          <AnimatePresence mode="wait">
            <QuoteCard key={quotes[currentQuoteIndex].id} quote={quotes[currentQuoteIndex]} />
          </AnimatePresence>
          <div className="flex items-center justify-between mt-5">
            <button onClick={prevQuote} className="btn-ghost text-sm px-4 py-2">Prev</button>
            <span className="text-sm text-[var(--color-text-muted)] font-extrabold" style={{ fontFamily: 'Lilita One, cursive' }}>
              {currentQuoteIndex + 1} / {quotes.length}
            </span>
            <button onClick={nextQuote} className="btn-ghost text-sm px-4 py-2">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
