import { logger } from './logger'

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

class InMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, value: T, ttlSeconds = 300): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
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

  delete(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key)
      }
    }
  }
}

export const cache = new InMemoryCache()

// Clean up expired entries every 5 minutes
setInterval(() => {
  cache.cleanup()
  logger.debug('Cache cleanup completed')
}, 5 * 60 * 1000)
