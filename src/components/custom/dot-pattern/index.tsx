import { Fragment } from 'react/jsx-runtime'

import { cn } from '@/lib/utils'

import { FadePattern } from '../fade-pattern'

interface TProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color?: string
  backgroundSize?: number
  opacity?: number
  faded?: boolean
}

export function DotPattern({
  color = 'var(--muted-foreground)',
  backgroundSize = 20,
  opacity = 0.5,
  faded,
  className,
  style,
  ...props
}: TProps) {
  return (
    <Fragment>
      <div
        {...props}
        className={cn('absolute inset-0 -z-20', className)}
        style={{
          ...style,
          backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          opacity
        }}
      />
      {faded && <FadePattern />}
    </Fragment>
  )
}
