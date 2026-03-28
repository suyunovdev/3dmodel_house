import type { Response } from 'express'
import type { ApiResponse } from '@ai-house-planner/shared'

export function sendSuccess<T>(res: Response, data: T, message = 'Success', statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  }
  res.status(statusCode).json(response)
}

export function sendError(res: Response, message: string, statusCode = 400, error?: string): void {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  }
  res.status(statusCode).json(response)
}
