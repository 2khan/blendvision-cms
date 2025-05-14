import { useCallback } from 'react'
import { ChangeEvent } from 'react'

import type { Column } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'

interface TProps<TData> {
  column: Column<TData>
}

export default function TextFilter<TData>(props: TProps<TData>) {
  const { column } = props

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => column.setFilterValue(e.target.value),
    [column]
  )

  return (
    <Input
      placeholder={`Search ${column.columnDef.meta?.label}...`}
      value={(column.getFilterValue() as string) ?? ''}
      onChange={onChange}
      className="h-8 w-56"
    />
  )
}
