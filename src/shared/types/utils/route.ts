import type { RouteObject } from 'react-router-dom'

import type { TIcon } from './icon'
import { TMeta } from './meta'

// TYPE FOR ICON AND LABEL + NATIVE ROUTE OBJECT TYPE
export type TRouteObject = Omit<RouteObject, 'path' | 'children'> & {
  // LABELS FROM i18n
  path: string
  icon?: TIcon
  meta?: TMeta
  children?: TRouteObject[]
}
