import { type TdHTMLAttributes } from 'react'

import {
  type ColumnDef,
  type TableOptions,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import DataTablePagination from './pagination'
import DataTableToolbar from './toolbar'
import type { DataTableMetaOptions, TFilterVariant } from './utils'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    align?: TdHTMLAttributes<HTMLTableCellElement>['align']
    label?: string
    filterVariant?: TFilterVariant
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta?: DataTableMetaOptions
  options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>
  toolbar_actions?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  options = {},
  toolbar_actions
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...options,
    defaultColumn: {
      enableColumnFilter: false,
      ...options.defaultColumn
    },
    state: {
      ...options.state
    },
    initialState: {
      ...options.initialState
    }
  })

  return (
    <div className="relative w-full h-full flex flex-col bg-card rounded-lg border overflow-hidden">
      {!meta?.hideToolbar && (
        <DataTableToolbar isLoading={meta?.isLoading} table={table}>
          {toolbar_actions}
        </DataTableToolbar>
      )}
      <ScrollArea orientation="horizontal" className="h-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      align={header.column.columnDef.meta?.align || 'left'}
                    >
                      <DataTableColumnHeader header={header} table={table} />
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      align={cell.column.columnDef.meta?.align || 'left'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-80 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex flex-col gap-3 p-2 items-end">
        <DataTablePagination table={table} tableMeta={meta} />
      </div>
    </div>
  )
}
