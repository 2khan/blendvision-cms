import { useQuery } from '@tanstack/react-query'

import { TCourse } from '@/shared/types/models/course'
import { isValidID } from '@/shared/utils/brand-map'
import { api } from '@/shared/utils/fetch'

export type TResponse = TCourse

export const QKEY_COURSE_DETAIL = 'COURSE_DETAIL'

export type TRouteParams = { course_id?: TCourse['id'] }

export type TOpts = TRouteParams

export const useCourse = (opts: TOpts) => {
  return useQuery({
    queryKey: [QKEY_COURSE_DETAIL, opts],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<TResponse>(
        `/admin/courses/${opts.course_id}`,
        {
          signal
        }
      )
      return data
    },
    enabled: isValidID('course_id', opts.course_id)
  })
}
