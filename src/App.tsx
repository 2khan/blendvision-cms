import { Suspense, lazy } from 'react'

import { LazyMotion } from 'motion/react'
import { Outlet } from 'react-router-dom'

import { ThemeProvider } from './shared/contexts/useTheme'

const loadFeatures = () =>
  import('@/shared/constants/motion').then((m) => m.default)

const TooltipProvider = lazy(() =>
  import('@/components/ui/tooltip').then(({ TooltipProvider }) => ({
    default: TooltipProvider
  }))
)

const Toaster = lazy(() =>
  import('@/components/ui/sonner').then(({ Toaster }) => ({ default: Toaster }))
)

const Meta = lazy(() =>
  import('@/shared/stores/useMeta').then(({ Meta }) => ({ default: Meta }))
)

const CommandPalette = lazy(() => import('@/components/custom/cmd-palette'))

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense>
        <TooltipProvider delayDuration={300}>
          <LazyMotion features={loadFeatures}>
            <Outlet />
          </LazyMotion>
        </TooltipProvider>
      </Suspense>
      <Suspense>
        <Toaster />
      </Suspense>
      <Suspense>
        <Meta />
      </Suspense>
      <Suspense>
        <CommandPalette />
      </Suspense>
    </ThemeProvider>
  )
}
