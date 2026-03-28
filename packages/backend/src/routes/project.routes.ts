import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()
const controller = new ProjectController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.delete('/:id', controller.delete)

export { router as projectRoutes }
