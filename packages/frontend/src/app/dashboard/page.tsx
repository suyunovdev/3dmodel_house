'use client'

import { useEffect, useCallback, useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { ProjectGrid } from '@/components/dashboard/ProjectGrid'
import { DashboardFilter } from '@/components/dashboard/DashboardFilter'
import { Pagination } from '@/components/ui/Pagination'
import { useProjectStore } from '@/store/projectStore'
import { Loader } from '@/components/ui/Loader'

export default function DashboardPage() {
  const {
    projects,
    total,
    page,
    totalPages,
    isLoading,
    search,
    styleFilter,
    fetchProjects,
    setSearch,
    setStyleFilter,
  } = useProjectStore()

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Initial load
  useEffect(() => {
    fetchProjects(1, '', '')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchProjects(1, value, styleFilter)
    }, 400)
  }, [styleFilter, fetchProjects, setSearch])

  const handleStyleChange = useCallback((value: string) => {
    setStyleFilter(value)
    fetchProjects(1, search, value)
  }, [search, fetchProjects, setStyleFilter])

  const handleClear = useCallback(() => {
    setSearch('')
    setStyleFilter('')
    fetchProjects(1, '', '')
  }, [fetchProjects, setSearch, setStyleFilter])

  const handlePageChange = useCallback((newPage: number) => {
    fetchProjects(newPage, search, styleFilter)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [search, styleFilter, fetchProjects])

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <div className="container mx-auto px-4 py-12">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mening <span className="gradient-text">Loyihalarim</span>
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              {total > 0 ? `${total} ta loyiha` : 'Hali loyiha yo\'q'}
            </p>
          </div>
          <a href="/generate" className="btn-primary hidden sm:flex items-center gap-2">
            + Yangi Reja
          </a>
        </div>

        {/* Filters */}
        <DashboardFilter
          search={search}
          styleFilter={styleFilter}
          onSearchChange={handleSearchChange}
          onStyleChange={handleStyleChange}
          onClear={handleClear}
        />

        {/* Grid or loader */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            <ProjectGrid projects={projects} hasFilters={!!(search || styleFilter)} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}

        {/* Mobile new button */}
        <a
          href="/generate"
          className="sm:hidden fixed bottom-6 right-6 btn-primary rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg shadow-primary-500/30 z-50"
        >
          +
        </a>
      </div>
    </main>
  )
}
