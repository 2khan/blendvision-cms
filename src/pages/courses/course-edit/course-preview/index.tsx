import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import CourseCard from '@/components/course/course-card'
import CoverCard from '@/components/course/cover-card'
import Showcase from '@/components/custom/showcase'
import { Form } from '@/components/ui/form'
import { TabsContent } from '@/components/ui/tabs'

import { EditCourseSchema } from '@/shared/mutations/useCourseEdit'
import type { TCourse } from '@/shared/types/models/course'

import CourseEditForm from './course-edit-form'

interface TProps {
  course: TCourse
}

type TParams = z.infer<typeof EditCourseSchema>

export default function CoursePreview(props: TProps) {
  const { course } = props

  const form = useForm<TParams>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      title: '',
      desc: '',
      tags: []
    }
  })

  return (
    <Form {...form}>
      <TabsContent value="preview" className="flex w-full gap-6">
        <div className="grow space-y-3">
          <Showcase title="Hero View">
            <CoverCard course={course} />
          </Showcase>

          <Showcase title="Card View">
            <CourseCard course={course} />
          </Showcase>
        </div>

        <CourseEditForm />
      </TabsContent>
    </Form>
  )
}
