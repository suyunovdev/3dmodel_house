'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { PlanViewer } from '@/components/result/PlanViewer'
import { RoomList } from '@/components/result/RoomList'
import { Explanation } from '@/components/result/Explanation'
import { PlanImage } from '@/components/result/PlanImage'
import { ExportButton } from '@/components/result/ExportButton'
import { usePlanStore } from '@/store/planStore'
import { Loader } from '@/components/ui/Loader'

export default function ResultPage() {
  const params = useParams()
  const { currentResult, isLoading } = usePlanStore()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader size="lg" text="AI uy rejangizdni yaratmoqda..." />
      </main>
    )
  }

  if (!currentResult) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-xl">Natija topilmadi</p>
          <a href="/generate" className="btn-primary mt-4 inline-block">Qayta yaratish</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Sizning <span className="gradient-text">Uy Rejangiz</span>
          </h1>
          <ExportButton plan={currentResult.plan} explanation={currentResult.explanation} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlanViewer plan={currentResult.plan} />
            {currentResult.imageUrl && <PlanImage imageUrl={currentResult.imageUrl} />}
          </div>
          <div className="space-y-6">
            <RoomList plan={currentResult.plan} />
            <Explanation text={currentResult.explanation} />
          </div>
        </div>
      </div>
    </main>
  )
}
