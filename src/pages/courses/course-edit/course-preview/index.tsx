import CourseCard from '@/components/course/course-card'
import CoverCard from '@/components/course/cover-card'
import PreviewCard from '@/components/custom/showcase'
import { TabsContent } from '@/components/ui/tabs'

import type { TCourse } from '@/shared/types/models/course'

import CourseEditForm from './course-edit-form'

interface TProps {
  course: TCourse
}

export default function CoursePreview(props: TProps) {
  const { course } = props

  return (
    <TabsContent value="preview" className="flex w-full gap-3">
      <div className="flex flex-col grow gap-3">
        <PreviewCard title="Hero View">
          <CoverCard course={course} />
        </PreviewCard>

        <PreviewCard title="Card View">
          <CourseCard course={course} />
        </PreviewCard>

        <div className="w-full h-80"></div>
      </div>

      <CourseEditForm />
    </TabsContent>
  )
}
