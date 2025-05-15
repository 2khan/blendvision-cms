import { HTMLMotionProps, motion } from 'motion/react'

import { cn } from '@/lib/utils'

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270
}

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES
  className?: string
  blurIntensity?: number
  stops?: [number, number]
} & HTMLMotionProps<'div'>

export function ProgressiveBlur({
  direction = 'bottom',
  className,
  blurIntensity = 4,
  stops = [0, 0.8],
  ...props
}: ProgressiveBlurProps) {
  const angle = GRADIENT_ANGLES[direction]
  const gradientStops = stops.map(
    (pos, posIndex) =>
      `rgba(255, 255, 255, ${posIndex > 0 ? 1 : 0}) ${pos * 100}%`
  )

  const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`

  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        className
      )}
      style={{
        maskImage: gradient,
        WebkitMaskImage: gradient,
        backdropFilter: `blur(${blurIntensity}px)`
      }}
      {...props}
    />
  )
}
