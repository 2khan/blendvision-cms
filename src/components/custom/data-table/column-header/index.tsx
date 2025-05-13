import { type Header, type Table, flexRender } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import ColumnMenu from './column-menu'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>
  table: Table<TData>
}

export function DataTableColumnHeader<TData, TValue>({
  header,
  // table,
  className,
  ...rest
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = header.column.getCanSort()
  const isSorted = header.column.getIsSorted()

  return (
    <div
      className={cn(
        'flex min-w-20 items-center justify-between -mr-2',
        canSort && '-ml-2',
        className
      )}
      {...rest}
    >
      {canSort ? (
        <button
          className={cn(
            'hover:bg-accent hover:text-accent-foreground flex h-10 grow cursor-pointer items-center justify-between gap-3 px-2',
            isSorted && 'text-accent-foreground'
          )}
          onClick={() => canSort && header.column.toggleSorting()}
        >
          <span>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          {isSorted === 'desc' ? (
            <ArrowDownIcon className="size-3" />
          ) : isSorted === 'asc' ? (
            <ArrowUpIcon className="size-3" />
          ) : (
            <ArrowUpDownIcon className="size-3" />
          )}
        </button>
      ) : (
        flexRender(header.column.columnDef.header, header.getContext())
      )}
      <ColumnMenu header={header} />
    </div>
  )
}
