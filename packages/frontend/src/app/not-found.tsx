import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-white/5 select-none mb-2">404</div>
        <div className="text-5xl mb-4">🏚️</div>
        <h1 className="text-2xl font-bold text-white mb-2">Sahifa topilmadi</h1>
        <p className="text-white/50 mb-8 text-sm">
          Siz izlagan sahifa mavjud emas yoki o&apos;chirilgan.
        </p>
        <Link href="/" className="btn-primary">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  )
}
