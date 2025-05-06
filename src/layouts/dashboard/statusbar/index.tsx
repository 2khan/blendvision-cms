import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// UTILS
import { dx } from '@/lib/dx'
import { HEADER_HEIGHT } from '@/shared/constants/layout'

import { lazy, Suspense } from 'react'
import { SidebarIcon } from 'lucide-react'
import { useSidebar } from '@/shared/stores/useSidebar'
import { Button } from '@/components/ui/button'
import { useMeta } from '@/shared/stores/useMeta'

const ChangeTheme = lazy(() => import('@/components/custom/change-theme'))

export default function StatusBar() {
  const meta = useMeta((s) => s.meta)
  const isOpen = useSidebar((s) => s.isOpen)
  const { toggle } = useSidebar((s) => s.handlers)

  return (
    <header
      className="col-span-12 flex shrink-0 items-center justify-between gap-2 border-b px-3 xl:px-6"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggle} variant="outline" size="icon">
              <SidebarIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-col gap-0.5">
          {meta.title && (
            <h1 className={dx('heading-compact-01')}>{meta.title}</h1>
          )}
          {meta.description && (
            <span className={dx('label-01', 'text-muted-foreground')}>
              {meta.description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Suspense>
          <ChangeTheme />
        </Suspense>
      </div>
    </header>
  )
}
