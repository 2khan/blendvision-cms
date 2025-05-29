import { GalleryThumbnailsIcon, SettingsIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useCourse } from '@/shared/queries/course/course-detail'
import { usePreference } from '@/shared/stores/usePreference'

import CoursePreview from './preview.tab'

export default function CourseEdit() {
  const detail_view = usePreference((s) => s.course.detail_view)
  const { course_set_detail_view } = usePreference((s) => s.handlers)
  // TODO: We should validate if course_id is passed in the router config
  const { course_id } = useParams()
  const { data: course, isSuccess: courseReady } = useCourse({
    course_id
  })

  return (
    <Tabs
      className="flex flex-col gap-3"
      value={detail_view}
      onValueChange={course_set_detail_view}
    >
      <TabsList>
        <TabsTrigger value="preview">
          <GalleryThumbnailsIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="form">
          <SettingsIcon />
          Settings
        </TabsTrigger>
      </TabsList>
      {courseReady && <CoursePreview course={course} />}
    </Tabs>
  )
}
