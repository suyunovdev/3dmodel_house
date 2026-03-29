import { Header } from '@/components/layout/Header'

export default function GenerateLoading() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-4">
          <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-80 bg-white/5 rounded animate-pulse mx-auto" />
          <div className="glass-card rounded-2xl p-8 mt-8 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
              </div>
            ))}
            <div className="h-12 bg-primary-500/20 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
