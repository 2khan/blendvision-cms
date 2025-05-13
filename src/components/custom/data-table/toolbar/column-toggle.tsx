import { type Column, type Table } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'

import TooltipButton from '@/components/custom/tooltip-button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function ColumnToggle<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const handleSelect = (column: Column<TData>) => () => {
    column.toggleVisibility(!column.getIsVisible())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton size="icon" variant="outline" helper="Toggle Column">
          <EyeIcon />
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="justify-between capitalize"
              onSelect={handleSelect(column)}
              checked={column.getIsVisible()}
            >
              {column.columnDef.meta?.label}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
