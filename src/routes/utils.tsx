import ProtectedRoutes from './protected'
import PublicRoutes from './public'

export const pageRoutes = [...ProtectedRoutes, ...PublicRoutes]

export const getRouteMeta = (path: string) => {
  return pageRoutes.find((r) => r.path === path)?.meta
}
