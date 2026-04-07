import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'FOMCAT | AI Book Companion',
  description:
    'Read "Freedom of Money" by CZ with Hakimi the plush cat. Daily check-ins, chapter guides, AI insights, and community discussion.',
  keywords: ['CZ', 'Binance', 'Freedom of Money', 'Hakimi', 'reading', 'AI', 'book club'],
  openGraph: {
    title: 'FOMCAT | AI Book Companion',
    description: 'Read along with Hakimi — your plush reading buddy for CZ\'s Freedom of Money',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg-primary)] antialiased">
        <Header />
        <main className="pt-14 pb-20 md:pb-8">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}
