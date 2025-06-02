import { Fragment, Suspense, lazy, useCallback } from 'react'

import { FilmIcon, GalleryThumbnailsIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useCourse } from '@/shared/queries/course/course-detail'
import { usePreference } from '@/shared/stores/usePreference'
import { useIDParams } from '@/shared/utils/router'

const CoursePreview = lazy(() => import('./preview.tab'))
const CourseLessons = lazy(() => import('./lessons.tab'))

export default function CourseEdit() {
  const course_id = useIDParams('course_id')

  const detail_view = usePreference((s) => s.course.detail_view)
  const { course_set_detail_view } = usePreference((s) => s.handlers)
  const [searchParams, setSearchParams] = useSearchParams({
    // Initial value as user preference
    tab: detail_view
  })

  const tabValue = searchParams.get('tab')!

  const { data: course, isSuccess: courseReady } = useCourse({
    course_id
  })

  const handleTabChange = useCallback(
    (value: string) => {
      setSearchParams({ tab: value })
      course_set_detail_view(value)
    },
    [setSearchParams, course_set_detail_view]
  )

  return (
    <Tabs
      className="flex flex-col gap-3 relative"
      value={tabValue}
      onValueChange={handleTabChange}
    >
      <TabsList>
        <TabsTrigger value="course">
          <GalleryThumbnailsIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="lessons">
          <FilmIcon />
          Lessons
        </TabsTrigger>
      </TabsList>
      {courseReady && (
        <Fragment>
          <Suspense>
            <CoursePreview course={course} />
          </Suspense>
          <Suspense>
            <CourseLessons course={course} />
          </Suspense>
        </Fragment>
      )}
    </Tabs>
  )
}
