import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { dx } from '@/lib/dx'
import { cn } from '@/lib/utils'

const kbdVariants = cva(
  'inline-flex w-fit items-center gap-1 font-medium font-mono text-[10px] text-foreground/70 sm:text-[11px]',
  {
    variants: {
      size: {
        default: 'h-6 rounded px-1.5',
        sm: 'h-5 rounded-sm px-1',
        lg: 'h-7 rounded-md px-2'
      },
      variant: {
        default: 'bg-accent',
        outline:
          "px-0 [&_[data-slot='kbd-key']]:bg-background [&_[data-slot='kbd-key']]:min-w-[20px] [&_[data-slot='kbd-key']]:border [&_[data-slot='kbd-key']]:border-border [&_[data-slot='kbd-key']]:px-1.5",
        ghost: 'bg-transparent shadow-none'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
)

interface KbdRootProps
  extends React.ComponentPropsWithoutRef<'kbd'>,
    VariantProps<typeof kbdVariants> {
  asChild?: boolean
}

const KbdRoot = (props: KbdRootProps) => {
  const {
    variant = 'default',
    size = 'default',
    asChild,
    className,
    ...rootProps
  } = props

  const RootPrimitive = asChild ? Slot : 'kbd'

  return (
    <RootPrimitive
      role="group"
      data-slot="kbd"
      {...rootProps}
      className={cn(kbdVariants({ size, variant, className }))}
    />
  )
}

const KEY_DESCRIPTIONS: Record<string, string> = {
  '⌘': 'Command',
  '⇧': 'Shift',
  '⌥': 'Option',
  '⌃': 'Control',
  Ctrl: 'Control',
  '⌫': 'Backspace',
  '⎋': 'Escape',
  '↩': 'Return',
  '⇥': 'Tab',
  '⌤': 'Enter',
  '↑': 'Arrow Up',
  '↓': 'Arrow Down',
  '←': 'Arrow Left',
  '→': 'Arrow Right',
  '⇪': 'Caps Lock',
  fn: 'Function',
  '⌦': 'Delete',
  '⇞': 'Page Up',
  '⇟': 'Page Down',
  '↖': 'Home',
  '↘': 'End',
  '↕': 'Page Up/Down',
  '↔': 'Left/Right'
} as const

interface KbdKeyProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean
}

const KbdKey = (props: KbdKeyProps) => {
  const { asChild, className, children, title: titleProp, ...keyProps } = props

  const keyText = children?.toString() ?? ''
  const title = titleProp ?? KEY_DESCRIPTIONS[keyText] ?? keyText

  const KeyPrimitive = asChild ? Slot : 'span'

  return (
    <abbr title={title} className="no-underline">
      <KeyPrimitive
        data-slot="kbd-key"
        {...keyProps}
        className={dx(
          'code-01',
          'inline-flex items-center shadow-block justify-center rounded',
          className
        )}
      >
        {children}
      </KeyPrimitive>
    </abbr>
  )
}

interface KbdSeparatorProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean
}

const KbdSeparator = (props: KbdSeparatorProps) => {
  const { asChild, children = '+', className, ...separatorProps } = props

  const SeparatorPrimitive = asChild ? Slot : 'span'

  return (
    <SeparatorPrimitive
      role="separator"
      aria-orientation="horizontal"
      aria-hidden="true"
      data-slot="kbd-separator"
      {...separatorProps}
      className={cn('text-foreground/70', className)}
    >
      {children}
    </SeparatorPrimitive>
  )
}

const Kbd = KbdRoot
const Root = KbdRoot
const Key = KbdKey
const Separator = KbdSeparator

export {
  Kbd,
  KbdKey,
  KbdSeparator,
  //
  Root,
  Key,
  Separator
}
