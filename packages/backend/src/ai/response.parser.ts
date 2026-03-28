import { logger } from '../utils/logger'
import type { GeneratedPlan } from '@ai-house-planner/shared'

export function parseJSONResponse(content: string): GeneratedPlan {
  // Strip markdown code blocks if present
  let cleaned = content.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }

  cleaned = cleaned.trim()

  try {
    const parsed = JSON.parse(cleaned)
    return validatePlanStructure(parsed)
  } catch (error) {
    logger.error('Failed to parse AI response:', { content: cleaned, error })
    throw new Error('AI returned invalid JSON response')
  }
}

function validatePlanStructure(data: unknown): GeneratedPlan {
  if (!data || typeof data !== 'object') {
    throw new Error('Response is not an object')
  }

  const plan = data as Record<string, unknown>

  if (!Array.isArray(plan.floors) || plan.floors.length === 0) {
    throw new Error('Plan must have at least one floor')
  }

  if (typeof plan.totalArea !== 'number') {
    throw new Error('Plan must have totalArea')
  }

  if (typeof plan.notes !== 'string') {
    plan.notes = 'Generated floor plan'
  }

  return plan as unknown as GeneratedPlan
}
