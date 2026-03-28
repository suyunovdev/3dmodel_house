import { logger } from '../utils/logger'
import type { GeneratedPlan } from '@ai-house-planner/shared'

export class ExportService {
  async generatePlanJSON(plan: GeneratedPlan): Promise<string> {
    return JSON.stringify(plan, null, 2)
  }

  async generatePlanSummary(plan: GeneratedPlan, explanation: string): Promise<string> {
    const rooms = plan.floors.flatMap(f => f.rooms)
    const roomList = rooms.map(r => `- ${r.name}: ${r.area} m²`).join('\n')

    return `# House Plan Summary\n\nTotal Area: ${plan.totalArea} m²\nStyle: ${plan.style}\n\n## Rooms\n${roomList}\n\n## Description\n${explanation}\n\n## Notes\n${plan.notes}`
  }
}
