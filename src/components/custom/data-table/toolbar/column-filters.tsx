import { Fragment, useCallback, useMemo } from 'react'

import type { Column, Table } from '@tanstack/react-table'
import { flatten, sortedUniq, uniq } from 'lodash'
import { PlusCircleIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'

interface TProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
}

export default function ColumnFilters<TData>(props: TProps<TData>) {
  const { table } = props
  const isFiltered = table.getState().columnFilters.length > 0

  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  )

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className="grow flex gap-2 items-center flex-wrap"
    >
      {columns.map((c) => (
        <FilterItem key={c.id} column={c} />
      ))}
      {isFiltered && (
        <Button
          aria-label="Reset filters"
          variant="outline"
          size="sm"
          className="border-dashed"
          onClick={onReset}
        >
          <XIcon />
          Reset
        </Button>
      )}
    </div>
  )
}

function FilterItem<TData>({ column }: { column: Column<TData> }) {
  const meta = column.columnDef.meta
  const uniqueValues = column.getFacetedUniqueValues()

  const sortedUniqueValues = useMemo(() => {
    if (
      meta?.filterVariant === 'select' ||
      meta?.filterVariant === 'multiselect'
    ) {
      return sortedUniq(flatten(Array.from(uniqueValues.keys())).sort())
    }

    return Array.from(uniqueValues.keys()).sort()
  }, [uniqueValues, meta?.filterVariant])

  const columnFilterValue = column.getFilterValue()

  console.log(columnFilterValue)

  return (
    meta?.filterVariant && (
      <Fragment>
        {meta.filterVariant === 'text' && (
          <Input
            placeholder={meta.placeholder}
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(event) => column.setFilterValue(event.target.value)}
            className="h-8 w-56"
          />
        )}
        {meta.filterVariant === 'select' ||
          (meta.filterVariant === 'multiselect' && (
            <Select
              value={(columnFilterValue ?? '') as string}
              onValueChange={(value) => column.setFilterValue(value)}
            >
              <SelectTrigger>
                <PlusCircleIcon />
                Tags
              </SelectTrigger>
              <SelectContent>
                {sortedUniqueValues.map((value) => (
                  <SelectItem key={value} value={value} className="capitalize">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
      </Fragment>
    )
  )
}
