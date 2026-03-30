import { Queue, Worker, Job } from 'bullmq'
import { env } from '../config/env'
import { ImageService } from '../services/image.service'
import { ProjectModel } from '../models/Project.model'
import { logger } from '../utils/logger'

export interface ImageJobData {
  prompt: string
  projectId?: string
  size?: string
}

export interface ImageJobResult {
  imageUrl: string
}

const QUEUE_NAME = 'image-generation'

// Redis connection options
function getConnection() {
  if (!env.redisUrl) return null

  // Parse redis URL
  const url = new URL(env.redisUrl)
  return {
    host: url.hostname,
    port: parseInt(url.port) || 6379,
    password: url.password || undefined,
  }
}

let imageQueue: Queue<ImageJobData, ImageJobResult> | null = null
let imageWorker: Worker<ImageJobData, ImageJobResult> | null = null

export function initImageQueue(): void {
  const connection = getConnection()
  if (!connection) {
    logger.warn('[Queue] REDIS_URL yo\'q — image queue ishlamaydi, sync mode ishlatiladi')
    return
  }

  imageQueue = new Queue<ImageJobData, ImageJobResult>(QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      attempts: 2,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: { count: 100 },
      removeOnFail: { count: 50 },
    },
  })

  const imageService = new ImageService()

  imageWorker = new Worker<ImageJobData, ImageJobResult>(
    QUEUE_NAME,
    async (job: Job<ImageJobData, ImageJobResult>) => {
      logger.info('[Queue] Processing image job', { jobId: job.id, projectId: job.data.projectId })

      const result = await imageService.generateImage({
        prompt: job.data.prompt,
        size: (job.data.size as any) ?? '1792x1024',
      })

      // DB dagi projectni yangilaymiz
      if (job.data.projectId) {
        await ProjectModel.findByIdAndUpdate(job.data.projectId, {
          imageUrl: result.imageUrl,
        })
        logger.info('[Queue] Project imageUrl updated', { projectId: job.data.projectId })
      }

      return { imageUrl: result.imageUrl }
    },
    {
      connection,
      concurrency: 2, // parallel 2 ta rasm
    }
  )

  imageWorker.on('completed', job => {
    logger.info('[Queue] Image job completed', { jobId: job.id })
  })

  imageWorker.on('failed', (job, err) => {
    logger.error('[Queue] Image job failed', { jobId: job?.id, error: err.message })
  })

  logger.info('[Queue] Image queue + worker initialized')
}

export async function enqueueImageGeneration(data: ImageJobData): Promise<string> {
  if (!imageQueue) {
    throw new Error('Queue not initialized')
  }
  const job = await imageQueue.add('generate', data, {
    priority: 1,
  })
  return job.id!
}

export async function getJobStatus(jobId: string): Promise<{
  status: 'waiting' | 'active' | 'completed' | 'failed' | 'unknown'
  result?: ImageJobResult
  error?: string
}> {
  if (!imageQueue) return { status: 'unknown' }

  const job = await imageQueue.getJob(jobId)
  if (!job) return { status: 'unknown' }

  const state = await job.getState()

  if (state === 'completed') {
    return { status: 'completed', result: job.returnvalue }
  }
  if (state === 'failed') {
    return { status: 'failed', error: job.failedReason }
  }
  if (state === 'active') {
    return { status: 'active' }
  }
  return { status: 'waiting' }
}

export function isQueueAvailable(): boolean {
  return imageQueue !== null
}
