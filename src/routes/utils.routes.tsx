import { matchPath } from 'react-router-dom'

import ProtectedRoutes from './protected.routes'
import PublicRoutes from './public.routes'

export const pageRoutes = [...ProtectedRoutes, ...PublicRoutes]

export const menuRoutes = ProtectedRoutes.filter((r) =>
  ['/', '/courses', '/users'].includes(r.path)
)

export const getRouteMeta = (path: string) => {
  return pageRoutes.find((r) => matchPath(r.path, path))?.meta
}
