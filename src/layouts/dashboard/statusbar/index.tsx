// UTILS
import { Suspense, lazy } from 'react'

import { SidebarIcon } from 'lucide-react'

import { dx } from '@/lib/dx'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { HEADER_HEIGHT } from '@/shared/constants/layout'
import { useMeta } from '@/shared/stores/useMeta'
import { usePreference } from '@/shared/stores/usePreference'

const ChangeTheme = lazy(() => import('@/components/custom/change-theme'))

export default function StatusBar() {
  const meta = useMeta((s) => s.meta)
  const sidebar_open = usePreference((s) => s.layouts.sidebar_open)
  const { sidebar_toggle } = usePreference((s) => s.handlers)

  return (
    <header
      className="col-span-12 flex shrink-0 items-center justify-between gap-2 border-b px-3 xl:px-6"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={sidebar_toggle} variant="outline" size="icon">
              <SidebarIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {sidebar_open ? 'Close Sidebar' : 'Open Sidebar'}
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
