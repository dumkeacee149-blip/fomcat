'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCheckIn } from '@/hooks/useCheckIn'
import { sections } from '@/data/chapters'
import { getRandomQuestion } from '@/data/quiz'
import type { QuizQuestion } from '@/data/quiz'
import { TOTAL_PAGES } from '@/lib/constants'
import { format, subDays } from 'date-fns'
import { IconFlame, IconStar, IconBook, IconCheck, IconTrophy, IconHeart } from '@/components/icons/Icons'

const CHALLENGE_DAYS = 10
const MIN_NOTE_LENGTH = 20

/* ── Step indicator ── */
type CheckInStep = 'section' | 'page' | 'quiz' | 'note' | 'done'

const stepLabels: Record<CheckInStep, string> = {
  section: 'Select Chapter',
  page: 'Enter Page',
  quiz: 'Verify Reading',
  note: 'Write Notes',
  done: 'Complete',
}

/* ── Heatmap ── */
function CalendarHeatmap({ checkIns }: { checkIns: readonly { date: string; pagesRead: number }[] }) {
  const days = Array.from({ length: 90 }, (_, i) => {
    const date = format(subDays(new Date(), 89 - i), 'yyyy-MM-dd')
    const record = checkIns.find((c) => c.date === date)
    return { date, pagesRead: record?.pagesRead ?? 0 }
  })

  const getColor = (pages: number): string => {
    if (pages === 0) return '#F0DFC0'
    if (pages < 20) return '#FFD54F'
    if (pages < 40) return '#FFB800'
    return '#7ED957'
  }

  return (
    <div className="grid grid-cols-[repeat(13,1fr)] gap-2">
      {days.map((day) => (
        <div
          key={day.date}
          className="aspect-square w-full min-w-[8px] rounded-md border-2 border-white/50"
          style={{ backgroundColor: getColor(day.pagesRead) }}
          title={`${day.date}: ${day.pagesRead} pages`}
        />
      ))}
    </div>
  )
}

/* ── 10-Day Challenge Tracker ── */
function ChallengeTracker({ currentStreak }: { currentStreak: number }) {
  const completedDays = Math.min(currentStreak, CHALLENGE_DAYS)
  const isComplete = completedDays >= CHALLENGE_DAYS

  return (
    <div className="sticker-card-green p-6 mb-6 bg-white border-3 rounded-3xl" style={{ boxShadow: '6px 6px 0 #B8F28B' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>
          {isComplete ? 'Challenge Complete!' : '10-Day Reading Challenge'}
        </h3>
        <span className="sticker-badge sticker-badge-gold text-xs">{completedDays}/{CHALLENGE_DAYS}</span>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: CHALLENGE_DAYS }, (_, i) => {
          const isDone = i < completedDays
          const isCurrent = i === completedDays && !isComplete
          return (
            <motion.div
              key={i}
              className="flex-1"
              initial={isDone ? { scale: 0.8 } : {}}
              animate={isDone ? { scale: 1 } : {}}
              transition={{ delay: i * 0.05, type: 'spring', bounce: 0.5 }}
            >
              <div
                className={`w-full aspect-square rounded-xl border-3 flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-[var(--color-green)] border-[#5BBF3A] text-white'
                    : isCurrent
                    ? 'bg-[var(--color-gold-light)] border-[var(--color-gold)] text-[var(--color-gold-dark)] animate-pulse'
                    : 'bg-[#F5EED9] border-[var(--color-border)] text-[var(--color-text-muted)]'
                }`}
                style={isDone ? { boxShadow: '0 3px 0 #5BBF3A' } : {}}
              >
                {isDone ? (
                  <IconCheck size={14} className="text-white" />
                ) : (
                  <span className="text-[10px] font-black" style={{ fontFamily: 'Lilita One, cursive' }}>{i + 1}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-[#E3FCCC] rounded-full overflow-hidden border-2 border-[#B8F28B] mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7ED957, #5BBF3A)' }}
          initial={{ width: 0 }}
          animate={{ width: `${(completedDays / CHALLENGE_DAYS) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Reward */}
      {isComplete ? (
        <motion.div
          className="bg-[var(--color-gold-light)] rounded-2xl p-5 border-3 border-[var(--color-gold)] text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <IconTrophy size={28} className="text-[var(--color-gold-dark)]" />
            <p className="text-xl text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>
              You earned a free book!
            </p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-4">
            Claim your copy of &quot;Freedom of Money&quot; by CZ.
          </p>
          <a href="https://t.me/hakimireads" target="_blank" rel="noopener noreferrer" className="btn-chunky text-sm">
            Claim Your Book
          </a>
        </motion.div>
      ) : (
        <div className="bg-[#F5EED9] rounded-2xl p-4 border-2 border-[var(--color-border)] flex items-center gap-4">
          <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-[var(--color-gold)] flex-shrink-0" style={{ boxShadow: '3px 3px 0 #E5D0A8' }}>
            <Image src="/images/hakimi-hat-reading.png" alt="Prize" width={64} height={80} className="object-cover w-full h-full" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-[var(--color-text-primary)] mb-1">
              Check in for {CHALLENGE_DAYS} days straight
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] font-bold mb-1">
              Get a free copy of &quot;Freedom of Money&quot; by CZ
            </p>
            <p className="text-xs text-[var(--color-text-muted)] font-bold">
              {CHALLENGE_DAYS - completedDays} day{CHALLENGE_DAYS - completedDays > 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main Page ── */
export default function CheckInPage() {
  const { state, isLoaded, checkIn, streakInfo, progress } = useCheckIn()

  // Step-based check-in flow
  const [step, setStep] = useState<CheckInStep>('section')
  const [selectedSection, setSelectedSection] = useState(sections[0].id)
  const [pageNumber, setPageNumber] = useState('')
  const [note, setNote] = useState('')
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizWrong, setQuizWrong] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Generate quiz question when section is selected
  const quizQuestion: QuizQuestion = useMemo(
    () => getRandomQuestion(selectedSection),
    [selectedSection]
  )

  const steps: CheckInStep[] = ['section', 'page', 'quiz', 'note']
  const currentStepIndex = steps.indexOf(step)

  const handleNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex])
    }
  }

  const handlePrevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex])
      setQuizWrong(false)
      setQuizAnswer(null)
    }
  }

  const handleQuizSubmit = () => {
    if (quizAnswer === quizQuestion.correctIndex) {
      setQuizWrong(false)
      handleNextStep()
    } else {
      setQuizWrong(true)
    }
  }

  const handleFinalSubmit = () => {
    const pages = parseInt(pageNumber, 10) || 20
    checkIn(pages, selectedSection, note)
    setStep('section')
    setPageNumber('')
    setNote('')
    setQuizAnswer(null)
    setQuizWrong(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3500)
  }

  const pageValid = /^\d+$/.test(pageNumber) && parseInt(pageNumber, 10) > 0 && parseInt(pageNumber, 10) <= TOTAL_PAGES
  const noteValid = note.trim().length >= MIN_NOTE_LENGTH

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full overflow-hidden animate-wiggle">
          <Image src="/images/hakimi-avatar.jpg" alt="" width={48} height={48} className="object-cover w-full h-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
          Daily Check-in
        </h1>
        <p className="text-[var(--color-text-secondary)] font-bold">Prove you read today, earn rewards</p>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF9E3]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="sticker-card p-10 text-center max-w-sm mx-4"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 animate-wiggle border-3 border-[var(--color-gold)]">
                <Image src="/images/hakimi-surprised.jpg" alt="" width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <p className="text-2xl text-[var(--color-green)] mb-2" style={{ fontFamily: 'Lilita One, cursive' }}>
                VERIFIED!
              </p>
              <p className="text-lg text-[var(--color-gold-dark)] font-extrabold mb-1">
                {streakInfo.current} day streak
              </p>
              {streakInfo.current >= CHALLENGE_DAYS && (
                <p className="text-sm text-[var(--color-green)] font-bold mt-2">Challenge complete! Claim your free book!</p>
              )}
              {streakInfo.current > 0 && streakInfo.current < CHALLENGE_DAYS && (
                <p className="text-xs text-[var(--color-text-muted)] font-bold mt-2">
                  {CHALLENGE_DAYS - streakInfo.current} more day{CHALLENGE_DAYS - streakInfo.current > 1 ? 's' : ''} to win a free book
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CHECK-IN FORM (step-based) ── */}
      {!streakInfo.todayCheckedIn ? (
        <motion.div
          className="sticker-card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-full h-2 rounded-full transition-all ${
                  i <= currentStepIndex ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'
                }`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] font-bold mb-1 uppercase tracking-wider">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
          <h3 className="text-xl text-[var(--color-text-primary)] mb-5" style={{ fontFamily: 'Lilita One, cursive' }}>
            {stepLabels[step]}
          </h3>

          {/* ── STEP 1: Select Section ── */}
          <AnimatePresence mode="wait">
            {step === 'section' && (
              <motion.div key="section" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-3">
                  Which part of the book are you reading?
                </p>
                <div className="space-y-2 mb-5">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSection(s.id)}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all font-bold text-sm ${
                        selectedSection === s.id
                          ? 'bg-[var(--color-gold-light)] border-[var(--color-gold)] text-[var(--color-text-primary)]'
                          : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)]'
                      }`}
                      style={selectedSection === s.id ? { boxShadow: '0 3px 0 var(--color-gold-dark)' } : {}}
                    >
                      <span className="font-black" style={{ fontFamily: 'Lilita One, cursive' }}>
                        Part {s.order}:
                      </span>{' '}
                      {s.titleEn}
                      <span className="text-xs text-[var(--color-text-muted)] ml-2">P.{s.pageRange[0]}-{s.pageRange[1]}</span>
                    </button>
                  ))}
                </div>
                <button onClick={handleNextStep} className="btn-chunky w-full">
                  Next
                </button>
              </motion.div>
            )}

            {/* ── STEP 2: Enter Page Number ── */}
            {step === 'page' && (
              <motion.div key="page" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-3">
                  What page are you on right now?
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="number"
                    min="1"
                    max={TOTAL_PAGES}
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    placeholder="e.g. 85"
                    className="input-chunky text-center text-2xl"
                    style={{ fontFamily: 'Lilita One, cursive', letterSpacing: '2px' }}
                  />
                </div>
                <p className="text-xs text-[var(--color-text-muted)] font-bold mb-5">
                  Enter a number between 1 and {TOTAL_PAGES}
                </p>
                <div className="flex gap-3">
                  <button onClick={handlePrevStep} className="btn-ghost flex-1">Back</button>
                  <button
                    onClick={handleNextStep}
                    disabled={!pageValid}
                    className={`btn-chunky flex-1 ${!pageValid ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Quiz ── */}
            {step === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-gold)] flex-shrink-0">
                    <Image src="/images/hakimi-hat-reading.png" alt="" width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                  <div className="speech-bubble flex-1">
                    <p className="text-sm font-extrabold text-[var(--color-text-primary)]">
                      {quizQuestion.question}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {quizQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => { setQuizAnswer(i); setQuizWrong(false) }}
                      className={`w-full text-left p-4 rounded-2xl border-3 transition-all font-bold text-sm ${
                        quizAnswer === i
                          ? quizWrong && quizAnswer === i
                            ? 'bg-red-50 border-[var(--color-red)] text-[var(--color-red)]'
                            : 'bg-[var(--color-gold-light)] border-[var(--color-gold)] text-[var(--color-text-primary)]'
                          : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-gold)]'
                      }`}
                    >
                      <span className="font-black mr-2" style={{ fontFamily: 'Lilita One, cursive' }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                {quizWrong && (
                  <motion.p
                    className="text-sm text-[var(--color-red)] font-bold mb-3 text-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Wrong answer! Try again, or re-read the chapter.
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <button onClick={handlePrevStep} className="btn-ghost flex-1">Back</button>
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                    className={`btn-chunky flex-1 ${quizAnswer === null ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    Verify
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Reading Notes ── */}
            {step === 'note' && (
              <motion.div key="note" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-sm text-[var(--color-text-secondary)] font-bold mb-3">
                  Write about what you read today (min {MIN_NOTE_LENGTH} characters)
                </p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What stood out? Any key lessons? Share your thoughts..."
                  className="input-chunky h-32 resize-none mb-2"
                />
                <p className={`text-xs font-bold mb-5 ${noteValid ? 'text-[var(--color-green)]' : 'text-[var(--color-text-muted)]'}`}>
                  {note.trim().length}/{MIN_NOTE_LENGTH} characters {noteValid ? '- Good to go!' : ''}
                </p>

                <div className="flex gap-3">
                  <button onClick={handlePrevStep} className="btn-ghost flex-1">Back</button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={!noteValid}
                    className={`btn-chunky-green flex-1 ${!noteValid ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    Submit Check-in
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* ── Already checked in today ── */
        <motion.div
          className="sticker-card-green p-6 mb-6 bg-white border-3 rounded-3xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ boxShadow: '6px 6px 0 #B8F28B' }}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-3 border-[var(--color-green)]">
            <Image src="/images/hakimi-hat-tongue.png" alt="" width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <IconCheck size={24} className="text-[var(--color-green)]" />
            <p className="text-xl text-[var(--color-green)]" style={{ fontFamily: 'Lilita One, cursive' }}>
              Checked in today!
            </p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-bold">
            Come back tomorrow to keep the streak going.
          </p>
        </motion.div>
      )}

      {/* ── 10-DAY CHALLENGE ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ChallengeTracker currentStreak={streakInfo.current} />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { Icon: IconFlame, value: streakInfo.current, label: 'Streak', color: 'var(--color-gold)' },
          { Icon: IconTrophy, value: streakInfo.best, label: 'Best', color: 'var(--color-green)' },
          { Icon: IconStar, value: `${progress}%`, label: 'Progress', color: 'var(--color-pink)' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, type: 'spring', bounce: 0.3 }}
            style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -2 : 2}deg)` }}
          >
            <span className="block mb-1" style={{ color: s.color }}>
              <s.Icon size={24} className="mx-auto" />
            </span>
            <p className="text-2xl font-black text-[var(--color-text-primary)]" style={{ fontFamily: 'Lilita One, cursive' }}>
              {s.value}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] font-bold">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="sticker-card p-5 mb-6">
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] font-bold mb-3">
          <span>P.{state.currentPage}</span>
          <span>{TOTAL_PAGES} pages</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="sticker-card p-5 mb-6">
        <h3 className="text-xs font-black text-[var(--color-text-muted)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'Lilita One, cursive' }}>
          Reading Heatmap (90 Days)
        </h3>
        <CalendarHeatmap checkIns={state.checkIns} />
        <div className="flex items-center justify-end gap-2 mt-3">
          <span className="text-[10px] text-[var(--color-text-muted)] font-bold">Less</span>
          {['#F0DFC0', '#FFD54F', '#FFB800', '#7ED957'].map((c) => (
            <div key={c} className="w-3.5 h-3.5 rounded-md border-2 border-white/50" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px] text-[var(--color-text-muted)] font-bold">More</span>
        </div>
      </div>

      {/* Recent History */}
      {state.checkIns.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-black text-[var(--color-text-muted)] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Lilita One, cursive' }}>
            Recent History
          </h3>
          <div className="space-y-2">
            {[...state.checkIns].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5).map((record) => (
              <div key={record.timestamp} className="sticker-card p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-[var(--color-text-primary)] font-extrabold">{record.date}</p>
                  {record.note && <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-1">{record.note}</p>}
                </div>
                <span className="sticker-badge sticker-badge-gold">+{record.pagesRead}p</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
