'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-3">Xatolik yuz berdi</h1>
        <p className="text-white/50 mb-8 text-sm">
          {error.message || 'Kutilmagan xatolik. Iltimos qayta urinib ko\'ring.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary"
          >
            Qayta urinish
          </button>
          <a href="/" className="btn-secondary">
            Bosh sahifa
          </a>
        </div>
      </div>
    </main>
  )
}
