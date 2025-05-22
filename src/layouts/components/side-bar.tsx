import { Suspense, lazy } from 'react'

import { AnimatePresence, m } from 'motion/react'

import { cn } from '@/lib/utils'

import { ScrollArea } from '@/components/ui/scroll-area'

import { SIDE_OPEN_W } from '@/shared/constants/layout'
import { usePreference } from '@/shared/stores/usePreference'

// UTILS

const SidebarHeader = lazy(() => import('./side-bar-header'))
const SideNav = lazy(() => import('./side-nav'))
const SidebarFooter = lazy(() => import('./side-bar-footer'))

export default function Sidebar() {
  const sidebar_open = usePreference((s) => s.layouts.sidebar_open)

  return (
    <AnimatePresence initial={false}>
      {sidebar_open && (
        <m.aside
          key="sidebar"
          className={cn(
            'relative flex h-screen w-full shrink-0 grow flex-col py-2 pl-2'
          )}
          initial={{ maxWidth: 0 }}
          animate={{
            maxWidth: SIDE_OPEN_W
          }}
          exit={{
            maxWidth: 0
          }}
          transition={{ duration: 0.15 }}
        >
          <Suspense>
            <SidebarHeader />
          </Suspense>
          <ScrollArea className="w-full grow py-2 xl:py-4">
            <Suspense>
              <SideNav />
            </Suspense>
          </ScrollArea>

          <Suspense>
            <SidebarFooter />
          </Suspense>
        </m.aside>
      )}
    </AnimatePresence>
  )
}
