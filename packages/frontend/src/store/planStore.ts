import { create } from 'zustand'
import { api } from '@/lib/api'
import type { GeneratedPlan, PlanInput } from '@ai-house-planner/shared'

interface PlanResult {
  plan: GeneratedPlan
  explanation: string
  imagePrompt: string
  imageUrl?: string
}

interface PlanState {
  currentResult: PlanResult | null
  isLoading: boolean
  isGeneratingImage: boolean
  error: string | null
  generatePlan: (input: PlanInput) => Promise<void>
  generateImage: (prompt: string) => Promise<void>
  clearResult: () => void
}

export const usePlanStore = create<PlanState>((set, get) => ({
  currentResult: null,
  isLoading: false,
  isGeneratingImage: false,
  error: null,

  generatePlan: async (input: PlanInput) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/generate-plan', input) as { data: { plan: GeneratedPlan; explanation: string; imagePrompt: string } }
      const { plan, explanation, imagePrompt } = response.data
      set({
        currentResult: { plan, explanation, imagePrompt },
        isLoading: false,
      })
      // Auto-generate image in background
      get().generateImage(imagePrompt)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      throw error
    }
  },

  generateImage: async (prompt: string) => {
    set({ isGeneratingImage: true })
    try {
      const response = await api.post('/generate-image', { prompt }) as { data: { imageUrl: string } }
      const currentResult = get().currentResult
      if (currentResult) {
        set({
          currentResult: { ...currentResult, imageUrl: response.data.imageUrl },
          isGeneratingImage: false,
        })
      }
    } catch {
      set({ isGeneratingImage: false })
    }
  },

  clearResult: () => set({ currentResult: null, error: null }),
}))
