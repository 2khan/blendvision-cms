import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { QKEY_COURSE_DETAIL } from '@/shared/queries/course/course-detail'
import { api } from '@/shared/utils/fetch'

export type TResponse = unknown // TODO: Must be aligned with API

export const EditCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  thumbnails: z.array(
    z.object({
      file: z.instanceof(File),
      preview: z.string()
    })
  ),
  tags: z.array(z.string())
})

export type TParams = z.infer<typeof EditCourseSchema>
export type TRouteParams = { course_id: number }
export type TOpts = TParams & TRouteParams

export const useCourseEdit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { course_id, ...rest } = opts
      const params = EditCourseSchema.parse(rest)
      const { data } = await api.put<TResponse>(
        `/api/courses/${course_id}`, // TODO: Must be aligned with API
        params
      )
      return data
    },
    onSettled: (res, err, opts) => {
      const { course_id } = opts
      queryClient.invalidateQueries({
        queryKey: [QKEY_COURSE_DETAIL, course_id]
      })
    }
  })
}
