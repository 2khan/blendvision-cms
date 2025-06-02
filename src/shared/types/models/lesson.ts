import { Brand } from '../utils/brand'

type TLessonID = Brand<string | number, 'lesson_id'>

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
