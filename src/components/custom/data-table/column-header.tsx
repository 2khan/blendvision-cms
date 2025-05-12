import { type Header, type Table, flexRender } from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDownIcon,
  EyeOff,
  MoreVertical
} from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

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
        'flex min-w-20 items-center justify-between',
        canSort && '-mx-2',
        header.column.columnDef.meta?.align == 'center' && 'justify-center',
        header.column.columnDef.meta?.align == 'left' && 'justify-start',
        header.column.columnDef.meta?.align == 'right' && 'justify-end',
        className
      )}
      {...rest}
    >
      {canSort ? (
        <Fragment>
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
              <ArrowDown className="size-3" />
            ) : isSorted === 'asc' ? (
              <ArrowUp className="size-3" />
            ) : (
              <ArrowUpDownIcon className="size-3" />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex size-10 cursor-pointer items-center justify-center">
                <MoreVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => header.column.toggleSorting(false)}
                disabled={isSorted === 'asc'}
              >
                <ArrowUp className="text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => header.column.toggleSorting(true)}
                disabled={isSorted === 'desc'}
              >
                <ArrowDown className="text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => header.column.toggleVisibility(false)}
              >
                <EyeOff className="text-muted-foreground/70" />
                Hide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      ) : (
        flexRender(header.column.columnDef.header, header.getContext())
      )}
    </div>
  )
}
