'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { Home, Plus, LayoutDashboard, LogOut, User, LogIn } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Bosh sahifa', icon: Home },
  { href: '/generate', label: 'Reja yaratish', icon: Plus },
  { href: '/dashboard', label: 'Loyihalarim', icon: LayoutDashboard },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, logout, fetchMe } = useAuthStore()

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

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

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl">
                <User size={14} className="text-primary-400" />
                <span className="text-white/70 text-sm">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:block">Chiqish</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
              >
                <LogIn size={16} />
                Kirish
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2">
                Bepul Boshlash
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
