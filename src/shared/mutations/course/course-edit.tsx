import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { QKEY_COURSE_DETAIL } from '@/shared/queries/course/course-detail'
import { useUpload } from '@/shared/queries/upload-queue'
import type { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TResponse = TCourse

export const EditCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnails: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string()
      })
    )
    .length(1)
    .optional(),
  tags: z.array(z.string()).nonempty().optional()
})

export type TParams = z.infer<typeof EditCourseSchema>
export type TRouteParams = { course_id: number }
export type TOpts = TParams & TRouteParams

export const useEditCourse = () => {
  const { mutate } = useUpload()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { course_id, ...rest } = opts
      const { thumbnails, ...params } = EditCourseSchema.parse(rest)

      // If user inputs a file, send to upload queue
      if (thumbnails && thumbnails.length > 0) {
        // 0. Prepare file (safe to index due to Zod)
        const { file } = thumbnails[0]

        // 1. Send file to the upload queue
        mutate(
          {
            context: 'course_thumbnail',
            file
          },
          {
            onSuccess: async ({ original, thumbnail }) => {
              await api.put<TResponse>(`/admin/courses/${course_id}`, {
                ...params,
                img_url: original,
                thumbnail_url: thumbnail
              })

              queryClient.invalidateQueries({
                queryKey: [QKEY_COURSE_DETAIL, { course_id }]
              })
            }
          }
        )

        return
      }

      // If no file inputs, send to API
      const { data } = await api.put<TResponse>(
        `/admin/courses/${course_id}`,
        params
      )

      queryClient.invalidateQueries({
        queryKey: [QKEY_COURSE_DETAIL, { course_id }]
      })

      return data
    }
  })
}
