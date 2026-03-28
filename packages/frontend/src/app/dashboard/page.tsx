'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { ProjectGrid } from '@/components/dashboard/ProjectGrid'
import { useProjectStore } from '@/store/projectStore'
import { Loader } from '@/components/ui/Loader'

export default function DashboardPage() {
  const { projects, isLoading, fetchProjects } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mening <span className="gradient-text">Loyihalarim</span>
            </h1>
            <p className="text-white/60 mt-1">{projects.length} ta loyiha saqlangan</p>
          </div>
          <a href="/generate" className="btn-primary">
            + Yangi Reja
          </a>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </main>
  )
}
