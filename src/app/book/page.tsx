'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { bookInfo, authorBio } from '@/data/book'
import { sections } from '@/data/chapters'
import { IconArrowRight, IconBook, IconStar, IconCalendar } from '@/components/icons/Icons'

export default function BookPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
          Book Info
        </h1>
      </motion.div>

      {/* Book Hero Card */}
      <motion.div
        className="sticker-card p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Book cover */}
          <div
            className="w-44 h-64 rounded-2xl overflow-hidden border-4 border-[var(--color-gold)] flex-shrink-0"
            style={{ boxShadow: '6px 6px 0 #E5D0A8' }}
          >
            <Image
              src="/images/book-cover.jpg"
              alt="Freedom of Money by CZ"
              width={176}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="sticker-badge sticker-badge-gold">Best Seller</span>
              <span className="sticker-badge sticker-badge-green">100% Charity</span>
            </div>
            <h2 className="text-3xl text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
              {bookInfo.title}
            </h2>
            <p className="text-lg text-[var(--color-gold-dark)] font-extrabold mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
              {bookInfo.subtitle}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] font-bold mb-4">by {bookInfo.authorEn}</p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm font-bold mb-5">{bookInfo.synopsis}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="sticker-badge sticker-badge-gold">{bookInfo.totalPages} pages</span>
              <span className="sticker-badge sticker-badge-blue">{bookInfo.price}</span>
              <span className="sticker-badge sticker-badge-purple">{bookInfo.publishDate}</span>
            </div>
            <a href={bookInfo.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-chunky text-sm">
              Buy on Amazon
            </a>
          </div>
        </div>
      </motion.div>

      {/* Table of Contents */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl text-[var(--color-text-primary)] mb-6 text-center" style={{ fontFamily: 'Lilita One, cursive' }}>
          Table of Contents
        </h2>
        <div className="space-y-4">
          {sections.map((section, i) => {
            const rotations = [-1, 0.5, -0.5, 1, -0.8, 0.3]
            return (
              <div key={section.id} className="sticker-card p-5" style={{ transform: `rotate(${rotations[i % 6]}deg)` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-2xl font-black text-[var(--color-gold)]"
                    style={{ fontFamily: 'Lilita One, cursive' }}
                  >
                    {section.emoji}
                  </span>
                  <div>
                    <h3 className="font-black text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>
                      Part {section.order}: {section.titleEn}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-bold">P.{section.pageRange[0]}-{section.pageRange[1]}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-3">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      href={`/guide?section=${section.id}`}
                      className="text-xs px-3 py-2 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-border-thick)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-light)] transition-all font-bold"
                    >
                      {ch.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Author Bio */}
      <motion.div
        className="sticker-card-purple p-8 mb-8 bg-white border-3 rounded-3xl"
        style={{ boxShadow: '6px 6px 0 #D4ABFF', transform: 'rotate(0.5deg)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl text-[var(--color-text-primary)] mb-6 text-center" style={{ fontFamily: 'Lilita One, cursive' }}>
          About the Author
        </h2>
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold)] mx-auto mb-4 flex items-center justify-center border-3 border-[var(--color-gold-dark)]"
            style={{ boxShadow: '4px 4px 0 var(--color-gold-dark)' }}
          >
            <span className="text-2xl font-black text-[#2D1B0E]" style={{ fontFamily: 'Lilita One, cursive' }}>CZ</span>
          </div>
          <h3 className="text-xl text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>{authorBio.name}</h3>
          <p className="text-xs text-[var(--color-text-muted)] font-bold mb-4">{authorBio.name}</p>
          <p className="text-[var(--color-text-secondary)] text-sm font-bold leading-relaxed mb-5">{authorBio.bio}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href={authorBio.links.twitter} target="_blank" rel="noopener noreferrer" className="sticker-badge sticker-badge-blue">@cz_binance</a>
            <a href={authorBio.links.giggleAcademy} target="_blank" rel="noopener noreferrer" className="sticker-badge sticker-badge-green">Giggle Academy</a>
            <a href={authorBio.links.yziLabs} target="_blank" rel="noopener noreferrer" className="sticker-badge sticker-badge-gold">YZi Labs</a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
