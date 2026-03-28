import OpenAI from 'openai'
import { env } from '../config/env'
import { logger } from '../utils/logger'

class OpenAIClient {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({ apiKey: env.openai.apiKey })
  }

  async chat(prompt: string, systemPrompt?: string): Promise<string> {
    logger.debug('Sending request to OpenAI chat...')

    const response = await this.client.chat.completions.create({
      model: env.openai.model,
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        { role: 'user' as const, content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('Empty response from OpenAI')

    return content
  }

  async generateImage(prompt: string, size: '1024x1024' | '1792x1024' | '1024x1792' = '1792x1024'): Promise<string> {
    logger.debug('Generating image with DALL-E...')

    const response = await this.client.images.generate({
      model: env.openai.imageModel,
      prompt,
      size,
      quality: 'standard',
      n: 1,
    })

    const url = response.data[0]?.url
    if (!url) throw new Error('No image URL in response')

    return url
  }
}

export const openAIClient = new OpenAIClient()
