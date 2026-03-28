'use client'

import { clsx } from 'clsx'
import type { HouseStyle } from '@ai-house-planner/shared'
import { STYLE_OPTIONS } from '@ai-house-planner/shared'

interface StyleSelectorProps {
  value: HouseStyle
  onChange: (style: HouseStyle) => void
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/70">
        Arxitektura uslubi <span className="text-primary-400">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STYLE_OPTIONS.map(style => (
          <button
            key={style.value}
            type="button"
            onClick={() => onChange(style.value)}
            className={clsx(
              'p-3 rounded-xl border text-left transition-all duration-200',
              value === style.value
                ? 'bg-primary-500/20 border-primary-500/50 text-white'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
            )}
          >
            <div className="text-2xl mb-1">{style.emoji}</div>
            <div className="font-medium text-sm">{style.label}</div>
            <div className="text-xs opacity-60 mt-0.5 leading-tight">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
