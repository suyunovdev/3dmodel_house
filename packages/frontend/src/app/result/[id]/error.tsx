'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import Link from 'next/link'

export default function ResultError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[ResultError]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="text-6xl mb-4">🏚️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Natijani yuklab bo&apos;lmadi</h2>
        <p className="text-white/50 mb-6 text-sm max-w-sm">
          {error.message || 'Reja topilmadi yoki xatolik yuz berdi'}
        </p>
        <div className="flex gap-3">
          <button onClick={reset} className="btn-secondary">
            Qayta urinish
          </button>
          <Link href="/generate" className="btn-primary">
            Yangi reja yaratish
          </Link>
        </div>
      </div>
    </main>
  )
}
