import { m } from 'motion/react'

import { cn } from '@/lib/utils'

type TSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface TProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  as?: React.ElementType
  size?: number
  sides?: TSide[]
  disabled?: boolean
}

const SideMap = {
  'top-left': {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    rotate: 180
  },
  'top-right': {
    top: 0,
    left: 1,
    x: -1,
    y: 0,
    rotate: 0
  },
  'bottom-left': {
    top: 1,
    left: 0,
    x: 0,
    y: -1,
    rotate: 180
  },
  'bottom-right': {
    top: 1,
    left: 1,
    x: -1,
    y: -1,
    rotate: 0
  }
} satisfies Record<
  TSide,
  {
    top: number
    left: number
    x: number
    y: number
    rotate: number
  }
>

export default function BlurBackground(props: TProps) {
  const {
    ref,
    as: Comp = 'div',
    className,
    children,
    size = 24,
    sides = ['top-left'],
    disabled,
    ...rest
  } = props

  const filterValue = size / 2

  return (
    <Comp
      ref={ref}
      className={cn(
        'relative z-0 overflow-hidden transition-colors',
        disabled && 'shadow-none',
        className
      )}
      {...rest}
    >
      {children}
      {!disabled &&
        sides.map((side) => {
          const { top, left, x, y, rotate } = SideMap[side]
          return (
            <m.div
              key={side}
              style={{
                top: `${top * 100}%`,
                left: `${left * 100}%`,
                x: `${y * 100}%`,
                y: `${y * 100}%`,
                rotate,
                filter: `blur(${filterValue}px)`
              }}
              initial={{ rotate }}
              animate={{
                x: [
                  `${x * 100}%`,
                  `${x == 0 ? 25 : -125}%`,
                  `${x * 100}%`,
                  `${x == 0 ? 25 : -125}%`,
                  `${x * 100}%`
                ],
                y: [
                  `${y * 100}%`,
                  `${y == 0 ? 25 : -125}%`,
                  `${y * 100}%`,
                  `${y == 0 ? 25 : -125}%`,
                  `${y * 100}%`
                ],
                rotate: [rotate, rotate + 360]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="pointer-events-none absolute -z-10"
              data-side={side}
            >
              <div
                style={{
                  width: `${size}px`,
                  transform: 'translate(0%, 0%)'
                }}
                className="bg-brand-1 aspect-square rounded-full"
              />
              <div
                style={{
                  width: `${size}px`,
                  transform: 'translate(-87%, -50%)'
                }}
                className="bg-brand-2 aspect-square rounded-full"
              />
              <div
                style={{
                  width: `${size}px`,
                  transform: 'translate(0%, -100%)'
                }}
                className="bg-brand-3 aspect-square rounded-full"
              />
            </m.div>
          )
        })}
    </Comp>
  )
}
