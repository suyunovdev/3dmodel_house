import { vi } from 'vitest'

// Env variables for tests
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret-key-at-least-32-characters-long'
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
process.env.OPENAI_API_KEY = 'test-openai-key'

// Mock logger to suppress output during tests
vi.mock('../src/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}))
