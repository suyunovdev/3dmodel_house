import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  telegramId: z.string().optional(),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
