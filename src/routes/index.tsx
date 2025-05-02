import type { RouteObject } from 'react-router-dom'
import App from '@/App'
import DashboardLayout from '@/layouts/dashboard'

// Routes
import ProtectedRoutes from './protected'

const Routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <DashboardLayout />,
        children: ProtectedRoutes
      },
      {
        path: '*',
        lazy: async () => {
          const { default: Component } = await import('@/pages/404')
          return {
            Component
          }
        }
      }
    ]
  }
]

export default Routes
