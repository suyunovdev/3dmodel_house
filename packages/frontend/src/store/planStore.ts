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

async function pollJobStatus(jobId: string, onComplete: (imageUrl: string) => void): Promise<void> {
  const MAX_ATTEMPTS = 60   // max 2 daqiqa
  const INTERVAL_MS = 2000

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    await new Promise(r => setTimeout(r, INTERVAL_MS))
    try {
      const res = await api.get(`/generate-image/status/${jobId}`) as any
      const { status, result } = res.data
      if (status === 'completed' && result?.imageUrl) {
        onComplete(result.imageUrl)
        return
      }
      if (status === 'failed') return
    } catch {
      // polling xatosi — davom etamiz
    }
  }
}

export const usePlanStore = create<PlanState>((set, get) => ({
  currentResult: null,
  isLoading: false,
  isGeneratingImage: false,
  error: null,

  generatePlan: async (input: PlanInput): Promise<string> => {
    set({ isLoading: true, error: null })
    try {
      const res = await api.post('/generate-plan', input) as any
      const { plan, explanation, imagePrompt } = res.data

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

      // Non-blocking image generation
      get().generateImage(imagePrompt, projectId)

      return projectId
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      throw error
    }
  },

  generateImage: async (prompt: string, projectId: string) => {
    set({ isGeneratingImage: true })
    try {
      const res = await api.post('/generate-image', { prompt, projectId }) as any
      const { status, imageUrl, jobId } = res.data

      if (status === 'completed' && imageUrl) {
        // Sync mode (Redis yo'q)
        const currentResult = get().currentResult
        if (currentResult) {
          set({ currentResult: { ...currentResult, imageUrl }, isGeneratingImage: false })
        }
      } else if (status === 'queued' && jobId) {
        // Async mode — poll qilish
        await pollJobStatus(jobId, (url) => {
          const currentResult = get().currentResult
          if (currentResult) {
            set({ currentResult: { ...currentResult, imageUrl: url }, isGeneratingImage: false })
          }
        })
        set({ isGeneratingImage: false })
      } else {
        set({ isGeneratingImage: false })
      }
    } catch {
      set({ isGeneratingImage: false })
    }
  },

  clearResult: () => set({ currentResult: null, error: null }),
}))
