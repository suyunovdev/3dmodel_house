import mongoose from 'mongoose'
import { env } from './env'
import { logger } from '../utils/logger'

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    logger.info('✅ MongoDB connected successfully')
  } catch (error) {
    logger.warn('⚠️  MongoDB connection failed — running without database')
    logger.warn('   Set MONGODB_URI in .env to enable database features')
  }
}

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting reconnect...')
})

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected')
})
