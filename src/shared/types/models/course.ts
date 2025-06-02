import { z } from 'zod'

import { id_schema } from '../utils/brand'

export const course_id_schema = id_schema.brand<'course_id'>()
export type TCourseID = z.infer<typeof course_id_schema>

export type TCourse = {
  id: TCourseID
  title: string
  description: string // keep at 120 chars
  img_url: string
  thumbnail_url: string
  duration: number
  lesson_count: number
  student_count: number
  is_new: boolean
  created_at: string
  tags: string[]
}
