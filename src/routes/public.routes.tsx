import type { TRouteObject } from '@/shared/utils/router'

const PublicRoutes = [
  {
    path: '/login',
    lazy: async () => {
      const { default: Component } = await import('@/pages/auth/login.page')
      return {
        Component
      }
    },
    meta: {
      title: 'Login'
    }
  },
  {
    path: '*',
    lazy: async () => {
      const { default: Component } = await import('@/pages/404')
      return {
        Component
      }
    },
    meta: {
      title: 'Not Found'
    }
  }
] as const satisfies TRouteObject[]

export default PublicRoutes
