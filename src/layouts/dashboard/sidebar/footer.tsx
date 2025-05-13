import { CaretSortIcon, ExitIcon } from '@radix-ui/react-icons'
import { UserRound } from 'lucide-react'

import { dx } from '@/lib/dx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { CONTENT_PADDING, SIDE_OPEN_W } from '@/shared/constants/layout'

export default function SidebarFooter() {
  const handleSignout = () => {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background flex w-full shrink-0 items-center gap-2 rounded-2xl p-2 shadow-block border">
        <div className="bg-card flex size-7 shrink-0 items-center justify-center rounded-full">
          <UserRound />
        </div>
        <div className="flex grow flex-col items-start text-start">
          <span
            className={dx(
              'heading-compact-01',
              'line-clamp-1 break-all uppercase'
            )}
          >
            Organization Name
          </span>
        </div>
        <CaretSortIcon className="shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className="rounded-2xl"
        style={{ minWidth: SIDE_OPEN_W - CONTENT_PADDING }}
      >
        <DropdownMenuGroup className="p-1">
          <div className="flex w-full items-center gap-2 p-1">
            <UserRound />
            <span
              className={dx(
                'heading-compact-01',
                'line-clamp-1 break-all uppercase'
              )}
            >
              Organization Name
            </span>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleSignout}
            variant="destructive"
            className="justify-between gap-2 rounded-lg"
          >
            Log Out
            <ExitIcon className="text-current" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
