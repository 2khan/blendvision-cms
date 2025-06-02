import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import {
  ClockIcon,
  FilmIcon,
  PlayCircleIcon,
  PlusCircleIcon,
  UserPlus2,
  Users2Icon
} from 'lucide-react'

import { dx } from '@/lib/dx'

import { SortableList } from '@/components/custom/sortable-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'

import { useLessons } from '@/shared/queries/lesson/lesson-list'
import { TCourse } from '@/shared/types/models/course'
import { TLesson } from '@/shared/types/models/lesson'

interface TProps {
  course: TCourse
}

export default function CourseLessons(props: TProps) {
  const { course } = props
  const { data, isSuccess } = useLessons({ course_id: course.id })
  const [lessons, setLessons] = useState<TLesson[]>([])

  useEffect(() => {
    console.log(lessons)
  }, [lessons])

  return (
    <TabsContent value="lessons" className="flex flex-col w-full">
      <div className="absolute top-0 right-0 flex gap-1.5">
        <Button size="sm" variant="outline">
          <UserPlus2 /> Assign Students
        </Button>
        <Button size="sm" variant="outline">
          <PlusCircleIcon /> Create Lesson
        </Button>
      </div>
      <header className="flex w-full border rounded-lg relative overflow-hidden">
        <img
          src={course.thumbnail_url}
          className="absolute w-full h-full inset-0 object-cover -z-10 opacity-10 blur"
          alt="Blurred background"
          aria-hidden
        />
        <div className="font-client flex flex-col grow p-6 border-r justify-end">
          {course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <span className={dx('fluid-display-01', 'mb-1')}>{course.title}</span>
          <span
            className={dx('body-02', 'text-muted-foreground whitespace-pre')}
          >
            {course.description}
          </span>
        </div>

        <div className="w-full max-w-xs grid grid-cols-[max-content_auto] gap-3 p-3">
          <img
            src={course.thumbnail_url}
            alt="Course Thumbnail"
            className="aspect-video object-cover w-full rounded-md col-span-2"
          />

          <span className={dx('heading-compact-01')}>Created at</span>
          <span className={dx('body-compact-01', 'text-end')}>
            {format(course.created_at, 'yyyy/MM/dd HH:mm:ss')}
          </span>

          <div className={dx('heading-compact-01', 'flex gap-1 items-center')}>
            <Users2Icon /> Students
          </div>
          <span className={dx('body-compact-01', 'text-end')}>
            {course.student_count}
          </span>

          <div className={dx('heading-compact-01', 'flex gap-1 items-center')}>
            <FilmIcon />
            Lessons
          </div>
          <span className={dx('body-compact-01', 'text-end')}>
            {course.lesson_count}
          </span>

          <div className={dx('heading-compact-01', 'flex gap-1 items-center')}>
            <ClockIcon /> Duration
          </div>
          <span className={dx('body-compact-01', 'text-end')}>
            {course.duration}
          </span>
        </div>
      </header>
      <div className="py-6 flex flex-col w-full gap-3">
        <span className={dx('heading-04')}>Lessons</span>

        <SortableList
          items={lessons}
          onItemsChange={setLessons}
          dragHandle
          renderItem={(item) => (
            <div className="border h-40 rounded-lg flex overflow-hidden w-full">
              <div className="relative aspect-video h-full text-muted-foreground bg-muted flex items-center justify-center">
                <Badge
                  variant="outline"
                  className="size-7 p-0 absolute top-6 left-6"
                >
                  {item.id}
                </Badge>
                <PlayCircleIcon className="size-10" />
              </div>
              <div className="py-3 px-6 flex flex-col">
                <span></span>
              </div>
            </div>
          )}
        />
      </div>
    </TabsContent>
  )
}
