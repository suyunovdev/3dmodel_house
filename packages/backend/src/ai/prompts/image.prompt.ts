import type { PlanInput } from '@ai-house-planner/shared'

export function buildImagePrompt(input: PlanInput, planNotes?: string): string {
  const styleDescriptions: Record<string, string> = {
    modern: 'sleek modern architecture, clean geometric lines, large glass windows, flat roof',
    classic: 'traditional classic architecture, symmetrical facade, pitched roof, decorative elements',
    minimalist: 'ultra-minimalist design, pure white walls, simple rectangular forms, hidden details',
    industrial: 'industrial style, exposed brick and concrete, steel elements, large warehouse windows',
    scandinavian: 'scandinavian design, natural wood, white exterior, cozy proportions, simple gabled roof',
  }

  const styleDesc = styleDescriptions[input.style] || 'contemporary architecture'

  return `Architectural floor plan top-down view, ${input.area} square meters, ${input.floors} floor${input.floors > 1 ? 's' : ''}, ${input.bedrooms} bedrooms, ${input.style} style. ${styleDesc}. Clean technical drawing style, labeled rooms, walls shown in dark lines, rooms filled with light colors, professional architectural blueprint. ${planNotes || ''}. High quality, detailed, bird's eye view.`
}

export function buildExteriorPrompt(input: PlanInput): string {
  const styleDescriptions: Record<string, string> = {
    modern: 'modern minimalist house exterior, flat roof, floor-to-ceiling windows, concrete and glass materials',
    classic: 'classic traditional house exterior, pitched roof, brick facade, wooden front door',
    minimalist: 'minimalist white house, clean lines, hidden gutters, simple box shape',
    industrial: 'industrial loft house exterior, exposed brick walls, steel frame windows, urban setting',
    scandinavian: 'scandinavian style house, wooden cladding, simple gabled roof, neutral colors',
  }

  return `${styleDescriptions[input.style]}, ${input.floors} story house, ${input.area} square meters, professional architectural rendering, photorealistic, golden hour lighting, landscaped garden, high quality 4K`
}
