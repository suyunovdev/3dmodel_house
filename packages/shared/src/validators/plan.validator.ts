import { z } from 'zod'

export const planInputSchema = z.object({
  area: z.number().min(20, 'Area must be at least 20 m²').max(2000, 'Area cannot exceed 2000 m²'),
  floors: z.number().int().min(1).max(5),
  bedrooms: z.number().int().min(1).max(10),
  bathrooms: z.number().int().min(1).max(10).optional(),
  style: z.enum(['modern', 'classic', 'minimalist', 'industrial', 'scandinavian']),
  extra: z.string().max(500).optional(),
})

export const generateImageSchema = z.object({
  prompt: z.string().min(10).max(1000),
  planId: z.string().optional(),
  size: z.enum(['1024x1024', '1792x1024', '1024x1792']).optional(),
})

export type PlanInputSchema = z.infer<typeof planInputSchema>
