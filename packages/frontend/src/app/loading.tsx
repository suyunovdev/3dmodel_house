export default function GlobalLoading() {
  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin" />
        <p className="text-white/40 text-sm">Yuklanmoqda...</p>
      </div>
    </main>
  )
}
