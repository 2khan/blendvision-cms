import App from '@/App'
import type { RouteObject } from 'react-router-dom'

import DashboardLayout from '@/layouts/dashboard.layout'
import ProtectedLayout from '@/layouts/protected.layout'

// Routes
import ProtectedRoutes from './protected'
import PublicRoutes from './public'

const Routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <DashboardLayout />,
            children: ProtectedRoutes
          }
        ]
      },

      {
        children: PublicRoutes
      }
    ]
  }
]

export default Routes
