export interface Insight {
  readonly id: string
  readonly authorName: string
  readonly content: string
  readonly sectionId?: string
  readonly likes: number
  readonly comments: readonly Comment[]
  readonly createdAt: number
}

export interface Comment {
  readonly id: string
  readonly insightId: string
  readonly authorName: string
  readonly content: string
  readonly createdAt: number
}
