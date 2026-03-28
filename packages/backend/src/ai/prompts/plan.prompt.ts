import type { PlanInput } from '@ai-house-planner/shared'

export function buildPlanPrompt(input: PlanInput): string {
  return `You are an expert architect and house planner. Generate a detailed floor plan for a house with the following specifications:

- Total area: ${input.area} m²
- Number of floors: ${input.floors}
- Bedrooms: ${input.bedrooms}
- Bathrooms: ${input.bathrooms ?? Math.ceil(input.bedrooms / 2)}
- Architectural style: ${input.style}
${input.extra ? `- Additional requirements: ${input.extra}` : ''}

Return a JSON object with this EXACT structure (no markdown, pure JSON):
{
  "floors": [
    {
      "floor": 1,
      "width": <number in meters>,
      "height": <number in meters>,
      "rooms": [
        {
          "id": "room_1",
          "name": "Living Room",
          "type": "living_room",
          "area": <number in m²>,
          "floor": 1,
          "position": { "x": 0, "y": 0, "width": <meters>, "height": <meters> },
          "features": ["large windows", "open to kitchen"]
        }
      ]
    }
  ],
  "zones": {
    "living": { "name": "Living Zone", "rooms": ["room_1", "room_2"] },
    "sleeping": { "name": "Sleeping Zone", "rooms": ["room_3"] },
    "service": { "name": "Service Zone", "rooms": ["room_4"] }
  },
  "totalArea": ${input.area},
  "notes": "<brief architectural notes about the design>",
  "style": "${input.style}",
  "estimatedCost": {
    "min": <number in USD>,
    "max": <number in USD>,
    "currency": "USD"
  }
}

Important rules:
1. Room positions must not overlap
2. Total room areas must equal totalArea
3. Each floor area = totalArea / floors
4. Place rooms logically (kitchen near dining, bedrooms grouped together)
5. Include hallways and corridors as rooms
6. Response must be VALID JSON only, no explanations`
}
