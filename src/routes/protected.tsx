import type { TRouteObject } from '@/shared/types/utils/route'
import { FileVideoIcon, LayoutDashboardIcon, Users2Icon } from 'lucide-react'

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
  },
  {
    label: 'Course Management',
    icon: FileVideoIcon,
    path: '/course',
    lazy: async () => {
      const { default: Component } = await import('@/pages/course-management')
      return {
        Component
      }
    }
  },
  {
    label: 'User Management',
    icon: Users2Icon,
    path: '/user',
    lazy: async () => {
      const { default: Component } = await import('@/pages/user-management')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default ProtectedRoutes
