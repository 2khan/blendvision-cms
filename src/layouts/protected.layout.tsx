import { Navigate, Outlet } from 'react-router-dom'

import LoadingScreen from '@/components/custom/loading-screen'

import { useAuth } from '@/shared/contexts/useAuth'

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth()

  return isLoading ? (
    <LoadingScreen />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  )
}
