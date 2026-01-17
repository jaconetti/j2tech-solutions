import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          {
            'bg-[rgb(var(--card))] text-[rgb(var(--foreground))]': variant === 'default',
            'bg-[rgb(var(--primary))]/20 text-[rgb(var(--primary))]': variant === 'primary',
            'bg-[rgb(var(--secondary))]/20 text-[rgb(var(--secondary))]': variant === 'secondary',
            'border border-[rgb(var(--border))] bg-transparent': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
