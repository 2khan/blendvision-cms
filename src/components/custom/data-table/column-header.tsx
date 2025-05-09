import { flexRender, type Header, type Table } from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDownIcon,
  EyeOff,
  MoreVertical
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = header.column.getCanSort()
  const isSorted = header.column.getIsSorted()

  if (!canSort) {
    return flexRender(header.column.columnDef.header, header.getContext())
  }

  return (
    <div className={cn('-ml-2 flex items-center justify-between', className)}>
      <button
        className="data-[state=open]:bg-accent hover:bg-accent flex h-10 grow items-center justify-between gap-3 px-2"
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
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent rounded-full"
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
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
    </div>
  )
}
