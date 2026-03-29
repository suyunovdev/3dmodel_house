'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { StyleSelector } from './StyleSelector'
import { RoomCounter } from './RoomCounter'
import { FormStepper } from './FormStepper'
import { usePlanStore } from '@/store/planStore'
import type { HouseStyle } from '@ai-house-planner/shared'
import { Wand2 } from 'lucide-react'

const STEPS = ['O\'lchamlar', 'Xonalar', 'Uslub', 'Qo\'shimcha']

export function PlanForm() {
  const router = useRouter()
  const { generatePlan, isLoading } = usePlanStore()

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    area: 100,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    style: 'modern' as HouseStyle,
    extra: '',
  })

  const handleNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const handleBack = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = async () => {
    try {
      const projectId = await generatePlan(formData)
      router.push(`/result/${projectId}`)
    } catch {
      toast.error('Xatolik yuz berdi. Qayta urinib ko\'ring.')
    }
  }

  return (
    <Card>
      <FormStepper steps={STEPS} currentStep={step} />

      <div className="min-h-[300px]">
        {step === 0 && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-white">Uy o&apos;lchamlari</h2>
            <Slider
              label="Umumiy maydon"
              value={formData.area}
              min={40}
              max={500}
              step={5}
              unit=" m²"
              onChange={v => setFormData(d => ({ ...d, area: v }))}
            />
            <Slider
              label="Qavatlar soni"
              value={formData.floors}
              min={1}
              max={4}
              unit=" qavat"
              onChange={v => setFormData(d => ({ ...d, floors: v }))}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Xonalar</h2>
            <RoomCounter
              label="Yotoq xonalar"
              value={formData.bedrooms}
              min={1}
              max={8}
              onChange={v => setFormData(d => ({ ...d, bedrooms: v }))}
            />
            <RoomCounter
              label="Hammomlar"
              value={formData.bathrooms}
              min={1}
              max={5}
              onChange={v => setFormData(d => ({ ...d, bathrooms: v }))}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Arxitektura uslubi</h2>
            <StyleSelector
              value={formData.style}
              onChange={style => setFormData(d => ({ ...d, style }))}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Qo&apos;shimcha talablar</h2>
            <p className="text-white/50 text-sm">
              Ixtiyoriy: garaj, hovuz, balkon, oshxona orolchasi va boshqalar
            </p>
            <textarea
              value={formData.extra}
              onChange={e => setFormData(d => ({ ...d, extra: e.target.value }))}
              placeholder="Masalan: katta oshxona bilan orolcha, 2 ta garaj, janub tomonga yo'naltirilgan..."
              rows={4}
              className="input-field resize-none"
              maxLength={500}
            />
            <p className="text-xs text-white/30 text-right">{formData.extra.length}/500</p>

            {/* Summary */}
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
              <p className="text-primary-400 text-sm font-medium mb-2">Reja xulosasi:</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                <span>Maydon: <strong className="text-white">{formData.area} m²</strong></span>
                <span>Qavatlar: <strong className="text-white">{formData.floors}</strong></span>
                <span>Yotoqlar: <strong className="text-white">{formData.bedrooms}</strong></span>
                <span>Hammomlar: <strong className="text-white">{formData.bathrooms}</strong></span>
                <span className="col-span-2">Uslub: <strong className="text-white capitalize">{formData.style}</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
        {step > 0 && (
          <Button variant="secondary" onClick={handleBack} className="flex-1">
            Orqaga
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={handleNext} className="flex-1">
            Davom etish
          </Button>
        ) : (
          <Button onClick={handleSubmit} isLoading={isLoading} className="flex-1 gap-2">
            <Wand2 size={16} />
            AI Reja Yaratish
          </Button>
        )}
      </div>
    </Card>
  )
}
