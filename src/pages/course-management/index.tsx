import CourseCard from '@/components/custom/course-card'

import { MOCK_COURSES } from '@/shared/constants/mock'

export default function CoursePage() {
  return (
    <div className="flex flex-wrap gap-2">
      {MOCK_COURSES.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
