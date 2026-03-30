import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PlanService } from '../../src/services/plan.service'
import mockUserInput from '../fixtures/mockUserInput.json'
import mockPlanResponse from '../fixtures/mockPlanResponse.json'

// Mock external dependencies
vi.mock('../../src/ai/openai.client', () => ({
  openAIClient: {
    chat: vi.fn(),
    generateImage: vi.fn(),
  },
}))

vi.mock('../../src/ai/response.parser', () => ({
  parseJSONResponse: vi.fn(),
}))

vi.mock('../../src/utils/cache', () => ({
  cache: {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue(undefined),
  },
}))

import { openAIClient } from '../../src/ai/openai.client'
import { parseJSONResponse } from '../../src/ai/response.parser'
import { cache } from '../../src/utils/cache'

describe('PlanService', () => {
  let planService: PlanService

  beforeEach(() => {
    planService = new PlanService()
    vi.clearAllMocks()
    vi.mocked(cache.get).mockResolvedValue(null)
  })

  it('should generate a plan and cache the result', async () => {
    vi.mocked(openAIClient.chat).mockResolvedValue(JSON.stringify(mockPlanResponse))
    vi.mocked(parseJSONResponse).mockReturnValue(mockPlanResponse as any)

    const result = await planService.generatePlan(mockUserInput as any)

    expect(result).toHaveProperty('plan')
    expect(result).toHaveProperty('explanation')
    expect(result).toHaveProperty('imagePrompt')
    expect(cache.set).toHaveBeenCalledOnce()
  })

  it('should return cached result if available', async () => {
    const cachedResult = {
      plan: mockPlanResponse,
      explanation: 'cached explanation',
      imagePrompt: 'cached prompt',
    }
    vi.mocked(cache.get).mockResolvedValue(cachedResult as any)

    const result = await planService.generatePlan(mockUserInput as any)

    expect(result).toEqual(cachedResult)
    expect(openAIClient.chat).not.toHaveBeenCalled()
  })

  it('should call openAI twice: plan + explanation', async () => {
    vi.mocked(openAIClient.chat)
      .mockResolvedValueOnce(JSON.stringify(mockPlanResponse))
      .mockResolvedValueOnce('A modern house with 3 bedrooms')
    vi.mocked(parseJSONResponse).mockReturnValue(mockPlanResponse as any)

    await planService.generatePlan(mockUserInput as any)

    expect(openAIClient.chat).toHaveBeenCalledTimes(2)
  })
})
