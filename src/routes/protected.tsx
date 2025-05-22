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
      const { default: Component } = await import('@/pages/home/home.page')
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
        '@/pages/course-list/course-list.page'
      )
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
      const { default: Component } = await import('@/pages/course/course.page')
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
      const { default: Component } = await import('@/pages/users/users.page')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default ProtectedRoutes
