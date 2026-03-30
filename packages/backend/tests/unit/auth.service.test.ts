import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from '../../src/services/auth.service'
import { AppError } from '../../src/middleware/error.middleware'

// Mock Mongoose model
vi.mock('../../src/models/User.model', () => ({
  UserModel: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}))

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn(),
  },
}))

import { UserModel } from '../../src/models/User.model'
import bcrypt from 'bcryptjs'

const mockUser = {
  _id: { toString: () => 'user123' },
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashed_password',
  createdAt: new Date('2024-01-01'),
  select: vi.fn(),
}

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('should register a new user and return token', async () => {
      vi.mocked(UserModel.findOne).mockResolvedValue(null)
      vi.mocked(UserModel.create).mockResolvedValue(mockUser as any)

      const result = await authService.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toHaveProperty('token')
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.name).toBe('Test User')
    })

    it('should throw 409 if email already exists', async () => {
      vi.mocked(UserModel.findOne).mockResolvedValue(mockUser as any)

      await expect(
        authService.register({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(AppError)
    })

    it('should lowercase email on registration', async () => {
      vi.mocked(UserModel.findOne).mockResolvedValue(null)
      vi.mocked(UserModel.create).mockResolvedValue({
        ...mockUser,
        email: 'test@example.com',
      } as any)

      await authService.register({
        name: 'Test',
        email: 'TEST@EXAMPLE.COM',
        password: 'password123',
      })

      expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
    })
  })

  describe('login', () => {
    it('should throw 401 if user not found', async () => {
      vi.mocked(UserModel.findOne).mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      } as any)

      await expect(
        authService.login({ email: 'notfound@example.com', password: 'pass' })
      ).rejects.toThrow(AppError)
    })

    it('should throw 401 if password is wrong', async () => {
      vi.mocked(UserModel.findOne).mockReturnValue({
        select: vi.fn().mockResolvedValue(mockUser),
      } as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as any)

      await expect(
        authService.login({ email: 'test@example.com', password: 'wrongpass' })
      ).rejects.toThrow(AppError)
    })

    it('should return token on successful login', async () => {
      vi.mocked(UserModel.findOne).mockReturnValue({
        select: vi.fn().mockResolvedValue(mockUser),
      } as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)

      const result = await authService.login({
        email: 'test@example.com',
        password: 'correctpass',
      })

      expect(result).toHaveProperty('token')
      expect(result.user.email).toBe('test@example.com')
    })
  })
})
