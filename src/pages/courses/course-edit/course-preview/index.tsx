import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import CourseCard from '@/components/course/course-card'
import CoverCard from '@/components/course/cover-card'
import PreviewCard from '@/components/custom/showcase'
import { TabsContent } from '@/components/ui/tabs'

import type { TCourse } from '@/shared/types/models/course'

import CourseEditForm from './course-edit-form'

interface TProps {
  course: TCourse
}

const EditCourseSchema = z.object({
  title: z.string().min(1).optional(),
  desc: z.string().min(1).optional(),
  thumbnail_url: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional()
})

type TParams = z.infer<typeof EditCourseSchema>

export default function CoursePreview(props: TProps) {
  const { course } = props

  const form = useForm<TParams>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {}
  })

  return (
    <TabsContent value="preview" className="flex w-full gap-3">
      <div className="grow space-y-3">
        <PreviewCard title="Hero View">
          <CoverCard course={course} />
        </PreviewCard>

        <PreviewCard title="Card View">
          <CourseCard course={course} />
        </PreviewCard>
      </div>

      <CourseEditForm />
    </TabsContent>
  )
}
