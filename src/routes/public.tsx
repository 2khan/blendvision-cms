import type { TRouteObject } from '@/shared/types/utils/route'

const PublicRoutes = [
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
