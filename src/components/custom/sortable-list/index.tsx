import type * as React from 'react'
import { type ReactNode, createContext, useContext } from 'react'

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext as DndKitSortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVerticalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BaseItem {
  id: UniqueIdentifier
}

interface SortableProviderProps<T> {
  items: T[]
  onItemsChange: (items: T[]) => void
  children: ReactNode
  strategy?: 'vertical' | 'horizontal'
}

type TSortableContext<T> = {
  items: T
  onItemsChange: (items: T[]) => void
  strategy: 'vertical' | 'horizontal'
}

const SortableContext = createContext<TSortableContext<T>>({
  items: [],
  onItemsChange: () => {},
  strategy: 'vertical'
})

export function SortableProvider<T extends BaseItem>({
  items,
  onItemsChange,
  children,
  strategy = 'vertical'
}: SortableProviderProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      const newItems = arrayMove(items, oldIndex, newIndex)
      onItemsChange(newItems)
    }
  }

  return (
    <SortableContext.Provider
      value={{
        items,
        onItemsChange,
        strategy
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <DndKitSortableContext
          items={items}
          strategy={
            strategy === 'vertical'
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {children}
        </DndKitSortableContext>
      </DndContext>
    </SortableContext.Provider>
  )
}

export const useSortableContext = () => {
  const context = useContext(SortableContext)
  if (!context) {
    throw new Error('useSortableContext must be used within a SortableProvider')
  }
  return context
}

interface SortableItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier
  children: ReactNode
  dragHandle?: boolean
}

export function SortableItem({
  id,
  children,
  className,
  dragHandle = false,
  ...props
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('relative', isDragging && 'opacity-50', className)}
      {...(!dragHandle ? { ...attributes, ...listeners } : {})}
      {...props}
    >
      {dragHandle ? (
        <div className="flex items-center gap-2">
          <div
            className="cursor-grab touch-none p-1"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

interface SortableListProps<T extends BaseItem>
  extends React.HTMLAttributes<HTMLDivElement> {
  items: T[]
  onItemsChange: (items: T[]) => void
  renderItem: (item: T) => ReactNode
  strategy?: 'vertical' | 'horizontal'
  dragHandle?: boolean
}

export function SortableList<T extends BaseItem>({
  items,
  onItemsChange,
  renderItem,
  strategy = 'vertical',
  className,
  dragHandle = false,
  ...props
}: SortableListProps<T>) {
  return (
    <SortableProvider
      items={items}
      onItemsChange={onItemsChange}
      strategy={strategy}
    >
      <div
        className={cn(
          'flex',
          strategy === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4',
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} dragHandle={dragHandle}>
            {renderItem(item)}
          </SortableItem>
        ))}
      </div>
    </SortableProvider>
  )
}
