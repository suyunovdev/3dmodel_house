import { v2 as cloudinary } from 'cloudinary'
import { env } from '../config/env'
import { logger } from './logger'
import axios from 'axios'

let isConfigured = false

export function initCloudinary(): void {
  const { cloudName, apiKey, apiSecret } = env.cloudinary

  if (!cloudName || !apiKey || !apiSecret) {
    logger.warn('[Cloudinary] Credentials missing — images will use OpenAI URLs directly')
    return
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })

  isConfigured = true
  logger.info('[Cloudinary] Configured successfully')
}

export async function uploadFromUrl(imageUrl: string, folder = 'ai-house-planner'): Promise<string> {
  if (!isConfigured) {
    return imageUrl
  }

  try {
    // Download image buffer from OpenAI URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 30000 })
    const buffer = Buffer.from(response.data as ArrayBuffer)
    const base64 = `data:image/png;base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    })

    logger.info('[Cloudinary] Image uploaded', { publicId: result.public_id })
    return result.secure_url
  } catch (err: any) {
    logger.warn('[Cloudinary] Upload failed, using original URL', { error: err.message })
    return imageUrl
  }
}
