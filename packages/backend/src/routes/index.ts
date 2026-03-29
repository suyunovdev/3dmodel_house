import { Router } from 'express'
import { healthRoutes } from './health.routes'
import { planRoutes } from './plan.routes'
import { imageRoutes } from './image.routes'
import { projectRoutes } from './project.routes'
import { authRoutes } from './auth.routes'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/generate-plan', planRoutes)
router.use('/generate-image', imageRoutes)
router.use('/projects', projectRoutes)

export { router as routes }
