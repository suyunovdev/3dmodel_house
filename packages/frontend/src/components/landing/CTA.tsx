import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="relative bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">
              Hoziroq Boshlang
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Bepul ro&apos;yxatdan o&apos;ting va birinchi uy rejangizdni yarating
            </p>
            <Link
              href="/generate"
              className="btn-primary text-base py-4 px-10 inline-flex items-center gap-2"
            >
              Bepul Boshlash
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
