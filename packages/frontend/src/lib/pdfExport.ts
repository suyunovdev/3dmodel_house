import type { GeneratedPlan } from '@ai-house-planner/shared'

export async function exportPlanToPDF(plan: GeneratedPlan, explanation: string): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const primary = [14, 165, 233] as [number, number, number]
  const white = [248, 250, 252] as [number, number, number]
  const gray = [100, 116, 139] as [number, number, number]
  const dark = [15, 23, 42] as [number, number, number]

  // Background
  doc.setFillColor(...dark)
  doc.rect(0, 0, 210, 297, 'F')

  // Header
  doc.setFillColor(...primary)
  doc.rect(0, 0, 210, 35, 'F')
  doc.setTextColor(...white)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('AI House Planner', 20, 20)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Uy Rejasi Hisoboti', 20, 28)

  // Stats
  const stats = [
    `Maydon: ${plan.totalArea} m²`,
    `Uslub: ${plan.style.toUpperCase()}`,
    `Qavatlar: ${plan.floors.length}`,
  ]

  doc.setTextColor(...white)
  doc.setFontSize(12)
  let x = 20
  stats.forEach(stat => {
    doc.setFont('helvetica', 'bold')
    doc.text(stat, x, 50)
    x += 65
  })

  // Rooms section
  doc.setTextColor(...primary)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Xonalar:', 20, 65)

  const allRooms = plan.floors.flatMap(f => f.rooms)
  let y = 75
  allRooms.forEach(room => {
    doc.setTextColor(...white)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`• ${room.name}: ${room.area} m²`, 25, y)
    y += 8
    if (y > 260) {
      doc.addPage()
      doc.setFillColor(...dark)
      doc.rect(0, 0, 210, 297, 'F')
      y = 20
    }
  })

  // Description
  y += 10
  doc.setTextColor(...primary)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Tavsif:', 20, y)
  y += 10

  doc.setTextColor(...gray)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(explanation, 170)
  doc.text(lines, 20, y)

  // Footer
  doc.setTextColor(...gray)
  doc.setFontSize(8)
  doc.text(`Yaratilgan: ${new Date().toLocaleDateString('uz-UZ')} | AI House Planner`, 20, 290)

  doc.save(`uy-rejasi-${Date.now()}.pdf`)
}
