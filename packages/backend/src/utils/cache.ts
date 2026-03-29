import Redis from 'ioredis'
import { logger } from './logger'

// ─── In-Memory fallback ───────────────────────────────────────────────────────
interface CacheEntry<T> {
  value: T
  expiresAt: number
}

class InMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, value: T, ttlSeconds = 300): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.value as T
  }

  delete(key: string): void { this.store.delete(key) }
  clear(): void { this.store.clear() }

  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) this.store.delete(key)
    }
  }
}

// ─── Redis cache ──────────────────────────────────────────────────────────────
class RedisCache {
  private client: Redis

  constructor(url: string) {
    this.client = new Redis(url, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    })

    this.client.on('connect', () => logger.info('✅ Redis connected'))
    this.client.on('error', (err) => logger.warn('⚠️  Redis error:', err.message))
  }

  async set<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.client.get(key)
    if (!raw) return null
    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }

  async clear(): Promise<void> {
    await this.client.flushdb()
  }

  async connect(): Promise<void> {
    await this.client.connect()
  }
}

// ─── Unified Cache (Redis bor bo'lsa Redis, yo'q bo'lsa InMemory) ─────────────
class UnifiedCache {
  private redis: RedisCache | null = null
  private memory = new InMemoryCache()
  private useRedis = false

  async init(redisUrl?: string): Promise<void> {
    if (!redisUrl) {
      logger.warn('REDIS_URL yo\'q — in-memory cache ishlatiladi')
      this.startCleanup()
      return
    }

    try {
      const r = new RedisCache(redisUrl)
      await r.connect()
      this.redis = r
      this.useRedis = true
      logger.info('📦 Cache: Redis')
    } catch (err: any) {
      logger.warn(`Redis ulanmadi (${err.message}) — in-memory cache ishlatiladi`)
      this.startCleanup()
    }
  }

  async set<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
    if (this.useRedis && this.redis) {
      await this.redis.set(key, value, ttlSeconds)
    } else {
      this.memory.set(key, value, ttlSeconds)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.useRedis && this.redis) {
      return this.redis.get<T>(key)
    }
    return this.memory.get<T>(key)
  }

  async delete(key: string): Promise<void> {
    if (this.useRedis && this.redis) {
      await this.redis.delete(key)
    } else {
      this.memory.delete(key)
    }
  }

  private startCleanup(): void {
    setInterval(() => {
      this.memory.cleanup()
      logger.debug('Cache cleanup completed')
    }, 5 * 60 * 1000)
  }
}

export const cache = new UnifiedCache()
