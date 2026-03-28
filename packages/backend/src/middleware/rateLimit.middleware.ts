import rateLimit from 'express-rate-limit'
import { env } from '../config/env'

export const rateLimitMiddleware = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    code: 'RATE_LIMIT',
  },
})

export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: 'Too many AI generation requests. Please wait 1 minute.',
    code: 'RATE_LIMIT',
  },
})
