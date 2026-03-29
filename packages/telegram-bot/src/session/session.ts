import Redis from 'ioredis'

export interface UserSession {
  step: 'area' | 'floors' | 'bedrooms' | 'style' | 'extra' | 'done' | null
  area?: number
  floors?: number
  bedrooms?: number
  style?: string
  extra?: string
  locale: 'uz' | 'en'
}

const DEFAULT_SESSION = (): UserSession => ({ step: null, locale: 'uz' })
const SESSION_TTL = 60 * 60 * 24 // 24 soat

// ─── In-Memory fallback ───────────────────────────────────────────────────────
const memoryStore = new Map<number, UserSession>()

// ─── Redis store ──────────────────────────────────────────────────────────────
let redisClient: Redis | null = null

export async function initSessionStore(redisUrl?: string): Promise<void> {
  if (!redisUrl) {
    console.warn('[Session] REDIS_URL yo\'q — in-memory session ishlatiladi')
    return
  }

  try {
    const client = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    })

    client.on('connect', () => console.log('[Session] Redis connected'))
    client.on('error', (err) => console.warn('[Session] Redis error:', err.message))

    await client.connect()
    redisClient = client
    console.log('[Session] Using Redis session store')
  } catch (err: any) {
    console.warn(`[Session] Redis ulanmadi (${err.message}) — in-memory ishlatiladi`)
  }
}

function key(userId: number): string {
  return `bot:session:${userId}`
}

export async function getSession(userId: number): Promise<UserSession> {
  if (redisClient) {
    try {
      const raw = await redisClient.get(key(userId))
      if (raw) return JSON.parse(raw) as UserSession
    } catch {
      // Redis failed — fallback to memory
    }
  }

  if (!memoryStore.has(userId)) {
    memoryStore.set(userId, DEFAULT_SESSION())
  }
  return memoryStore.get(userId)!
}

export async function updateSession(userId: number, data: Partial<UserSession>): Promise<void> {
  const current = await getSession(userId)
  const updated = { ...current, ...data }

  if (redisClient) {
    try {
      await redisClient.set(key(userId), JSON.stringify(updated), 'EX', SESSION_TTL)
      return
    } catch {
      // fallback to memory
    }
  }

  memoryStore.set(userId, updated)
}

export async function clearSession(userId: number): Promise<void> {
  const fresh = DEFAULT_SESSION()

  if (redisClient) {
    try {
      await redisClient.set(key(userId), JSON.stringify(fresh), 'EX', SESSION_TTL)
      return
    } catch {
      // fallback to memory
    }
  }

  memoryStore.set(userId, fresh)
}
