import type { RouteObject } from 'react-router-dom'
import App from '@/App'
import DashboardLayout from '@/layouts/dashboard'

// Routes
import ProtectedRoutes from './protected'
import PublicRoutes from './public'

export const PageRoutes = [...ProtectedRoutes, ...PublicRoutes]

const Routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <DashboardLayout />,
        children: ProtectedRoutes
      },
      {
        children: PublicRoutes
      }
    ]
  }
]

export default Routes
