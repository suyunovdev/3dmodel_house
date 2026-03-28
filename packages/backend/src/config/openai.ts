import OpenAI from 'openai'
import { env } from './env'

export const openaiClient = new OpenAI({
  apiKey: env.openai.apiKey,
})
