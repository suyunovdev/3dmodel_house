import { openAIClient } from './openai.client'
import { buildImagePrompt } from './prompts/image.prompt'
import type { PlanInput, GeneratedPlan } from '@ai-house-planner/shared'
import { logger } from '../utils/logger'

export async function generateFloorPlanImage(
  input: PlanInput,
  plan: GeneratedPlan
): Promise<string> {
  const prompt = buildImagePrompt(input, plan.notes)
  logger.info('Generating floor plan image', { style: input.style, area: input.area })
  return openAIClient.generateImage(prompt, '1792x1024')
}

export async function generateExteriorImage(input: PlanInput): Promise<string> {
  const { buildExteriorPrompt } = await import('./prompts/image.prompt')
  const prompt = buildExteriorPrompt(input)
  logger.info('Generating exterior image', { style: input.style })
  return openAIClient.generateImage(prompt, '1792x1024')
}
