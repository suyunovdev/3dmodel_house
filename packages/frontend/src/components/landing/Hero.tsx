'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-primary-400 text-sm font-medium mb-6">
          <Sparkles size={14} />
          AI tomonidan yaratilgan professional uy rejalari
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Orzuingidagi <br />
          <span className="gradient-text">Uy Rejasini</span> <br />
          AI bilan yarating
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          Maydon, xona soni va uslubingizni kiriting — sun&apos;iy intellekt bir necha soniyada
          professional 2D uy rejasi va tavsifini yaratib beradi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/generate"
            className="btn-primary text-base py-4 px-8 flex items-center gap-2 justify-center"
          >
            Bepul Boshlash
            <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard" className="btn-secondary text-base py-4 px-8">
            Namunalarni Ko&apos;rish
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/5">
          {[
            { label: 'Yaratilgan rejalar', value: '1,200+' },
            { label: 'Foydalanuvchilar', value: '500+' },
            { label: 'Generatsiya vaqti', value: '< 30s' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
