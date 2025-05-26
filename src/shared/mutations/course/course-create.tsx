import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { QKEY_COURSE_LIST } from '@/shared/queries/course/course-list'
import { api } from '@/shared/utils/fetch'

export type TResponse = unknown // TODO: Must be aligned with API

export const CreateCourseSchema = z.object({
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

export type TParams = z.infer<typeof CreateCourseSchema>
export type TOpts = TParams

export const useCourseCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const params = CreateCourseSchema.parse(opts)
      const { data } = await api.put<TResponse>('/api/courses/', params)
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_COURSE_LIST] })
    }
  })
}
