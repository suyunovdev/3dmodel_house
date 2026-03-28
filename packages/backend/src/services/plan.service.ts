import { openAIClient } from '../ai/openai.client'
import { buildPlanPrompt } from '../ai/prompts/plan.prompt'
import { buildExplanationPrompt } from '../ai/prompts/explanation.prompt'
import { buildImagePrompt } from '../ai/prompts/image.prompt'
import { parseJSONResponse } from '../ai/response.parser'
import { cache } from '../utils/cache'
import { logger } from '../utils/logger'
import type { PlanInput, GeneratePlanResponse } from '@ai-house-planner/shared'
import crypto from 'crypto'

export class PlanService {
  async generatePlan(input: PlanInput): Promise<GeneratePlanResponse> {
    const cacheKey = `plan:${crypto.createHash('md5').update(JSON.stringify(input)).digest('hex')}`
    const cached = cache.get<GeneratePlanResponse>(cacheKey)
    if (cached) {
      logger.info('Returning cached plan')
      return cached
    }

    logger.info('Generating plan with AI', { area: input.area, style: input.style })

    // Step 1: Generate the floor plan JSON
    const planPrompt = buildPlanPrompt(input)
    const planContent = await openAIClient.chat(planPrompt)
    const plan = parseJSONResponse(planContent)

    // Step 2: Generate explanation
    const explanationPrompt = buildExplanationPrompt(input, plan)
    const explanation = await openAIClient.chat(explanationPrompt)

    // Step 3: Build image prompt (we don't generate image here, that's separate endpoint)
    const imagePrompt = buildImagePrompt(input, plan.notes)

    const result: GeneratePlanResponse = {
      plan,
      explanation: explanation.trim(),
      imagePrompt,
    }

    // Cache for 1 hour
    cache.set(cacheKey, result, 3600)

    return result
  }
}
