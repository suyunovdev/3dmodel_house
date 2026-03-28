import { app } from './app'
import { connectDatabase } from './config/database'
import { env } from './config/env'
import { logger } from './utils/logger'

async function bootstrap() {
  await connectDatabase()

  app.listen(env.port, () => {
    logger.info(`🚀 Server running on http://localhost:${env.port}`)
    logger.info(`📱 Environment: ${env.nodeEnv}`)
  })
}

bootstrap().catch(error => {
  logger.error('Failed to start server:', error)
  process.exit(1)
})
