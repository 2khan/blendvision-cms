import { type ReactNode, createContext, use } from 'react'

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
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  SortableContext as DndKitSortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { once } from 'lodash'
import { GripVerticalIcon } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'

import { cn } from '@/lib/utils'

export type TGrabStrategy = 'handle' | 'full' | 'both'

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
  items: T[]
  onItemsChange: (items: T[]) => void
  strategy: 'vertical' | 'horizontal'
}

const createSortableContext = once(<T extends BaseItem>() =>
  createContext<TSortableContext<T>>({
    items: [],
    onItemsChange: () => {},
    strategy: 'vertical'
  })
)

export function SortableProvider<T extends BaseItem>({
  items,
  onItemsChange,
  children,
  strategy = 'vertical'
}: SortableProviderProps<T>) {
  const SortableContext = createSortableContext<T>()
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
        modifiers={[restrictToParentElement]}
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

export function useSortableContext<T extends BaseItem>() {
  const context = use(createSortableContext<T>())
  if (!context) {
    throw new Error('useSortableContext must be used within a SortableProvider')
  }
  return context
}

interface SortableItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier
  children: React.ReactNode
  grabStrategy?: TGrabStrategy
  disabled?: boolean
}

export function SortableItem({
  id,
  children,
  className,
  grabStrategy = 'full',
  disabled = false,
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

  const fullEnabled = ['both', 'full'].includes(grabStrategy) && !disabled

  const handleEnabled = ['both', 'handle'].includes(grabStrategy) && !disabled

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group w-full grid grid-cols-[auto_max-content]',
        fullEnabled && 'cursor-grab',
        isDragging && 'cursor-grabbing select-none',
        handleEnabled && 'gap-3',
        className
      )}
      {...(fullEnabled ? { ...attributes, ...listeners } : attributes)}
      {...props}
    >
      <div
        className={cn(
          'grow',
          !disabled && 'hover:opacity-50',
          isDragging && 'opacity-50'
        )}
      >
        {children}
      </div>
      <AnimatePresence>
        {handleEnabled && (
          <m.div
            key="handler"
            initial={{ opacity: 0, width: 0, x: 12 }}
            animate={{ opacity: 1, width: 40, x: 0 }}
            exit={{ opacity: 0, width: 0, x: 12 }}
            className="cursor-grab flex items-center justify-center touch-none h-full 1group-hover:bg-muted shadow-block bg-background border rounded-lg text-muted-foreground group-hover:text-accent-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="size-5" />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SortableListProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[]
  onItemsChange: (items: T[]) => void
  renderItem: (item: T) => ReactNode
  strategy?: 'vertical' | 'horizontal'
  grabStrategy?: TGrabStrategy
  disabled?: boolean
}

export function SortableList<T extends BaseItem>({
  items,
  onItemsChange,
  renderItem,
  strategy = 'vertical',
  grabStrategy = 'full',
  className,
  disabled = false,
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
          strategy === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-4',
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            disabled={disabled}
            grabStrategy={grabStrategy}
          >
            {renderItem(item)}
          </SortableItem>
        ))}
      </div>
    </SortableProvider>
  )
}
