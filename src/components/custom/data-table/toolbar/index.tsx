import type { Table } from '@tanstack/react-table'

import ColumnFilters from './column-filters'
import { ColumnToggle } from './column-toggle'

// import LoadingIndicator from './loading-indicator'

interface TDataTableToolbarProps<TData> {
  table: Table<TData>
  isLoading?: boolean
}

export default function DataTableToolbar<TData>({
  table
  // isLoading,
}: TDataTableToolbarProps<TData>) {
  return (
    <div className="flex p-2 border-b bg-muted gap-2 items-start">
      <ColumnFilters table={table} />
      {/* <LoadingIndicator isLoading={isLoading} /> */}
      <ColumnToggle table={table} />
    </div>
  )
}
