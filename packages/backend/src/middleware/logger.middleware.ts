import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { logger } from '../utils/logger'

export const loggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const level = res.statusCode >= 400 ? 'warn' : 'debug'
    logger[level](`${req.method} ${req.path} ${res.statusCode} ${duration}ms`)
  })

  next()
}
