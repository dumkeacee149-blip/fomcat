'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getStorageItem, setStorageItem } from '@/lib/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { sections } from '@/data/chapters'
import type { Insight } from '@/types/community'
import { IconHeart, IconChat } from '@/components/icons/Icons'

const sampleInsights: readonly Insight[] = [
  {
    id: 'sample-1',
    authorName: 'PixelReader',
    content: 'Chapter 1 blew my mind! CZ went from a dirt-floor farmhouse to building a $100B exchange. That\'s the definition of starting from zero.',
    sectionId: 'section-1',
    likes: 42,
    comments: [],
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'sample-2',
    authorName: 'CryptoBookworm',
    content: 'The launch day scene is insane — screen full of sell orders, zero buys, the receptionist quietly walking back to her desk. Most founders would have crumbled right there.',
    sectionId: 'section-2',
    likes: 38,
    comments: [],
    createdAt: Date.now() - 172800000,
  },
  {
    id: 'sample-3',
    authorName: 'BuilderMindset',
    content: '"Speed x obsession = dominance" — this should be tattooed on every founder\'s arm. Binance launched in 14 days and hit #1 in three months. Execution is the ultimate moat.',
    sectionId: 'section-2',
    likes: 56,
    comments: [],
    createdAt: Date.now() - 259200000,
  },
  {
    id: 'sample-4',
    authorName: 'FreedomSeeker',
    content: 'The regulatory chapter hit hard. 4 months in prison for incomplete paperwork — not fraud, not laundering. Then detained again for "overstaying his visa"... while he was literally in prison. The irony.',
    sectionId: 'section-5',
    likes: 71,
    comments: [],
    createdAt: Date.now() - 345600000,
  },
]

const avatarColors = ['#FF6B9D', '#FFB800', '#7ED957', '#5DADE2', '#A855F7', '#FF8C42']

export default function CommunityPage() {
  const [insights, setInsights] = useState<readonly Insight[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [selectedSection, setSelectedSection] = useState('')

  useEffect(() => {
    const saved = getStorageItem<Insight[]>(STORAGE_KEYS.COMMUNITY, [])
    const all = saved.length === 0 ? [...sampleInsights] : saved
    setInsights(all)
    setIsLoaded(true)
    setAuthorName(getStorageItem<string>(STORAGE_KEYS.USERNAME, ''))
  }, [])

  const saveInsights = useCallback((newInsights: readonly Insight[]) => {
    setInsights(newInsights)
    setStorageItem(STORAGE_KEYS.COMMUNITY, newInsights)
  }, [])

  const handlePost = () => {
    if (!content.trim() || !authorName.trim()) return
    const newInsight: Insight = {
      id: crypto.randomUUID(),
      authorName: authorName.trim(),
      content: content.trim(),
      sectionId: selectedSection || undefined,
      likes: 0,
      comments: [],
      createdAt: Date.now(),
    }
    saveInsights([newInsight, ...insights])
    setStorageItem(STORAGE_KEYS.USERNAME, authorName.trim())
    setContent('')
    setShowForm(false)
  }

  const handleLike = (id: string) => {
    saveInsights(insights.map((i) => i.id === id ? { ...i, likes: i.likes + 1 } : i))
  }

  const getSectionName = (sectionId?: string): string => {
    if (!sectionId) return ''
    const s = sections.find((sec) => sec.id === sectionId)
    return s ? `Part ${s.order}: ${s.titleEn}` : ''
  }

  const formatTime = (t: number): string => {
    const h = Math.floor((Date.now() - t) / 3600000)
    if (h < 1) return 'just now'
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  if (!isLoaded) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 rounded-full overflow-hidden animate-wiggle">
        <Image src="/images/hakimi-avatar.jpg" alt="" width={48} height={48} className="object-cover w-full h-full" />
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
          Community
        </h1>
        <p className="text-[var(--color-text-secondary)] font-bold">Share your hot takes</p>
      </motion.div>

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-chunky-pink w-full mb-6">
          Share an Insight
        </button>
      )}

      {showForm && (
        <motion.div className="sticker-card-pink p-6 mb-6 bg-white border-3 rounded-3xl" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ boxShadow: '6px 6px 0 #FFB4D0' }}>
          <h3 className="text-lg text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'Lilita One, cursive' }}>New Insight</h3>
          <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Your name" className="input-chunky mb-3" />
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="input-chunky mb-3">
            <option value="">Select section (optional)</option>
            {sections.map((s) => <option key={s.id} value={s.id}>Part {s.order}: {s.titleEn}</option>)}
          </select>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Drop your hottest take..." className="input-chunky h-24 resize-none mb-3" />
          <div className="flex gap-2">
            <button onClick={handlePost} className="btn-chunky flex-1">Post</button>
            <button onClick={() => setShowForm(false)} className="btn-ghost px-6">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            className="sticker-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white border-2 border-white shadow-md"
                style={{ background: avatarColors[i % avatarColors.length] }}
              >
                {insight.authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-extrabold text-[var(--color-text-primary)]">{insight.authorName}</p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-bold">{formatTime(insight.createdAt)}</p>
              </div>
            </div>

            {insight.sectionId && (
              <span className="sticker-badge sticker-badge-gold mb-2 inline-block text-xs">{getSectionName(insight.sectionId)}</span>
            )}

            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed font-bold mb-4">{insight.content}</p>

            <div className="flex items-center gap-4">
              <button onClick={() => handleLike(insight.id)} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-pink)] flex items-center gap-1.5 transition-colors font-extrabold">
                <IconHeart size={14} /> {insight.likes}
              </button>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5 font-extrabold">
                <IconChat size={14} /> {insight.comments.length}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
