import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { validateMiddleware } from '../middleware/validate.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { authRateLimit } from '../middleware/rateLimit.middleware'
import { z } from 'zod'

const router = Router()
const controller = new AuthController()

const registerSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta harf').max(100),
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(6, 'Parol kamida 6 ta belgi'),
})

const loginSchema = z.object({
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(1, 'Parol kiritilishi shart'),
})

router.post('/register', authRateLimit, validateMiddleware(registerSchema), controller.register)
router.post('/login', authRateLimit, validateMiddleware(loginSchema), controller.login)
router.get('/me', authMiddleware, controller.me)

export { router as authRoutes }
