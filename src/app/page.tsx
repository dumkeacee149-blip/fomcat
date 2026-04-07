'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { IconBook, IconCheck, IconScroll, IconUsers, IconArrowRight, IconFlame, IconTrophy, IconStar, IconHeart, IconSparkles } from '@/components/icons/Icons'
import { bookInfo } from '@/data/book'
import { sections } from '@/data/chapters'

const Particles = dynamic(() => import('@/components/backgrounds/Particles'), { ssr: false })

/* Hakimi sticker positions — scattered meme faces */
const stickerPositions = [
  { top: '8%', right: '3%', size: 56, rotate: 12, delay: 0.8 },
  { top: '35%', left: '2%', size: 48, rotate: -15, delay: 1.2 },
  { bottom: '15%', right: '5%', size: 44, rotate: 8, delay: 1.5 },
  { bottom: '40%', left: '4%', size: 40, rotate: -10, delay: 1.8 },
] as const

const features = [
  {
    href: '/checkin',
    Icon: IconCheck,
    title: 'Daily Check-in',
    desc: 'Track pages & keep your streak alive',
    color: '#7ED957',
    cardClass: 'sticker-card-green',
    rotate: -1.5,
  },
  {
    href: '/guide',
    Icon: IconScroll,
    title: 'Chapter Guide',
    desc: 'Key takeaways & spicy quotes',
    color: '#FFB800',
    cardClass: '',
    rotate: 1,
  },
  {
    href: '/community',
    Icon: IconUsers,
    title: 'Community',
    desc: 'Share takes with fellow readers',
    color: '#A855F7',
    cardClass: 'sticker-card-purple',
    rotate: -0.5,
  },
  {
    href: '/book',
    Icon: IconBook,
    title: 'Book Info',
    desc: 'Full outline & where to buy',
    color: '#5DADE2',
    cardClass: 'sticker-card-blue',
    rotate: 1.5,
  },
] as const

/* Marquee items */
const marqueeItems = [
  'Freedom of Money',
  'FOMCAT',
  '100% to Charity',
  '366 Pages',
  "CZ's Story",
  'From Zero to Binance',
  '14-Day Launch',
  'Read with Hakimi',
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* === HERO === */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-4 pt-20 pb-16">
        {/* Animated particles background */}
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            particleCount={120}
            particleSpread={8}
            speed={0.08}
            particleColors={['#FFB800', '#FF6B9D', '#7ED957', '#5DADE2', '#A855F7', '#FF8C42']}
            moveParticlesOnHover
            particleHoverFactor={0.4}
            alphaParticles
            particleBaseSize={80}
            sizeRandomness={1.2}
            cameraDistance={25}
          />
        </div>
        {/* Confetti background dots */}
        <div className="absolute inset-0 confetti-bg opacity-20 pointer-events-none" />

        {/* Floating Hakimi stickers */}
        {stickerPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="hakimi-sticker hidden md:block"
            style={{
              ...pos,
              width: pos.size,
              height: pos.size,
              transform: `rotate(${pos.rotate}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: pos.delay, type: 'spring', bounce: 0.5 }}
          >
            <Image
              src="/images/hakimi-avatar.jpg"
              alt=""
              width={pos.size}
              height={pos.size}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}

        <div className="relative z-10 mx-auto max-w-5xl w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left — Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Speech bubble */}
                <div className="speech-bubble inline-block mb-6 max-w-xs">
                  <p className="text-sm font-extrabold text-[var(--color-text-primary)]">
                    gm gm! let&apos;s read CZ&apos;s book together~
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  <span className="sticker-badge sticker-badge-gold">AI-Powered</span>
                  <span className="sticker-badge sticker-badge-pink">Hakimi Approved</span>
                </div>

                <h1
                  className="text-5xl md:text-7xl text-[var(--color-text-primary)] mb-2 leading-none"
                  style={{ fontFamily: 'Lilita One, cursive' }}
                >
                  Freedom
                  <br />
                  <span className="text-gradient">of Money</span>
                </h1>

                <p
                  className="text-xl md:text-2xl text-[var(--color-gold-dark)] mb-4"
                  style={{ fontFamily: 'Lilita One, cursive' }}
                >
                  Read CZ&apos;s Book with a Plush Cat
                </p>

                <p className="text-[var(--color-text-secondary)] font-bold max-w-md mx-auto lg:mx-0 mb-8">
                  Join Hakimi&apos;s reading club — daily check-ins, chapter breakdowns, and spicy discussions. All vibes, no financial advice.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                  <Link href="/checkin" className="btn-chunky">
                    Start Reading
                  </Link>
                  <Link href="/book" className="btn-ghost">
                    About the Book
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right — Hakimi Hero Image */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
            >
              <div className="relative">
                <div
                  className="w-64 h-64 md:w-80 md:h-80 rounded-[32px] overflow-hidden border-4 border-[var(--color-gold)] shadow-xl"
                  style={{ boxShadow: '8px 8px 0 #E5D0A8' }}
                >
                  <Image
                    src="/images/hakimi-avatar.jpg"
                    alt="Hakimi the plush cat reading Freedom of Money"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                {/* Floating icon decorations */}
                <motion.span
                  className="absolute -top-4 -right-4 text-[var(--color-gold)]"
                  animate={{ y: [-4, 4, -4], rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IconStar size={28} />
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 -left-4 text-[var(--color-gold-dark)]"
                  animate={{ y: [4, -4, 4], rotate: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <IconBook size={24} />
                </motion.span>
                <motion.span
                  className="absolute top-1/2 -right-6 text-[var(--color-pink)]"
                  animate={{ x: [-2, 4, -2] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <IconHeart size={22} />
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === MARQUEE TICKER === */}
      <div className="overflow-hidden bg-[var(--color-gold)] border-y-3 border-[var(--color-gold-dark)] py-3">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-[#2D1B0E] font-extrabold text-sm whitespace-nowrap"
              style={{ fontFamily: 'Lilita One, cursive' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* === BANNER IMAGE === */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <motion.div
          className="rounded-[24px] overflow-hidden border-4 border-[var(--color-border-thick)]"
          style={{ boxShadow: '8px 8px 0 #E5D0A8' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[180px] md:h-[280px]">
            <Image
              src="/images/hakimi-banner.png"
              alt="Hakimi and friends reading Freedom of Money"
              fill
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </section>

      {/* === STATS BAR === */}
      <section className="tilt-section bg-[var(--color-gold-light)]" style={{ borderTop: '3px solid var(--color-gold)', borderBottom: '3px solid var(--color-gold)' }}>
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { Icon: IconBook, value: '366', label: 'Pages', color: 'var(--color-blue)' },
            { Icon: IconScroll, value: `${sections.length} Parts`, label: 'Sections', color: 'var(--color-green)' },
            { Icon: IconStar, value: bookInfo.price, label: 'Price', color: 'var(--color-gold)' },
            { Icon: IconHeart, value: '100%', label: 'To Charity', color: 'var(--color-pink)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="block mb-1" style={{ color: stat.color }}>
                <stat.Icon size={28} className="mx-auto" />
              </span>
              <p
                className="text-2xl font-black text-[#2D1B0E]"
                style={{ fontFamily: 'Lilita One, cursive' }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-bold text-[#2D1B0E]/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === FEATURE CARDS === */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl text-[var(--color-text-primary)] mb-2"
            style={{ fontFamily: 'Lilita One, cursive' }}
          >
            Choose Your Vibe
          </h2>
          <p className="text-[var(--color-text-secondary)] font-bold">
            Four ways to explore this book (all free, all fun)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              style={{ transform: `rotate(${f.rotate}deg)` }}
            >
              <Link href={f.href} className={`sticker-card ${f.cardClass} block p-6 group`}>
                <div className="flex items-start gap-4">
                  <span className="block" style={{ color: f.color }}>
                    <f.Icon size={32} />
                  </span>
                  <div className="flex-1">
                    <h3
                      className="text-lg text-[var(--color-text-primary)] mb-1"
                      style={{ fontFamily: 'Lilita One, cursive' }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] font-bold">
                      {f.desc}
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    <IconArrowRight size={20} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === SYNOPSIS — tilted section === */}
      <section className="tilt-section bg-white border-y-3 border-[var(--color-border-thick)]">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center">
          <span className="sticker-badge sticker-badge-gold mb-4 inline-flex">ABOUT THE BOOK</span>
          <p className="text-[var(--color-text-primary)] leading-relaxed font-bold mb-6">
            {bookInfo.synopsis}
          </p>
          <Link href="/book" className="btn-ghost text-sm">
            Read More
          </Link>
        </div>
      </section>

      {/* === CHAPTER MAP === */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center mb-10">
          <h2
            className="text-3xl text-[var(--color-text-primary)] mb-2"
            style={{ fontFamily: 'Lilita One, cursive' }}
          >
            Chapter Map
          </h2>
          <p className="text-[var(--color-text-secondary)] font-bold">
            6 parts, one wild ride
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const rotations = [-2, 1.5, -1, 2, -1.5, 1]
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', bounce: 0.3 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/guide?section=${section.id}`}
                  className="sticker-card block p-5 text-center group"
                  style={{ transform: `rotate(${rotations[i % 6]}deg)` }}
                >
                  <span
                    className="text-2xl font-black block mb-2 text-[var(--color-gold)]"
                    style={{ fontFamily: 'Lilita One, cursive' }}
                  >
                    {section.emoji}
                  </span>
                  <p
                    className="font-black text-sm text-[var(--color-text-primary)]"
                    style={{ fontFamily: 'Lilita One, cursive' }}
                  >
                    {section.titleEn}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] font-bold mt-1">
                    P.{section.pageRange[0]}-{section.pageRange[1]}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* === FOOTER CTA === */}
      <section className="bg-[var(--color-gold)] border-t-3 border-[var(--color-gold-dark)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[var(--color-gold-dark)] mx-auto mb-4 shadow-md">
              <Image
                src="/images/hakimi-avatar.jpg"
                alt="Hakimi"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <p
              className="text-3xl md:text-4xl text-[#2D1B0E] mb-3"
              style={{ fontFamily: 'Lilita One, cursive' }}
            >
              Ready to Read?
            </p>
            <p className="text-[#2D1B0E]/70 font-bold mb-8 max-w-md mx-auto">
              Hakimi is waiting. All proceeds go to charity. No excuses. Let&apos;s go.
            </p>
            <Link
              href="/checkin"
              className="btn-chunky bg-[#2D1B0E] text-white border-[#1a0f07]"
              style={{ boxShadow: '0 5px 0 #1a0f07' }}
            >
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
