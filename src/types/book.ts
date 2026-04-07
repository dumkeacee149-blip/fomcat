export interface BookInfo {
  readonly title: string
  readonly subtitle: string
  readonly author: string
  readonly authorEn: string
  readonly totalPages: number
  readonly publishDate: string
  readonly price: string
  readonly coverImage: string
  readonly synopsis: string
  readonly synopsisZh: string
  readonly amazonUrl: string
}

export interface Section {
  readonly id: string
  readonly order: number
  readonly titleZh: string
  readonly titleEn: string
  readonly emoji: string
  readonly description: string
  readonly pageRange: readonly [number, number]
  readonly chapters: readonly Chapter[]
}

export interface Chapter {
  readonly id: string
  readonly sectionId: string
  readonly order: number
  readonly title: string
  readonly titleZh: string
  readonly summary: string
  readonly keyTakeaways: readonly string[]
  readonly pageRange: readonly [number, number]
}

export interface Quote {
  readonly id: string
  readonly chapterId: string
  readonly sectionId: string
  readonly text: string
  readonly textZh: string
  readonly page: number
  readonly category: QuoteCategory
}

export type QuoteCategory = 'philosophy' | 'business' | 'personal' | 'crypto' | 'resilience'
