export type TCourse = {
  id: string | number
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
