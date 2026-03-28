import type { HouseStyle } from '../types/plan.types'

export const HOUSE_STYLES: Record<HouseStyle, { label: string; description: string; emoji: string }> = {
  modern: {
    label: 'Modern',
    description: 'Clean lines, open spaces, minimalist aesthetics',
    emoji: '🏙️',
  },
  classic: {
    label: 'Classic',
    description: 'Traditional design with elegant details',
    emoji: '🏛️',
  },
  minimalist: {
    label: 'Minimalist',
    description: 'Less is more, functional simplicity',
    emoji: '⬜',
  },
  industrial: {
    label: 'Industrial',
    description: 'Raw materials, exposed elements',
    emoji: '🏭',
  },
  scandinavian: {
    label: 'Scandinavian',
    description: 'Cozy, natural materials, light colors',
    emoji: '🏡',
  },
}

export const STYLE_OPTIONS = Object.entries(HOUSE_STYLES).map(([value, meta]) => ({
  value: value as HouseStyle,
  ...meta,
}))
