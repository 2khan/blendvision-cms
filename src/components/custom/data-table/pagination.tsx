import type { Table } from '@tanstack/react-table'
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import Spinner from '../spinner'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { dx } from '@/lib/dx'

interface TDataTablePaginationProps<TData> {
  table: Table<TData>
  isLoading?: boolean
}

export default function DataTablePagination<TData>({
  table,
  isLoading
}: TDataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-2 py-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronFirstIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon />
      </Button>
      <span className={dx('label-01')}>Page: {table.getPageCount()}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronLastIcon />
      </Button>

      <div
        className={cn(
          'bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full',
          !isLoading && 'text-foreground'
        )}
      >
        {isLoading ? <Spinner /> : <CheckCircledIcon />}
      </div>
    </div>
  )
}
