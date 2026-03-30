import { openAIClient } from '../ai/openai.client'
import { uploadFromUrl } from '../utils/cloudinary'
import { logger } from '../utils/logger'
import type { GenerateImageRequest, GenerateImageResponse } from '@ai-house-planner/shared'

export class ImageService {
  async generateImage(input: GenerateImageRequest): Promise<GenerateImageResponse> {
    logger.info('Generating image', { size: input.size })

    const openAiUrl = await openAIClient.generateImage(
      input.prompt,
      input.size ?? '1792x1024'
    )

    // Upload to Cloudinary for permanent storage (falls back to openAiUrl if not configured)
    const imageUrl = await uploadFromUrl(openAiUrl)

    return {
      imageUrl,
      revisedPrompt: input.prompt,
    }
  }
}
