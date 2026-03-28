import { clsx } from 'clsx'
import { type SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-white/70">{label}</label>
      )}
      <select
        className={clsx(
          'w-full bg-dark-900 border rounded-xl px-4 py-3 text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-400/50 transition-all duration-200',
          'appearance-none cursor-pointer',
          error ? 'border-red-500/50' : 'border-white/20 focus:border-primary-400',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-dark-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
