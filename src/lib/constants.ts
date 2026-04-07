export const STORAGE_KEYS = {
  READING_STATE: 'reading-checkin:state',
  COMMUNITY: 'reading-checkin:community',
  THEME: 'reading-checkin:theme',
  USERNAME: 'reading-checkin:username',
} as const

export const TOTAL_PAGES = 366

export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/checkin', label: 'Check-in', icon: 'check' },
  { href: '/ai', label: 'AI', icon: 'sparkles' },
  { href: '/guide', label: 'Guide', icon: 'scroll' },
  { href: '/community', label: 'Community', icon: 'chat' },
  { href: '/book', label: 'Book', icon: 'book' },
] as const
