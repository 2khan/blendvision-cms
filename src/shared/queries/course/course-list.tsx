import { useQuery } from '@tanstack/react-query'

import { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TResponse = TCourse[]

export const QKEY_COURSE_LIST = 'COURSE_LIST'

export const useCourses = () => {
  return useQuery({
    queryKey: [QKEY_COURSE_LIST],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<TResponse>('/admin/courses', {
        signal
      })
      return data
    }
  })
}
