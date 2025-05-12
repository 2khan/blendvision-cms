import type { CSSProperties } from 'react'

export const getWidth = (
  width: number,
  style?: CSSProperties
): CSSProperties => ({
  width: `${width}px`,
  ...style
})
