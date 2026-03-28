import { clsx } from 'clsx'
import { Check } from 'lucide-react'

interface FormStepperProps {
  steps: string[]
  currentStep: number
}

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                index < currentStep
                  ? 'bg-primary-500 text-white'
                  : index === currentStep
                  ? 'bg-primary-500/20 border-2 border-primary-500 text-primary-400'
                  : 'bg-white/5 border border-white/20 text-white/30'
              )}
            >
              {index < currentStep ? <Check size={14} /> : index + 1}
            </div>
            <span
              className={clsx(
                'text-xs font-medium hidden sm:block',
                index <= currentStep ? 'text-white/70' : 'text-white/30'
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={clsx(
                'flex-1 h-px',
                index < currentStep ? 'bg-primary-500/50' : 'bg-white/10'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
