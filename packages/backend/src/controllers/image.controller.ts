import type { Request, Response } from 'express'
import { ImageService } from '../services/image.service'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess, sendError } from '../utils/response'
import { enqueueImageGeneration, getJobStatus, isQueueAvailable } from '../queue/imageQueue'
import type { GenerateImageRequest } from '@ai-house-planner/shared'

export class ImageController {
  private imageService = new ImageService()

  // POST /generate-image — queue ga qo'shadi yoki sync bajaradi
  generate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: GenerateImageRequest & { projectId?: string } = req.body

    if (isQueueAvailable()) {
      const jobId = await enqueueImageGeneration({
        prompt: input.prompt,
        projectId: input.projectId,
        size: input.size,
      })
      sendSuccess(res, { jobId, status: 'queued' }, 'Image generation queued', 202)
    } else {
      // Sync fallback (Redis yo'q bo'lsa)
      const result = await this.imageService.generateImage(input)
      sendSuccess(res, { imageUrl: result.imageUrl, status: 'completed' }, 'Image generated', 201)
    }
  })

  // GET /generate-image/status/:jobId — holat so'rash
  status = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { jobId } = req.params
    if (!jobId) {
      sendError(res, 'jobId required', 400)
      return
    }
    const result = await getJobStatus(jobId)
    sendSuccess(res, result, 'Job status')
  })
}
