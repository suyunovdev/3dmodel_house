import type { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

interface JwtPayload {
  userId: string
  email?: string
}

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
      code: 'UNAUTHORIZED',
    })
    return
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      code: 'UNAUTHORIZED',
    })
  }
}

export const optionalAuth: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    try {
      const payload = jwt.verify(token, env.jwtSecret) as JwtPayload
      req.userId = payload.userId
    } catch {
      // ignore invalid token for optional auth
    }
  }
  next()
}
