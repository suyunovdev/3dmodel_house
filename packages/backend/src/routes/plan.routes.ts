import { Router } from 'express'
import { PlanController } from '../controllers/plan.controller'
import { validateMiddleware } from '../middleware/validate.middleware'
import { rateLimitMiddleware } from '../middleware/rateLimit.middleware'
import { planInputSchema } from '@ai-house-planner/shared'

const router = Router()
const controller = new PlanController()

router.post(
  '/',
  rateLimitMiddleware,
  validateMiddleware(planInputSchema),
  controller.generate
)

export { router as planRoutes }
