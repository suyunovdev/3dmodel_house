import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  OPENAI_MODEL: z.string().default('gpt-4o'),
  OPENAI_IMAGE_MODEL: z.string().default('dall-e-3'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  REDIS_URL: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX: z.string().default('100'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = {
  port: parseInt(parsed.data.PORT),
  nodeEnv: parsed.data.NODE_ENV,
  mongodbUri: parsed.data.MONGODB_URI,
  openai: {
    apiKey: parsed.data.OPENAI_API_KEY,
    model: parsed.data.OPENAI_MODEL,
    imageModel: parsed.data.OPENAI_IMAGE_MODEL,
  },
  jwtSecret: parsed.data.JWT_SECRET,
  redisUrl: parsed.data.REDIS_URL,
  cloudinary: {
    cloudName: parsed.data.CLOUDINARY_CLOUD_NAME,
    apiKey: parsed.data.CLOUDINARY_API_KEY,
    apiSecret: parsed.data.CLOUDINARY_API_SECRET,
  },
  rateLimit: {
    windowMs: parseInt(parsed.data.RATE_LIMIT_WINDOW_MS),
    max: parseInt(parsed.data.RATE_LIMIT_MAX),
  },
  frontendUrl: parsed.data.FRONTEND_URL,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(',').map(o => o.trim()),
}
