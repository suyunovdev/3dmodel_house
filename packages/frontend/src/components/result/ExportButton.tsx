'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { GeneratedPlan } from '@ai-house-planner/shared'
import { toast } from 'react-hot-toast'

interface ExportButtonProps {
  plan: GeneratedPlan
  explanation: string
}

export function ExportButton({ plan, explanation }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.text('AI House Planner — Uy Rejasi', 20, 20)

      doc.setFontSize(12)
      doc.text(`Maydon: ${plan.totalArea} m²`, 20, 40)
      doc.text(`Uslub: ${plan.style.toUpperCase()}`, 20, 50)
      doc.text(`Qavatlar: ${plan.floors.length}`, 20, 60)

      doc.setFontSize(14)
      doc.text('Xonalar:', 20, 80)

      const allRooms = plan.floors.flatMap(f => f.rooms)
      let y = 90
      allRooms.forEach(room => {
        doc.setFontSize(11)
        doc.text(`• ${room.name}: ${room.area} m²`, 25, y)
        y += 8
      })

      y += 10
      doc.setFontSize(14)
      doc.text('Tavsif:', 20, y)
      y += 10
      doc.setFontSize(11)
      const lines = doc.splitTextToSize(explanation, 170)
      doc.text(lines, 20, y)

      doc.save(`uy-rejasi-${Date.now()}.pdf`)
      toast.success('PDF muvaffaqiyatli yuklab olindi!')
    } catch {
      toast.error('PDF yaratishda xatolik yuz berdi')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="secondary" onClick={handleExport} isLoading={isExporting} size="sm">
      <Download size={16} />
      PDF yuklab olish
    </Button>
  )
}
