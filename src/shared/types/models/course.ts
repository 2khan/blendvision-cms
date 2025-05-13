export type TLesson = {
  id: string
  title: string
  desc: string
  duration: string
  order: number
  thumbnail_url: string
  video_url: string
}

export type TCourse = {
  id: string
  title: string
  desc: string // keep at 120 chars
  thumbnail_url: string
  net_duration: string
  student_count: number
  tags: string[]
  is_new: boolean
  lessons: TLesson[]
}
