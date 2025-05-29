// import GridViewCard from '@/components/course/grid-view-card'
import { PlusCircleIcon } from 'lucide-react'

import { dx } from '@/lib/dx'

import GridViewCard from '@/components/course/grid-view-card'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'

import { useCourses } from '@/shared/queries/course/course-list'

import CourseCreateTrigger from './components/course-create-trigger'

export default function GridView() {
  const { data: courses, isSuccess: coursesReady } = useCourses()
  return (
    coursesReady && (
      <TabsContent value="card" className="flex flex-col gap-3">
        <CourseCreateTrigger className="absolute top-0 right-0" />
        {courses.length > 0 ? (
          <div className="grid gap-3 auto-rows-min grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
            {courses.map((course) => (
              <GridViewCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="max-w-lg mx-auto flex flex-col items-center text-center py-10">
            <span className={dx('heading-04', 'mb-1')}>
              Create courses to get started
            </span>
            <p
              className={dx(
                'body-02',
                'mb-10 text-muted-foreground whitespace-pre'
              )}
            >
              {
                'You haven’t created any courses yet.\nClick the button below to start building your first course.'
              }
            </p>

            <div className="flex gap-3">
              <CourseCreateTrigger>
                <Button variant="outline" className="size-60 flex-col">
                  <PlusCircleIcon className="size-10" />
                  Create a new course
                </Button>
              </CourseCreateTrigger>
            </div>
          </div>
        )}
      </TabsContent>
    )
  )
}
