'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/cn'

export function Header() {
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255, 249, 227, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid #E5D0A8',
      }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-3 border-[var(--color-gold)] shadow-md group-hover:animate-wiggle transition-transform">
            <Image
              src="/images/hakimi-avatar.jpg"
              alt="Hakimi"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span
            className="text-xl text-[var(--color-text-primary)] hidden sm:block"
            style={{ fontFamily: 'Lilita One, cursive' }}
          >
            FOMCAT
          </span>
          <span className="text-lg sm:hidden font-black" style={{ fontFamily: 'Lilita One, cursive' }}>HR</span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-extrabold rounded-full transition-all',
                  isActive
                    ? 'bg-[var(--color-gold)] text-[#2D1B0E] shadow-md border-2 border-[var(--color-gold-dark)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white border-2 border-transparent hover:border-[var(--color-border-thick)]'
                )}
                style={{ fontFamily: 'Lilita One, cursive', letterSpacing: '0.5px' }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
