import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock ioredis before importing cache
vi.mock('ioredis', () => {
  const Redis = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    connect: vi.fn().mockRejectedValue(new Error('Connection refused')),
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
  }))
  return { default: Redis }
})

// Reset module cache to get fresh UnifiedCache instance
const { cache: freshCache } = await import('../../src/utils/cache')

describe('UnifiedCache (InMemory fallback)', () => {
  beforeEach(async () => {
    // Init without Redis — falls back to memory
    await freshCache.init(undefined)
  })

  it('should return null for missing key', async () => {
    const val = await freshCache.get('missing_key')
    expect(val).toBeNull()
  })

  it('should set and get a value', async () => {
    await freshCache.set('test_key', { foo: 'bar' }, 60)
    const val = await freshCache.get<{ foo: string }>('test_key')
    expect(val).toEqual({ foo: 'bar' })
  })

  it('should delete a key', async () => {
    await freshCache.set('del_key', 'value', 60)
    await freshCache.delete('del_key')
    const val = await freshCache.get('del_key')
    expect(val).toBeNull()
  })

  it('should fall back gracefully when Redis fails', async () => {
    // init with fake Redis URL — should not throw
    await expect(freshCache.init('redis://invalid:6379')).resolves.not.toThrow()
  })
})
