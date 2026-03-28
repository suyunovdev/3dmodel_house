export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AI_ERROR: 'AI_ERROR',
  DB_ERROR: 'DB_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  RATE_LIMIT: 'RATE_LIMIT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const

export const ERROR_MESSAGES = {
  [ERROR_CODES.VALIDATION_ERROR]: 'Invalid input data',
  [ERROR_CODES.AI_ERROR]: 'AI service error occurred',
  [ERROR_CODES.DB_ERROR]: 'Database error occurred',
  [ERROR_CODES.NOT_FOUND]: 'Resource not found',
  [ERROR_CODES.UNAUTHORIZED]: 'Unauthorized access',
  [ERROR_CODES.RATE_LIMIT]: 'Too many requests, please try again later',
  [ERROR_CODES.INTERNAL_ERROR]: 'Internal server error',
} as const
