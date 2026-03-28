export interface User {
  id: string
  name: string
  email?: string
  telegramId?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDto {
  name: string
  email?: string
  telegramId?: string
}
