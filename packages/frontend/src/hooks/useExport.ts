import { useState } from 'react'
import { exportPlanToPDF } from '@/lib/pdfExport'
import type { GeneratedPlan } from '@ai-house-planner/shared'

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async (plan: GeneratedPlan, explanation: string) => {
    setIsExporting(true)
    try {
      await exportPlanToPDF(plan, explanation)
    } finally {
      setIsExporting(false)
    }
  }

  return { exportToPDF, isExporting }
}
