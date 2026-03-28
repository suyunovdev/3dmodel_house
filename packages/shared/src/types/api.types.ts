import type { PlanInput, GeneratedPlan } from './plan.types'

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface GeneratePlanRequest extends PlanInput {}

export interface GeneratePlanResponse {
  plan: GeneratedPlan
  explanation: string
  imagePrompt: string
}

export interface GenerateImageRequest {
  prompt: string
  planId?: string
  size?: '1024x1024' | '1792x1024' | '1024x1792'
}

export interface GenerateImageResponse {
  imageUrl: string
  revisedPrompt?: string
}

export interface PaginationQuery {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
}
