'use client'

import { Search, X } from 'lucide-react'

const STYLES = ['modern', 'classic', 'minimalist', 'scandinavian', 'industrial', 'mediterranean']

interface DashboardFilterProps {
  search: string
  styleFilter: string
  onSearchChange: (v: string) => void
  onStyleChange: (v: string) => void
  onClear: () => void
}

export function DashboardFilter({
  search,
  styleFilter,
  onSearchChange,
  onStyleChange,
  onClear,
}: DashboardFilterProps) {
  const hasFilter = search || styleFilter

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Qidirish..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
        />
      </div>

      {/* Style filter */}
      <select
        value={styleFilter}
        onChange={e => onStyleChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:border-primary-500/50 transition-colors appearance-none cursor-pointer min-w-[160px]"
      >
        <option value="">Barcha uslublar</option>
        {STYLES.map(s => (
          <option key={s} value={s} className="bg-dark-900 text-white">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      {/* Clear */}
      {hasFilter && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm transition-colors"
        >
          <X size={14} />
          Tozalash
        </button>
      )}
    </div>
  )
}
