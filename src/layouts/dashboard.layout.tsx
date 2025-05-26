// UTILS
import { Suspense, lazy } from 'react'

import { Outlet } from 'react-router-dom'

import { CONTENT_PADDING } from '@/shared/constants/layout'

// COMPONENTS
const Sidebar = lazy(() => import('./components/side-bar'))
const StatusBar = lazy(() => import('./components/statusbar'))

const TextureBackground = lazy(
  () => import('@/components/custom/texture-background')
)

export default function DashboardLayout() {
  return (
    <div className="flex w-full grow">
      <Suspense>
        <Sidebar />
      </Suspense>
      <div
        className="flex h-screen grow flex-col sm:pl-0"
        style={{ padding: CONTENT_PADDING }}
      >
        <main className="relative bg-background border z-0 flex grow flex-col overflow-hidden rounded-2xl">
          <Suspense>
            <StatusBar />
          </Suspense>
          <div className="w-full grow overflow-y-auto px-3 py-2 xl:px-6 xl:py-4">
            <Outlet />
          </div>
          <Suspense>
            <TextureBackground />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
