export interface UserSession {
  step: 'area' | 'floors' | 'bedrooms' | 'style' | 'extra' | 'done' | null
  area?: number
  floors?: number
  bedrooms?: number
  style?: string
  extra?: string
  locale: 'uz' | 'en'
}

const sessions = new Map<number, UserSession>()

export function getSession(userId: number): UserSession {
  if (!sessions.has(userId)) {
    sessions.set(userId, { step: null, locale: 'uz' })
  }
  return sessions.get(userId)!
}

export function updateSession(userId: number, data: Partial<UserSession>): void {
  const current = getSession(userId)
  sessions.set(userId, { ...current, ...data })
}

export function clearSession(userId: number): void {
  sessions.set(userId, { step: null, locale: 'uz' })
}
