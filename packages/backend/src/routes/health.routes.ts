import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  })
})

export { router as healthRoutes }
