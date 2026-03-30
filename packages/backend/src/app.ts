import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { routes } from './routes'
import { errorMiddleware } from './middleware/error.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import { rateLimitMiddleware } from './middleware/rateLimit.middleware'
import { env } from './config/env'

const app = express()

// Trust proxy (nginx, load balancer orqasida bo'lganda IP to'g'ri o'qilsin)
app.set('trust proxy', 1)

// Helmet — HTTP security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // DALL-E image loading uchun
}))

// CORS — faqat ruxsat etilgan originlar
app.use(cors({
  origin: (origin, callback) => {
    // origin yo'q bo'lsa (curl, Postman, SSR) — ruxsat
    if (!origin) return callback(null, true)
    if (env.allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS: ${origin} ruxsat etilmagan`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
}))

// Global rate limit
app.use(rateLimitMiddleware)

// Body parsing (limit kichik — JSON injection himoyasi)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// Logging
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))
app.use(loggerMiddleware)

// Routes
app.use('/api', routes)

// Error handling (must be last)
app.use(errorMiddleware)

export { app }
