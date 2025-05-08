import CourseCard from '@/components/custom/course-card'
import { TabsContent } from '@/components/ui/tabs'
import { MOCK_COURSES } from '@/shared/constants/mock'

export default function GridView() {
  return (
    <TabsContent
      value="card"
      className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-3"
    >
      {MOCK_COURSES.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </TabsContent>
  )
}
