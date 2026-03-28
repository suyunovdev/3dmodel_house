import { clsx } from 'clsx'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function Loader({ size = 'md', text, className }: LoaderProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={clsx('flex flex-col items-center gap-3', className)}>
      <div className="relative">
        <div className={clsx('rounded-full border-2 border-white/10', sizes[size])} />
        <div
          className={clsx(
            'absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin',
            sizes[size]
          )}
        />
      </div>
      {text && <p className="text-white/60 text-sm animate-pulse">{text}</p>}
    </div>
  )
}
