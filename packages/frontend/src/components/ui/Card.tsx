import { clsx } from 'clsx'
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ children, className, hover, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6',
        hover && 'hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
