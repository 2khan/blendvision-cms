import type { TRouteObject } from '@/shared/types/utils/route'
import {
  LayoutDashboardIcon,
  Users2Icon,
  GraduationCapIcon
} from 'lucide-react'

const ProtectedRoutes = [
  {
    meta: { title: 'Home' },
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
    meta: { title: 'Course Management' },
    icon: GraduationCapIcon,
    path: '/courses',
    lazy: async () => {
      const { default: Component } = await import(
        '@/pages/course/course-management'
      )
      return {
        Component
      }
    }
  },
  {
    meta: {
      title: 'User Management',
      description: 'Create and update user accounts'
    },
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
