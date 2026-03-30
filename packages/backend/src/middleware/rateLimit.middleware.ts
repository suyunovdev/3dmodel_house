import rateLimit from 'express-rate-limit'
import { env } from '../config/env'
import type { Request } from 'express'

function getClientKey(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'] as string
  return forwarded?.split(',')[0]?.trim() || req.ip || 'unknown'
}

// Global rate limit — barcha endpointlar uchun
export const rateLimitMiddleware = rateLimit({
  windowMs: env.rateLimit.windowMs, // default: 15 daqiqa
  max: env.rateLimit.max,            // default: 100
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientKey,
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov. Iltimos keyinroq urinib ko\'ring.',
    code: 'RATE_LIMIT',
  },
})

// Auth endpointlari — brute-force himoyasi
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientKey,
  message: {
    success: false,
    message: 'Juda ko\'p kirish urinishi. 15 daqiqadan keyin urinib ko\'ring.',
    code: 'AUTH_RATE_LIMIT',
  },
})

// AI plan generation — qimmat operatsiya
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 daqiqa
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId
    return userId ? `user:${userId}` : getClientKey(req)
  },
  message: {
    success: false,
    message: 'AI generatsiya uchun juda ko\'p so\'rov. 1 daqiqa kuting.',
    code: 'AI_RATE_LIMIT',
  },
})

// Image generation — eng qimmat operatsiya
export const imageRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 soat
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId
    return userId ? `img:user:${userId}` : `img:ip:${getClientKey(req)}`
  },
  message: {
    success: false,
    message: 'Rasm generatsiya limiti. 1 soatdan keyin urinib ko\'ring.',
    code: 'IMAGE_RATE_LIMIT',
  },
})
