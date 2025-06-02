import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  QKEY_COURSE_LIST,
  TResponse as TCourseListResponse
} from '@/shared/queries/course/course-list'
import type { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TRouteParams = {
  course_id: TCourse['id']
}

export type TOpts = TRouteParams

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { course_id } = opts
      await api.delete(`/admin/courses/${course_id}`)
    },
    onMutate: async ({ course_id }) => {
      await queryClient.cancelQueries({ queryKey: [QKEY_COURSE_LIST] })

      // 0. Get current data
      const current = queryClient.getQueryData<TCourseListResponse>([
        QKEY_COURSE_LIST
      ])

      // 1. Set new data
      queryClient.setQueryData<TCourseListResponse>([QKEY_COURSE_LIST], (old) =>
        old?.filter((c) => c.id !== course_id)
      )

      return { current }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_COURSE_LIST] })
    },
    onSuccess: () => {
      toast.success('Course has been successfully deleted!')
    },
    onError: (_, __, context) => {
      // 2. If there's an error, fallback to current
      queryClient.setQueryData([QKEY_COURSE_LIST], context?.current)
    }
  })
}
