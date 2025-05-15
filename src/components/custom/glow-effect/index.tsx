import { Transition, motion } from 'motion/react'

import { cn } from '@/lib/utils'

export type GlowEffectProps = {
  className?: string
  style?: React.CSSProperties
  colors?: string[]
  mode?:
    | 'rotate'
    | 'pulse'
    | 'breathe'
    | 'colorShift'
    | 'flowHorizontal'
    | 'static'
  blur?: number
  transition?: Transition
  scale?: number
  duration?: number
}

export function GlowEffect({
  className,
  style,
  colors = [
    'var(--brand-1)',
    'var(--brand-2)',
    'var(--brand-4)',
    'var(--brand-3)'
  ],
  mode = 'rotate',
  blur = 100,
  transition,
  scale = 1,
  duration = 5
}: GlowEffectProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: duration,
    ease: 'linear'
  }

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`
      ],
      transition: {
        ...(transition ?? BASE_TRANSITION)
      }
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror'
        })
      }
    },
    breathe: {
      background: [
        ...colors.map(
          (color) =>
            `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
        )
      ],
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror'
        })
      }
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length]
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`
      }),
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror'
        })
      }
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length]
        return `linear-gradient(to right, ${color}, ${nextColor})`
      }),
      transition: {
        ...(transition ?? {
          ...BASE_TRANSITION,
          repeatType: 'mirror'
        })
      }
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(', ')})`
    }
  }

  return (
    <motion.div
      style={
        {
          ...style,
          '--scale': scale,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          filter: `blur(${blur}px)`
        } as React.CSSProperties
      }
      animate={animations[mode]}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'scale-[var(--scale)] transform-gpu',
        className
      )}
    />
  )
}
