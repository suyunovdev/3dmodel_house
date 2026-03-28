import type { GeneratedPlan, Room } from '@ai-house-planner/shared'

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

export function renderPlanToCanvas(
  canvas: HTMLCanvasElement,
  plan: GeneratedPlan,
  floorIndex = 0
): void {
  const ctx = canvas.getContext('2d')
  const floor = plan.floors[floorIndex]
  if (!ctx || !floor) return

  const W = canvas.width
  const H = canvas.height
  const padding = 40
  const scaleX = (W - padding * 2) / floor.width
  const scaleY = (H - padding * 2) / floor.height
  const scale = Math.min(scaleX, scaleY)
  const offsetX = (W - floor.width * scale) / 2
  const offsetY = (H - floor.height * scale) / 2

  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, W, H)

  // Draw grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  ctx.lineWidth = 1
  for (let x = offsetX; x <= offsetX + floor.width * scale; x += scale) {
    ctx.beginPath()
    ctx.moveTo(x, offsetY)
    ctx.lineTo(x, offsetY + floor.height * scale)
    ctx.stroke()
  }

  floor.rooms.forEach((room: Room) => {
    const x = offsetX + room.position.x * scale
    const y = offsetY + room.position.y * scale
    const w = room.position.width * scale
    const h = room.position.height * scale
    const color = ROOM_COLORS[room.type] ?? '#4b5563'

    ctx.fillStyle = color + '25'
    ctx.fillRect(x, y, w, h)

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, w, h)

    const fontSize = Math.max(9, Math.min(13, w / 7))
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${fontSize}px Inter, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(room.name, x + w / 2, y + h / 2 - fontSize * 0.7)

    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.font = `${fontSize * 0.85}px Inter, sans-serif`
    ctx.fillText(`${room.area}m²`, x + w / 2, y + h / 2 + fontSize * 0.7)
  })
}
