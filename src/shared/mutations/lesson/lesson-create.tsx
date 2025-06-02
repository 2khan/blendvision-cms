import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { QKEY_LESSON_LIST } from '@/shared/queries/lesson/lesson-list'
import { useUpload } from '@/shared/queries/upload-queue'
import type { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TResponse = TCourse

export const CreateCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnails: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string()
      })
    )
    .length(1),
  video_url: z.string().min(1),
  duration: z.number()
})

export type TParams = z.infer<typeof CreateCourseSchema>
export type TRouteParams = { course_id: TCourse['id'] }
export type TOpts = TParams

export const useCreateLesson = () => {
  const { mutate } = useUpload()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { thumbnails, ...params } = CreateCourseSchema.parse(opts)

      // 0. Prepare file (safe to index due to Zod)
      const { file } = thumbnails[0]

      // 1. Send file to the upload queue
      mutate(
        {
          context: 'lesson_thumbnail',
          file
        },
        {
          onSuccess: async ({ original, thumbnail }) => {
            await api.post<TResponse>('/admin/courses', {
              title: params.title,
              description: params.description,
              img_url: original,
              thumbnail_url: thumbnail
            })

            queryClient.invalidateQueries({ queryKey: [QKEY_LESSON_LIST] })
          }
        }
      )

      return
    }
  })
}
