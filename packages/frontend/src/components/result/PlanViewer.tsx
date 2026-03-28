'use client'

import { useEffect, useRef } from 'react'
import type { GeneratedPlan, Room } from '@ai-house-planner/shared'
import { Card } from '@/components/ui/Card'

interface PlanViewerProps {
  plan: GeneratedPlan
}

const ROOM_COLORS: Record<string, string> = {
  living_room: '#0ea5e9',
  bedroom: '#8b5cf6',
  bathroom: '#06b6d4',
  kitchen: '#f59e0b',
  dining_room: '#10b981',
  hallway: '#6b7280',
  garage: '#374151',
  balcony: '#84cc16',
  storage: '#78716c',
  office: '#ec4899',
}

export function PlanViewer({ plan }: PlanViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const floor = plan.floors[0]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !floor) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const scaleX = (W - 40) / floor.width
    const scaleY = (H - 40) / floor.height
    const scale = Math.min(scaleX, scaleY)
    const offsetX = (W - floor.width * scale) / 2
    const offsetY = (H - floor.height * scale) / 2

    // Clear
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, W, H)

    // Draw rooms
    floor.rooms.forEach((room: Room) => {
      const x = offsetX + room.position.x * scale
      const y = offsetY + room.position.y * scale
      const w = room.position.width * scale
      const h = room.position.height * scale

      const color = ROOM_COLORS[room.type] || '#4b5563'

      // Room fill
      ctx.fillStyle = color + '30'
      ctx.fillRect(x, y, w, h)

      // Room border
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, w, h)

      // Room label
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${Math.max(9, Math.min(12, w / 6))}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(room.name, x + w / 2, y + h / 2 - 6)

      // Area label
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = `${Math.max(8, Math.min(10, w / 7))}px Inter, sans-serif`
      ctx.fillText(`${room.area}m²`, x + w / 2, y + h / 2 + 8)
    })
  }, [plan, floor])

  return (
    <Card>
      <h3 className="text-white font-bold mb-4">2D Reja — {plan.floors.length}-qavat</h3>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full rounded-xl border border-white/10"
        style={{ background: '#0f172a' }}
      />
    </Card>
  )
}
