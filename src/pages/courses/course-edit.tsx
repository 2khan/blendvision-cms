import { getCourse } from '@/shared/constants/mock'
import { useParams } from 'react-router-dom'

export default function CourseEdit() {
  const { course_id } = useParams()
  const course = getCourse(course_id!)!

  return <div>{course.id}</div>
}
