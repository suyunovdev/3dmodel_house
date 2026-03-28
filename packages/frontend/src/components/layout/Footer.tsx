import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-bold text-white">House Planner</span>
          </div>

          <p className="text-white/40 text-sm">
            © 2024 AI House Planner. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/generate" className="text-white/40 hover:text-white text-sm transition-colors">
              Reja yaratish
            </Link>
            <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">
              Loyihalar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
