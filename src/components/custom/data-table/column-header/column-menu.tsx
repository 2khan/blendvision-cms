import { type Header } from '@tanstack/react-table'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeOff,
  FilterIcon,
  MoreVertical
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface TProps<TData, TValue> {
  header: Header<TData, TValue>
}

export default function ColumnMenu<TData, TValue>(
  props: TProps<TData, TValue>
) {
  const { header } = props
  // const canSort = header.column.getCanSort()
  const isSorted = header.column.getIsSorted()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex size-10 cursor-pointer items-center justify-center">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {header.column.columnDef.meta?.label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => header.column.toggleSorting(false)}
            disabled={isSorted === 'asc'}
          >
            <ArrowUpIcon className="text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => header.column.toggleSorting(true)}
            disabled={isSorted === 'desc'}
          >
            <ArrowDownIcon className="text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <FilterIcon className="text-muted-foreground/70" /> Filter
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => header.column.toggleVisibility(false)}
                >
                  <EyeOff className="text-muted-foreground/70" />
                  Hide
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => header.column.toggleVisibility(false)}
          >
            <EyeOff className="text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
