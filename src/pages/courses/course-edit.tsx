import { useParams } from 'react-router-dom'

import { dx } from '@/lib/dx'

import { ProgressiveBlur } from '@/components/custom/progressive-blur'
import { Badge } from '@/components/ui/badge'

import { getCourse } from '@/shared/constants/mock'
import { secondsToHours } from '@/shared/utils/date'

export default function CourseEdit() {
  // TODO: We should validate if course_id is passed in the router config
  const { course_id } = useParams()
  // FIXME: HACK! Typescript warns here because course_id can be undefined
  const course = getCourse(course_id!)!

  return (
    <div className="flex z-0 relative p-3 h-[31.25rem] max-w-7xl items-center justify-center text-foreground dark font-client">
      <img
        src={course.thumbnail_url}
        alt="Course Thumbnail"
        className="absolute inset-0 w-full object-cover -z-10 h-full rounded-3xl"
      />
      <ProgressiveBlur className="w-full h-full absolute -z-10 rounded-3xl" />
      <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-t from-black/50 rounded-3xl" />

      <div className="text-center flex flex-col items-center">
        <h1 className={dx('fluid-display-03', 'mb-1.5')}>{course.title}</h1>
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-background">
              {tag}
            </Badge>
          ))}
        </div>
        <p className={dx('body-02', 'mb-3')}>{course.desc}</p>
        <div className="flex gap-3">
          <div
            className={dx('label-02', 'flex items-center font-semibold gap-1')}
          >
            {secondsToHours(course.net_duration).toFixed(1)} total hours
          </div>
          <div
            className={dx('label-02', 'flex items-center font-semibold gap-1')}
          >
            {course.lessons.length} lessons
          </div>
          <div
            className={dx('label-02', 'flex items-center font-semibold gap-1')}
          >
            {course.student_count}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
