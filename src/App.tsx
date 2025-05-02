import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LazyMotion } from 'motion/react'
import { ThemeProvider } from './shared/contexts/useTheme'

// Stores
// import { useStatusbar } from './shared/stores/useStatusbar'

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
    </ThemeProvider>
  )
}
