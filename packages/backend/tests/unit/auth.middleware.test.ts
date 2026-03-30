import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Provide env before importing middleware
process.env.JWT_SECRET = 'test-secret-key-at-least-32-characters-long'

const { authMiddleware } = await import('../../src/middleware/auth.middleware')

function mockReq(authorization?: string): Partial<Request> {
  return { headers: { authorization } } as any
}

function mockRes(): Partial<Response> {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }
}

describe('authMiddleware', () => {
  const next = vi.fn() as unknown as NextFunction

  beforeEach(() => vi.clearAllMocks())

  it('should call next with userId when token is valid', () => {
    const token = jwt.sign(
      { userId: 'user123', email: 'test@test.com' },
      process.env.JWT_SECRET!
    )
    const req = mockReq(`Bearer ${token}`) as Request
    const res = mockRes() as Response

    authMiddleware(req, res, next)

    expect(req.userId).toBe('user123')
    expect(next).toHaveBeenCalledOnce()
  })

  it('should return 401 if no token provided', () => {
    const req = mockReq() as Request
    const res = mockRes() as Response

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token is invalid', () => {
    const req = mockReq('Bearer invalid.token.here') as Request
    const res = mockRes() as Response

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })
})
