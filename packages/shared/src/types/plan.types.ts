export type HouseStyle = 'modern' | 'classic' | 'minimalist' | 'industrial' | 'scandinavian'

export interface PlanInput {
  area: number
  floors: number
  bedrooms: number
  bathrooms?: number
  style: HouseStyle
  extra?: string
}

export interface Room {
  id: string
  name: string
  type: RoomType
  area: number
  floor: number
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  features?: string[]
}

export type RoomType =
  | 'bedroom'
  | 'bathroom'
  | 'kitchen'
  | 'living_room'
  | 'dining_room'
  | 'hallway'
  | 'garage'
  | 'balcony'
  | 'storage'
  | 'office'

export interface Zone {
  name: string
  rooms: string[]
  color?: string
}

export interface FloorPlan {
  floor: number
  width: number
  height: number
  rooms: Room[]
}

export interface GeneratedPlan {
  id?: string
  floors: FloorPlan[]
  zones: {
    living?: Zone
    sleeping?: Zone
    service?: Zone
    [key: string]: Zone | undefined
  }
  totalArea: number
  notes: string
  style: HouseStyle
  estimatedCost?: {
    min: number
    max: number
    currency: string
  }
}
