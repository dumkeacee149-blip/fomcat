'use client'

import { useState, useEffect, useCallback } from 'react'
import { format, differenceInCalendarDays, parseISO } from 'date-fns'
import { getStorageItem, setStorageItem } from '@/lib/storage'
import { STORAGE_KEYS, TOTAL_PAGES } from '@/lib/constants'
import type { ReadingState, CheckInRecord, StreakInfo } from '@/types/checkin'

const defaultState: ReadingState = {
  checkIns: [],
  currentStreak: 0,
  bestStreak: 0,
  totalPagesRead: 0,
  currentPage: 0,
  startDate: '',
  username: '',
}

function calculateStreak(checkIns: readonly CheckInRecord[]): StreakInfo {
  if (checkIns.length === 0) {
    return { current: 0, best: 0, todayCheckedIn: false }
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  const sorted = [...checkIns].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const todayCheckedIn = sorted[0].date === today

  // Calculate current streak
  let current = 0
  const startDate = todayCheckedIn ? today : format(
    new Date(Date.now() - 86400000), 'yyyy-MM-dd'
  )

  for (const record of sorted) {
    const expected = format(
      new Date(new Date(startDate).getTime() - current * 86400000),
      'yyyy-MM-dd'
    )
    if (record.date === expected) {
      current++
    } else {
      break
    }
  }

  // Calculate best streak
  let best = 0
  let tempStreak = 1
  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInCalendarDays(
      parseISO(sorted[i - 1].date),
      parseISO(sorted[i].date)
    )
    if (diff === 1) {
      tempStreak++
    } else {
      best = Math.max(best, tempStreak)
      tempStreak = 1
    }
  }
  best = Math.max(best, tempStreak, current)

  return { current, best, todayCheckedIn }
}

export function useCheckIn() {
  const [state, setState] = useState<ReadingState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = getStorageItem<ReadingState>(STORAGE_KEYS.READING_STATE, defaultState)
    setState(saved)
    setIsLoaded(true)
  }, [])

  const saveState = useCallback((newState: ReadingState) => {
    setState(newState)
    setStorageItem(STORAGE_KEYS.READING_STATE, newState)
  }, [])

  const checkIn = useCallback(
    (pagesRead: number, sectionId: string, note: string) => {
      const today = format(new Date(), 'yyyy-MM-dd')
      const existingIndex = state.checkIns.findIndex((c) => c.date === today)

      const newRecord: CheckInRecord = {
        date: today,
        pagesRead,
        currentPage: Math.min(state.currentPage + pagesRead, TOTAL_PAGES),
        sectionId,
        note,
        timestamp: Date.now(),
      }

      const newCheckIns =
        existingIndex >= 0
          ? state.checkIns.map((c, i) => (i === existingIndex ? newRecord : c))
          : [...state.checkIns, newRecord]

      const streak = calculateStreak(newCheckIns)

      const newState: ReadingState = {
        ...state,
        checkIns: newCheckIns,
        currentPage: newRecord.currentPage,
        totalPagesRead: state.totalPagesRead + pagesRead,
        currentStreak: streak.current,
        bestStreak: streak.best,
        startDate: state.startDate || today,
      }

      saveState(newState)
    },
    [state, saveState]
  )

  const streakInfo = calculateStreak(state.checkIns)
  const progress = Math.round((state.currentPage / TOTAL_PAGES) * 100)

  return {
    state,
    isLoaded,
    checkIn,
    streakInfo,
    progress,
    setUsername: (username: string) => saveState({ ...state, username }),
  }
}
