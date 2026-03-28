import type { GeneratedPlan } from '@ai-house-planner/shared'

export function formatPlanMessage(plan: GeneratedPlan, explanation: string): string {
  const rooms = plan.floors.flatMap(f => f.rooms)
  const roomEmojis: Record<string, string> = {
    bedroom: '🛏',
    bathroom: '🚿',
    kitchen: '🍳',
    living_room: '🛋',
    dining_room: '🍽',
    hallway: '🚪',
    garage: '🚗',
    balcony: '🌿',
    storage: '📦',
    office: '💼',
  }

  const roomList = rooms
    .map(r => `${roomEmojis[r.type] || '🏠'} ${r.name}: ${r.area} m²`)
    .join('\n')

  const costInfo = plan.estimatedCost
    ? `\n💰 Taxminiy narx: $${plan.estimatedCost.min.toLocaleString()} - $${plan.estimatedCost.max.toLocaleString()}`
    : ''

  return `🏠 *UY REJASI*

📐 Umumiy maydon: ${plan.totalArea} m²
🎨 Uslub: ${plan.style.toUpperCase()}
🏗 Qavatlar: ${plan.floors.length}

*XONALAR:*
${roomList}
${costInfo}

📝 *Tavsif:*
${explanation}

📌 *Eslatma:*
${plan.notes}`
}

export function formatProjectCard(project: {
  _id: string
  inputData: Record<string, unknown>
  createdAt: Date
}): string {
  const input = project.inputData as { area?: number; style?: string; bedrooms?: number }
  const date = new Date(project.createdAt).toLocaleDateString('uz-UZ')

  return `🏠 ${input.style?.toUpperCase() ?? 'N/A'} | ${input.area ?? '?'} m² | ${input.bedrooms ?? '?'} xona | ${date}`
}
