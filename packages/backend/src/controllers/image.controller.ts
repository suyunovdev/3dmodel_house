import type { Request, Response } from 'express'
import { ImageService } from '../services/image.service'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess } from '../utils/response'
import type { GenerateImageRequest } from '@ai-house-planner/shared'

export class ImageController {
  private imageService = new ImageService()

  generate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: GenerateImageRequest = req.body
    const result = await this.imageService.generateImage(input)
    sendSuccess(res, result, 'Image generated successfully', 201)
  })
}
