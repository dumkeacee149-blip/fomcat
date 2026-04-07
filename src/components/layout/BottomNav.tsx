'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { IconHome, IconCheck, IconScroll, IconChat, IconBook, IconSparkles } from '@/components/icons/Icons'
import { cn } from '@/lib/cn'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: IconHome,
  check: IconCheck,
  sparkles: IconSparkles,
  scroll: IconScroll,
  chat: IconChat,
  book: IconBook,
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(255, 249, 227, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '3px solid #E5D0A8',
      }}
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
          const Icon = iconMap[item.icon]
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-center transition-all',
                isActive
                  ? 'text-[var(--color-gold-dark)] scale-110'
                  : 'text-[var(--color-text-muted)]'
              )}
            >
              <div className={cn(
                'w-8 h-8 flex items-center justify-center rounded-full transition-all',
                isActive && 'bg-[var(--color-gold)] text-[#2D1B0E] shadow-md'
              )}>
                <Icon size={18} />
              </div>
              <span
                className="text-[10px] font-extrabold"
                style={{ fontFamily: 'Lilita One, cursive' }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
