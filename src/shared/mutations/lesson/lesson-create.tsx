import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { QKEY_LESSON_LIST } from '@/shared/queries/lesson/lesson-list'
import type { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TResponse = TCourse

export const CreateLessonSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
})

export type TParams = z.infer<typeof CreateLessonSchema>
export type TRouteParams = { course_id: TCourse['id'] }
export type TOpts = TParams & TRouteParams

export const useCreateLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { course_id, ...rest } = opts
      await api.post<TResponse>(`/admin/courses/${course_id}/lessons`, rest)
    },
    onSettled: (_, __, { course_id }) => {
      queryClient.invalidateQueries({
        queryKey: [QKEY_LESSON_LIST, { course_id }]
      })
    }
  })
}
