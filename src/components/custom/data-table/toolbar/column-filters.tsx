import { Fragment, lazy, useCallback, useMemo } from 'react'

import type { Column, Table } from '@tanstack/react-table'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import TextFilter from '../filters/text-filter'

interface TProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
}

const SelectFilter = lazy(() => import('../filters/select-filter'))

export default function ColumnFilters<TData>(props: TProps<TData>) {
  const { table } = props
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  )

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className="grow flex gap-2 items-center flex-wrap"
    >
      {columns.map((c) => (
        <FilterItem key={c.id} column={c} />
      ))}
      {isFiltered && (
        <Button
          aria-label="Reset filters"
          variant="outline"
          size="sm"
          className="border-dashed"
          onClick={onReset}
        >
          <XIcon />
          Reset
        </Button>
      )}
    </div>
  )
}

function FilterItem<TData>({ column }: { column: Column<TData> }) {
  const meta = column.columnDef.meta
  const variant = meta?.filterVariant || 'text'

  return (
    column.getCanFilter() && (
      <Fragment>
        {variant === 'text' && <TextFilter column={column} />}
        {(variant === 'select' || variant === 'multiselect') && (
          <SelectFilter column={column} />
        )}
      </Fragment>
    )
  )
}
