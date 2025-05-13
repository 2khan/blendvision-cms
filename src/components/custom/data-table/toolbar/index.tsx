import type { Table } from '@tanstack/react-table'

import type { DataTableMetaOptions } from '../utils'
import { ColumnToggle } from './column-toggle'
import LoadingIndicator from './loading-indicator'
import Pagination from './pagination'

interface TDataTableToolbarProps<TData> {
  table: Table<TData>
  tableMeta?: DataTableMetaOptions
  isLoading?: boolean
}

export default function DataTableToolbar<TData>({
  table,
  isLoading,
  tableMeta
}: TDataTableToolbarProps<TData>) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <div className="grow"></div>
      <Pagination table={table} tableMeta={tableMeta} />
      <LoadingIndicator isLoading={isLoading} />
      <ColumnToggle table={table} />
    </div>
  )
}
