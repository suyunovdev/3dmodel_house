import { Header } from '@/components/layout/Header'
import { PlanForm } from '@/components/form/PlanForm'

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Uy rejangiznyi <span className="gradient-text">yarating</span>
            </h1>
            <p className="text-white/60 text-lg">
              Ma&apos;lumotlarni kiriting — AI bir necha soniyada professional uy rejasini yaratib beradi
            </p>
          </div>
          <PlanForm />
        </div>
      </div>
    </main>
  )
}
