import { create } from 'zustand'
import { api } from '@/lib/api'
import type { GeneratedPlan, PlanInput } from '@ai-house-planner/shared'

interface PlanResult {
  projectId: string
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
  generatePlan: (input: PlanInput) => Promise<string>
  generateImage: (prompt: string, projectId: string) => Promise<void>
  clearResult: () => void
}

export const usePlanStore = create<PlanState>((set, get) => ({
  currentResult: null,
  isLoading: false,
  isGeneratingImage: false,
  error: null,

  generatePlan: async (input: PlanInput): Promise<string> => {
    set({ isLoading: true, error: null })
    try {
      // 1. AI dan plan va explanation olamiz
      const res = await api.post('/generate-plan', input) as any
      const { plan, explanation, imagePrompt } = res.data

      // 2. DB ga saqlaymiz va projectId olamiz
      const saveRes = await api.post('/projects', {
        inputData: input,
        resultJson: plan,
        explanation,
      }) as any
      const projectId: string = saveRes.data._id

      set({
        currentResult: { projectId, plan, explanation, imagePrompt },
        isLoading: false,
      })

      // 3. Rasm background da generatsiya (non-blocking)
      get().generateImage(imagePrompt, projectId)

      return projectId
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      throw error
    }
  },

  generateImage: async (prompt: string, _projectId: string) => {
    set({ isGeneratingImage: true })
    try {
      const res = await api.post('/generate-image', { prompt }) as any
      const imageUrl: string = res.data.imageUrl

      // Store ni yangilaymiz
      const currentResult = get().currentResult
      if (currentResult) {
        set({
          currentResult: { ...currentResult, imageUrl },
          isGeneratingImage: false,
        })
      }

      // DB dagi loyihani ham yangilaymiz
      await api.post('/projects', {
        inputData: currentResult?.plan,
        resultJson: currentResult?.plan,
        explanation: currentResult?.explanation,
        imageUrl,
      }).catch(() => null)
    } catch {
      set({ isGeneratingImage: false })
    }
  },

  clearResult: () => set({ currentResult: null, error: null }),
}))
