import { z } from 'zod'

import { course_id_schema } from '../types/models/course'
import { lesson_id_schema } from '../types/models/lesson'
import { user_id_schema } from '../types/models/users'

export const ID_SCHEMAS_MAP = {
  course_id: course_id_schema,
  lesson_id: lesson_id_schema,
  user_id: user_id_schema
} as const

export type TIDSchemasMap = typeof ID_SCHEMAS_MAP

export function isValidID<K extends keyof TIDSchemasMap>(
  key: K,
  value: unknown
): value is z.infer<TIDSchemasMap[K]> {
  return ID_SCHEMAS_MAP[key].safeParse(value).success
}
