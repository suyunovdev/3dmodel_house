import { usePlanStore } from '@/store/planStore'
import type { PlanInput } from '@ai-house-planner/shared'

export function usePlanGenerator() {
  const { generatePlan, currentResult, isLoading, isGeneratingImage, error } = usePlanStore()

  const generate = async (input: PlanInput) => {
    await generatePlan(input)
  }

  return {
    generate,
    result: currentResult,
    isLoading,
    isGeneratingImage,
    error,
  }
}
