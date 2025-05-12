import {
  GraduationCapIcon,
  LayoutDashboardIcon,
  Users2Icon
} from 'lucide-react'

import type { TRouteObject } from '@/shared/types/utils/route'

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
      const { default: Component } = await import('@/pages/courses/course-list')
      return {
        Component
      }
    }
  },
  {
    meta: { title: 'Edit Course' },
    icon: GraduationCapIcon,
    path: '/courses/:course_id',
    lazy: async () => {
      const { default: Component } = await import('@/pages/courses/course-edit')
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
    path: '/users',
    lazy: async () => {
      const { default: Component } = await import('@/pages/users/user-list')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default ProtectedRoutes
