import { dx } from '@/lib/dx'
import { cn } from '@/lib/utils'

import { DotPattern } from '@/components/custom/dot-pattern'

interface TProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export default function Showcase(props: TProps) {
  const { title, children, className } = props

  return (
    <div
      className={cn(
        'p-16 max-lg:p-6 flex flex-col justify-center items-center relative border overflow-hidden',
        className
      )}
    >
      <DotPattern />

      {children}
      {title && (
        <div className={dx('heading-02', 'absolute top-4 right-4 uppercase')}>
          {title}
        </div>
      )}
    </div>
  )
}
