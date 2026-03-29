import type { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess } from '../utils/response'

export class AuthController {
  private authService = new AuthService()

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.register(req.body)
    sendSuccess(res, result, 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz', 201)
  })

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body)
    sendSuccess(res, result, 'Muvaffaqiyatli kirdingiz')
  })

  me = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await this.authService.getMe(req.userId!)
    sendSuccess(res, user, 'Profil ma\'lumotlari')
  })
}
