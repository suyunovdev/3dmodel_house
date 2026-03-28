import type { PlanInput, GeneratedPlan } from '@ai-house-planner/shared'

export function buildExplanationPrompt(input: PlanInput, plan: GeneratedPlan): string {
  const roomCount = plan.floors.reduce((sum, f) => sum + f.rooms.length, 0)

  return `You are a professional architect explaining a house design to a client.

House specifications:
- Area: ${input.area} m²
- Floors: ${input.floors}
- Bedrooms: ${input.bedrooms}
- Style: ${input.style}
- Total rooms: ${roomCount}

Write a warm, professional explanation (2-3 paragraphs) covering:
1. Overall design philosophy and how it matches the ${input.style} style
2. Space distribution and flow between rooms
3. Key features and practical benefits

Keep it friendly, informative, and under 200 words. No technical jargon.`
}
