import { z } from 'zod'

import { id_schema } from '../utils/brand'

export const lesson_id_schema = id_schema.brand<'lesson_id'>()
export type TLessonID = z.infer<typeof lesson_id_schema>

export type TLesson = {
  id: TLessonID
  title: string
  description: string
  order: number
  img_url: string
  thumbnail_url: string
  video_url: string
  duration: number
  created_at: string
}
