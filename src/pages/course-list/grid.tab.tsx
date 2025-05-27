import GridViewCard from '@/components/course/grid-view-card'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'

import { useCourses } from '@/shared/queries/course/course-list'

export default function GridView() {
  const { data: courses, isSuccess: coursesReady } = useCourses()
  return (
    coursesReady && (
      <TabsContent
        value="card"
        className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-3 auto-rows-min"
      >
        {courses.map((course) => (
          <GridViewCard key={course.id} course={course} />
        ))}

        <Card className="bg-muted border border-dashed">
          <CardHeader>
            <CardTitle>Create Course</CardTitle>
            <CardDescription>Create Course</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    )
  )
}
