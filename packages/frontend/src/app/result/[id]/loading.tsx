import { Header } from '@/components/layout/Header'

export default function ResultLoading() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl h-64 animate-pulse" />
            <div className="glass-card rounded-2xl p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 bg-white/5 rounded animate-pulse" style={{ width: `${85 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
