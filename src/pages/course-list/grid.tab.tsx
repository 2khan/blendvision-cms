// import GridViewCard from '@/components/course/grid-view-card'
import { PlusCircleIcon } from 'lucide-react'

import { dx } from '@/lib/dx'

import GridViewCard from '@/components/course/grid-view-card'
import { TabsContent } from '@/components/ui/tabs'

import { useCourses } from '@/shared/queries/course/course-list'

export default function GridView() {
  const { data: courses, isSuccess: coursesReady } = useCourses()
  return (
    coursesReady && (
      <TabsContent value="card" className="flex flex-col">
        {
          <div className="max-w-lg mx-auto flex flex-col items-center text-center">
            <span className={dx('fluid-heading-04', 'mb-4')}>
              Create courses to get started
            </span>
            <p className={dx('fluid-paragraph-01', 'mb-4')}>
              You haven’t created any courses yet. Click the button below to
              start building your first course.
            </p>

            <button>
              <PlusCircleIcon />

              <span>Create a new course</span>
              <span>Create a new course</span>
            </button>
          </div>
        }
        <div className="grid gap-3 auto-rows-min grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {courses.map((course) => (
            <GridViewCard key={course.id} course={course} />
          ))}
        </div>
      </TabsContent>
    )
  )
}
