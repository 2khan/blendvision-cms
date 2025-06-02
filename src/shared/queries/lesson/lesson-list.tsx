import { useQuery } from '@tanstack/react-query'

import type { TCourse } from '@/shared/types/models/course'
import type { TLesson } from '@/shared/types/models/lesson'
import { isValidID } from '@/shared/utils/brand-map'
import { api } from '@/shared/utils/fetch'

export type TResponse = TLesson[]

export const QKEY_LESSON_LIST = 'LESSON_LIST'

export type TRouteParams = { course_id?: TCourse['id'] }

export type TOpts = TRouteParams

export const useLessons = (opts: TOpts) => {
  return useQuery({
    queryKey: [QKEY_LESSON_LIST, opts],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<TResponse>(
        `/admin/courses/${opts.course_id}/lessons`,
        {
          signal
        }
      )
      return data
    },
    enabled: isValidID('course_id', opts.course_id)
  })
}
