import { type TdHTMLAttributes, useState } from 'react'
import {
  // type Table as TRootTable,
  type ColumnDef,
  type SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import DataTableToolbar from './toolbar'
import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    align?: TdHTMLAttributes<HTMLTableCellElement>['align']
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta?: {
    isLoading: boolean
    hideToolbar?: boolean
  }
  options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  options = {}
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    ...options,
    state: {
      ...options.state,
      sorting
    },
    initialState: {
      ...options.initialState
    }
  })

  // style={{ minHeight: 768, maxHeight: 'max-content' }}

  return (
    <div className="relative grid w-full grid-cols-1">
      {!meta?.hideToolbar && (
        <DataTableToolbar isLoading={meta?.isLoading} table={table} />
      )}
      <ScrollArea
        orientation="horizontal"
        className="bg-card rounded-lg border"
      >
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
