import type { Request, Response, NextFunction, RequestHandler } from 'express'
import type { ZodSchema } from 'zod'

export function validateMiddleware(schema: ZodSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: result.error.flatten().fieldErrors,
      })
      return
    }

    req.body = result.data
    next()
  }
}
