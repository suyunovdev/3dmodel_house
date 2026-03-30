import { Router } from 'express'
import { ImageController } from '../controllers/image.controller'
import { validateMiddleware } from '../middleware/validate.middleware'
import { imageRateLimit } from '../middleware/rateLimit.middleware'
import { generateImageSchema } from '@ai-house-planner/shared'

const router = Router()
const controller = new ImageController()

router.post(
  '/',
  imageRateLimit,
  validateMiddleware(generateImageSchema),
  controller.generate
)

router.get('/status/:jobId', controller.status)

export { router as imageRoutes }
