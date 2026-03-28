import { openAIClient } from '../ai/openai.client'
import { logger } from '../utils/logger'
import type { GenerateImageRequest, GenerateImageResponse } from '@ai-house-planner/shared'

export class ImageService {
  async generateImage(input: GenerateImageRequest): Promise<GenerateImageResponse> {
    logger.info('Generating image', { size: input.size })

    const imageUrl = await openAIClient.generateImage(
      input.prompt,
      input.size ?? '1792x1024'
    )

    return {
      imageUrl,
      revisedPrompt: input.prompt,
    }
  }
}
