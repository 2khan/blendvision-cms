import { useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import CourseCard from '@/components/course/course-card'
import CoverCard from '@/components/course/cover-card'
import Showcase from '@/components/custom/showcase'
import { Form } from '@/components/ui/form'
import { TabsContent } from '@/components/ui/tabs'

import { EditCourseSchema } from '@/shared/mutations/course/course-edit'
import type { TCourse } from '@/shared/types/models/course'

import CourseEditForm from './course-edit.form'
import { normalizeCourse } from './course-edit.utils'

interface TProps {
  course: TCourse
}

type TParams = z.infer<typeof EditCourseSchema>

export default function CoursePreview(props: TProps) {
  const { course } = props

  const form = useForm<TParams>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      tags: course.tags,
      thumbnails: undefined
    }
  })

  useEffect(() => {
    form.reset({
      title: course.title,
      description: course.description,
      tags: course.tags,
      thumbnails: undefined
    })
  }, [course, form])

  const [title, description, tags, thumbnails] = form.watch([
    'title',
    'description',
    'tags',
    'thumbnails'
  ])

  const previews = useMemo(
    () => thumbnails?.map(({ preview }) => preview),
    [thumbnails]
  )

  const mergedCourse = normalizeCourse(course, {
    title,
    description,
    tags,
    thumbnail_url: previews?.[0]
  })

  // FIXME: HACK! This logic should ideally be written in File Uploader Component
  // But due to the fact that the states are shared between components here
  // We must remove the preview here.
  useEffect(() => {
    return () => {
      if (previews && previews.length > 0) {
        previews.forEach((preview) => {
          URL.revokeObjectURL(preview)
        })
      }
    }
  }, [previews])

  return (
    <Form {...form}>
      <TabsContent value="course" className="flex w-full gap-6">
        <div className="grow space-y-3">
          <Showcase title="Hero View">
            <CoverCard course={mergedCourse} />
          </Showcase>

          <Showcase title="Card View">
            <CourseCard course={mergedCourse} />
          </Showcase>
        </div>

        <CourseEditForm course_id={course.id} />
      </TabsContent>
    </Form>
  )
}
