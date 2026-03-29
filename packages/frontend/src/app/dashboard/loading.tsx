import { Header } from '@/components/layout/Header'

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-white/5 rounded-xl animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="h-48 bg-white/5 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
