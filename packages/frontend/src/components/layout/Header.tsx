'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Home, Plus, LayoutDashboard } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Bosh sahifa', icon: Home },
  { href: '/generate', label: 'Reja yaratish', icon: Plus },
  { href: '/dashboard', label: 'Loyihalarim', icon: LayoutDashboard },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <span className="font-bold text-white text-lg">House Planner</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                pathname === item.href
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/generate" className="btn-primary text-sm py-2">
          Bepul Boshlash
        </Link>
      </div>
    </header>
  )
}
