import { cn } from '@/lib/utils'

interface TProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  opacity?: number
}

export function FadePattern({
  opacity = 0,
  className,
  style,
  ...props
}: TProps) {
  return (
    <div
      {...props}
      className={cn(
        'pointer-events-none absolute -z-10 inset-0 flex items-center justify-center bg-white dark:bg-black',
        className
      )}
      style={{
        ...style,
        maskImage: `radial-gradient(ellipse at center,transparent ${opacity * 100}%, black)`
      }}
    />
  )
}
