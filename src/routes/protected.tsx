import type { TRouteObject } from '@/shared/types/utils/route'
import { LayoutDashboardIcon } from 'lucide-react'

const ProtectedRoutes = [
  {
    label: 'Home',
    icon: LayoutDashboardIcon,
    path: '/',
    lazy: async () => {
      const { default: Component } = await import('@/pages/splash')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default ProtectedRoutes
