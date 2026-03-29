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

    const cached = await cache.get<GeneratePlanResponse>(cacheKey)
    if (cached) {
      logger.info('Returning cached plan', { cacheKey })
      return cached
    }

    logger.info('Generating plan with AI', { area: input.area, style: input.style })

    const planPrompt = buildPlanPrompt(input)
    const planContent = await openAIClient.chat(planPrompt)
    const plan = parseJSONResponse(planContent)

    const explanationPrompt = buildExplanationPrompt(input, plan)
    const explanation = await openAIClient.chat(explanationPrompt)

    const imagePrompt = buildImagePrompt(input, plan.notes)

    const result: GeneratePlanResponse = {
      plan,
      explanation: explanation.trim(),
      imagePrompt,
    }

    // 1 soat cache
    await cache.set(cacheKey, result, 3600)

    return result
  }
}
