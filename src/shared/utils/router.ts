import { type RouteObject, useParams } from 'react-router-dom'
import { z } from 'zod'

import type { TIcon } from '@/shared/types/utils/icon'

import { ID_SCHEMAS_MAP, TIDSchemasMap } from './brand-map'

export type TMeta = {
  title?: string
  description?: string
}

// TYPE FOR ICON AND LABEL + NATIVE ROUTE OBJECT TYPE
export type TRouteObject = Omit<RouteObject, 'path' | 'children'> & {
  // LABELS FROM i18n
  path: string
  icon?: TIcon
  meta?: TMeta
  children?: TRouteObject[]
}

// Bringing type safety to parsing various ids from params

export function useIDParams<K extends keyof TIDSchemasMap>(
  key: K
): z.infer<TIDSchemasMap[K]> {
  const params = useParams()
  const value = params[key]
  return ID_SCHEMAS_MAP[key].parse(value)
}
