import { NavLink } from 'react-router-dom'

import { dx } from '@/lib/dx'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { NAV_ITEM_HEIGHT } from '@/shared/constants/layout'
import type { TMeta } from '@/shared/types/utils/meta'

interface TProps {
  path: string
  meta: TMeta
  symbol?: React.ReactNode
}

export default function SideNavItem(props: TProps) {
  const { meta, path, symbol } = props
  return (
    <NavLink end to={path} style={{ height: NAV_ITEM_HEIGHT }}>
      {({ isActive }) => (
        <Tooltip disableHoverableContent={isActive} delayDuration={1000}>
          <TooltipTrigger asChild>
            <div
              className={dx(
                'body-compact-01',
                'text-muted-foreground group-hover:text-primary flex h-full w-full items-center gap-2 p-2',
                isActive &&
                  'bg-background text-foreground rounded-md font-medium border'
              )}
            >
              {symbol && <div className="w-5 shrink-0">{symbol}</div>}
              <div className="line-clamp-1">{meta.title}</div>
            </div>
          </TooltipTrigger>
          {meta.description && (
            <TooltipContent side="right">{meta.description}</TooltipContent>
          )}
        </Tooltip>
      )}
    </NavLink>
  )
}
