export interface CheckInRecord {
  readonly date: string // ISO date "2026-04-06"
  readonly pagesRead: number
  readonly currentPage: number
  readonly sectionId: string
  readonly note: string
  readonly timestamp: number
}

export interface ReadingState {
  readonly checkIns: readonly CheckInRecord[]
  readonly currentStreak: number
  readonly bestStreak: number
  readonly totalPagesRead: number
  readonly currentPage: number
  readonly startDate: string
  readonly username: string
}

export interface StreakInfo {
  readonly current: number
  readonly best: number
  readonly todayCheckedIn: boolean
}
