'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { PlanViewer } from '@/components/result/PlanViewer'
import { RoomList } from '@/components/result/RoomList'
import { Explanation } from '@/components/result/Explanation'
import { PlanImage } from '@/components/result/PlanImage'
import { ExportButton } from '@/components/result/ExportButton'
import { Loader } from '@/components/ui/Loader'
import { usePlanStore } from '@/store/planStore'
import { api } from '@/lib/api'
import type { GeneratedPlan } from '@ai-house-planner/shared'
import { ArrowLeft, RefreshCw } from 'lucide-react'

interface ProjectData {
  _id: string
  inputData: Record<string, unknown>
  resultJson: GeneratedPlan
  explanation?: string
  imageUrl?: string
  createdAt: string
}

export default function ResultPage() {
  const params = useParams()
  const id = params.id as string
  const { currentResult, isGeneratingImage } = usePlanStore()

  const [project, setProject] = useState<ProjectData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Zustand store da hozirgi natija bo'lsa va ID mos kelsa — uni ishlatamiz
  const storeResult =
    currentResult && currentResult.projectId === id ? currentResult : null

  useEffect(() => {
    // Store da to'g'ri natija yo'q — API dan yuklaymiz
    if (!storeResult) {
      setIsLoading(true)
      api
        .get(`/projects/${id}`)
        .then((res: any) => {
          setProject(res.data)
        })
        .catch(() => {
          setError('Loyiha topilmadi yoki yuklanmadi')
        })
        .finally(() => setIsLoading(false))
    }
  }, [id, storeResult])

  // Ma'lumot manbai: store (yangi generate) yoki API (eski loyiha)
  const plan = storeResult?.plan ?? project?.resultJson ?? null
  const explanation =
    storeResult?.explanation ?? project?.explanation ?? 'Tavsif mavjud emas'
  const imageUrl = storeResult?.imageUrl ?? project?.imageUrl
  const isNewlyGenerated = !!storeResult

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader size="lg" text="Loyiha yuklanmoqda..." />
      </main>
    )
  }

  if (error || (!isLoading && !plan)) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-3xl">🏚️</span>
          </div>
          <p className="text-white text-xl font-semibold">Loyiha topilmadi</p>
          <p className="text-white/50 text-sm">{error ?? 'Bu loyiha mavjud emas yoki o\'chirilgan'}</p>
          <Link
            href="/generate"
            className="btn-primary inline-flex items-center gap-2 mt-2"
          >
            <RefreshCw size={16} />
            Yangi reja yaratish
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-10">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Loyihalar
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Sizning <span className="gradient-text">Uy Rejangiz</span>
            </h1>
          </div>
          <ExportButton plan={plan!} explanation={explanation} />
        </div>

        {/* Image generation in progress banner */}
        {isNewlyGenerated && isGeneratingImage && (
          <div className="mb-6 flex items-center gap-3 bg-primary-500/10 border border-primary-500/20 rounded-xl px-4 py-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <p className="text-primary-400 text-sm">
              AI rasmi yaratilmoqda... Bu 20-30 soniya olishi mumkin
            </p>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PlanViewer plan={plan!} />
            {imageUrl && <PlanImage imageUrl={imageUrl} />}
          </div>
          <div className="space-y-6">
            <RoomList plan={plan!} />
            <Explanation text={explanation} />
          </div>
        </div>
      </div>
    </main>
  )
}
