import type { Table } from '@tanstack/react-table'

import type { DataTableMetaOptions } from '../utils'
import ColumnFilters from './column-filters'
import { ColumnToggle } from './column-toggle'
import Pagination from './pagination'

// import LoadingIndicator from './loading-indicator'

interface TDataTableToolbarProps<TData> {
  table: Table<TData>
  tableMeta?: DataTableMetaOptions
  isLoading?: boolean
}

export default function DataTableToolbar<TData>({
  table,
  // isLoading,
  tableMeta
}: TDataTableToolbarProps<TData>) {
  return (
    <div className="flex p-2 border-b bg-muted gap-2 items-start">
      <ColumnFilters table={table} />
      {/* <LoadingIndicator isLoading={isLoading} /> */}
      <div className="flex flex-col gap-2 items-end shrink-0">
        <ColumnToggle table={table} />
        <Pagination table={table} tableMeta={tableMeta} />
      </div>
    </div>
  )
}
