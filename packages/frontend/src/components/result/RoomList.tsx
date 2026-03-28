import type { GeneratedPlan } from '@ai-house-planner/shared'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const ROOM_EMOJIS: Record<string, string> = {
  living_room: '🛋',
  bedroom: '🛏',
  bathroom: '🚿',
  kitchen: '🍳',
  dining_room: '🍽',
  hallway: '🚪',
  garage: '🚗',
  balcony: '🌿',
  storage: '📦',
  office: '💼',
}

interface RoomListProps {
  plan: GeneratedPlan
}

export function RoomList({ plan }: RoomListProps) {
  const allRooms = plan.floors.flatMap(f => f.rooms)
  const totalArea = allRooms.reduce((sum, r) => sum + r.area, 0)

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">Xonalar ro&apos;yxati</h3>
        <Badge variant="primary">{allRooms.length} ta xona</Badge>
      </div>

      <div className="space-y-2">
        {allRooms.map(room => (
          <div
            key={room.id}
            className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{ROOM_EMOJIS[room.type] || '🏠'}</span>
              <div>
                <p className="text-white text-sm font-medium">{room.name}</p>
                {room.features && room.features.length > 0 && (
                  <p className="text-white/40 text-xs">{room.features.slice(0, 2).join(', ')}</p>
                )}
              </div>
            </div>
            <span className="text-primary-400 text-sm font-bold">{room.area} m²</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
        <span className="text-white/60 text-sm">Jami maydon</span>
        <span className="text-white font-bold">{plan.totalArea} m²</span>
      </div>

      {plan.estimatedCost && (
        <div className="mt-3 p-3 bg-primary-500/10 border border-primary-500/20 rounded-xl">
          <p className="text-primary-400 text-xs font-medium">Taxminiy qurilish narxi</p>
          <p className="text-white font-bold">
            ${plan.estimatedCost.min.toLocaleString()} — ${plan.estimatedCost.max.toLocaleString()}
          </p>
        </div>
      )}
    </Card>
  )
}
