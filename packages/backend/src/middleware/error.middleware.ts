import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error('Unhandled error:', { message: err.message, stack: err.stack })

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    })
    return
  }

  // OpenAI errors
  if (err.message.includes('OpenAI') || err.message.includes('API')) {
    res.status(503).json({
      success: false,
      message: 'AI service temporarily unavailable',
      code: 'AI_ERROR',
    })
    return
  }

  // MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    res.status(500).json({
      success: false,
      message: 'Database error occurred',
      code: 'DB_ERROR',
    })
    return
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  })
}
