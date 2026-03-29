'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[DashboardError]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="text-6xl mb-4">📂</div>
        <h2 className="text-2xl font-bold text-white mb-2">Loyihalarni yuklashda xatolik</h2>
        <p className="text-white/50 mb-6 text-sm max-w-sm">
          {error.message || 'Serverga ulanishda muammo yuz berdi.'}
        </p>
        <button onClick={reset} className="btn-primary">
          Qayta urinish
        </button>
      </div>
    </main>
  )
}
