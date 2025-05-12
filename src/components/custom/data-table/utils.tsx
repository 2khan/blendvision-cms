import type { CSSProperties } from 'react'

export interface DataTableMetaOptions {
  isLoading?: boolean
  hideToolbar?: boolean
  // TODO: Write a better comment
  onPageSizeChange?: (value: number) => void
}

export const getWidth = (
  width: number,
  style?: CSSProperties
): CSSProperties => ({
  width: `${width}px`,
  ...style
})
