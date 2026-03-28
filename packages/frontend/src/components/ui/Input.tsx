import { clsx } from 'clsx'
import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-white/70">
            {label}
            {props.required && <span className="text-primary-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30',
            'focus:outline-none focus:ring-2 focus:ring-primary-400/50 transition-all duration-200',
            error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-primary-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
