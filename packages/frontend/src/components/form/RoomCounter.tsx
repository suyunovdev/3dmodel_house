'use client'

import { Minus, Plus } from 'lucide-react'

interface RoomCounterProps {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function RoomCounter({ label, value, min = 1, max = 10, onChange }: RoomCounterProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
      <span className="text-white/70 text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>
        <span className="text-white font-bold text-lg w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 flex items-center justify-center text-primary-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
