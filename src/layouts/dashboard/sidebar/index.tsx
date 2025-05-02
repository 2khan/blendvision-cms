import { lazy, Suspense } from 'react'

// UTILS
import { useSidebar } from '@/shared/stores/useSidebar'
import { cn } from '@/lib/utils'
import { SIDE_OPEN_W } from '@/shared/constants/layout'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnimatePresence, m } from 'motion/react'

const SidebarHeader = lazy(() => import('./header'))
const SideNav = lazy(() => import('../side-nav'))
const SidebarFooter = lazy(() => import('./footer'))

export default function Sidebar() {
  const { isOpen } = useSidebar()

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
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
          <ScrollArea
            className="w-full grow py-2 xl:py-4"
            // Show shadow in overflow hidden
            // viewportClassName="-m-1 p-1"
          >
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
