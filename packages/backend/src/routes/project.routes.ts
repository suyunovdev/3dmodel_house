import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware'
import { rateLimitMiddleware } from '../middleware/rateLimit.middleware'

const router = Router()
const controller = new ProjectController()

router.get('/', optionalAuth, rateLimitMiddleware, controller.getAll)
router.get('/:id', optionalAuth, controller.getById)
router.post('/', authMiddleware, rateLimitMiddleware, controller.create)
router.delete('/:id', authMiddleware, controller.delete)

export { router as projectRoutes }
