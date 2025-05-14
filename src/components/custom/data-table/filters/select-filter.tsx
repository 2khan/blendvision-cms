import { useCallback, useMemo, useState } from 'react'

import type { Column } from '@tanstack/react-table'
import { flatten, sortedUniq } from 'lodash'
import { CheckIcon, FilterXIcon, PlusCircleIcon } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { normalizeArray } from '@/shared/utils/array'

interface TProps<TData> {
  // table: Table<TData>
  column: Column<TData>
}

export default function SelectFilter<TData>(props: TProps<TData>) {
  const { column } = props

  const [open, setOpen] = useState(false)

  const meta = useMemo(() => column.columnDef.meta, [column])

  const uniqOptions = useMemo(
    () =>
      sortedUniq(
        flatten(Array.from(column.getFacetedUniqueValues().keys())).sort()
      ),
    [column]
  )

  const selectedOptions = normalizeArray(column.getFilterValue())

  const onSelect = useCallback(
    (option: string) => {
      const values = normalizeArray(column.getFilterValue())

      // if value is already selected, we remove
      if (values.includes(option)) {
        column.setFilterValue(values.filter((v) => v !== option))
      } else {
        // value wasn't selected? we add

        // if variant is not "multiselect", single item
        column.setFilterValue(
          meta?.filterVariant === 'multiselect'
            ? values.concat(option)
            : [option]
        )
      }
    },
    [column, meta]
  )

  const reset = useCallback(() => column.setFilterValue([]), [column])

  const isSelected = useCallback(
    (option: string) => {
      const values = normalizeArray(column.getFilterValue())
      return values.includes(option)
    },
    [column]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="border-dashed"
        >
          {selectedOptions.length === 0 && <PlusCircleIcon />}
          {meta?.label}

          {selectedOptions.length > 0 && (
            <Fragment>
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4"
              />

              {selectedOptions.length > 2 ? (
                <Badge variant="secondary">
                  {selectedOptions.length} Selected
                </Badge>
              ) : (
                selectedOptions.map((option) => (
                  <Badge key={option} variant="secondary">
                    {option}
                  </Badge>
                ))
              )}
            </Fragment>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${meta?.label}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {uniqOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={onSelect}
                  className="capitalize"
                >
                  <CheckIcon
                    className={cn(
                      'mr-2',
                      isSelected(option) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {selectedOptions.length > 0 && (
          <>
            <Separator />
            <div className="p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={reset}
              >
                <FilterXIcon />
                Clear filters
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
