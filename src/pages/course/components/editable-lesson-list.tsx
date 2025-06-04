import { useEffect, useState } from 'react'

import {
  MoveVerticalIcon,
  PencilIcon,
  PlayCircleIcon,
  UploadIcon
} from 'lucide-react'

import { dx } from '@/lib/dx'

import { SortableList } from '@/components/custom/sortable-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'

import { useLessons } from '@/shared/queries/lesson/lesson-list'
import type { TCourse } from '@/shared/types/models/course'
import type { TLesson } from '@/shared/types/models/lesson'

interface TProps {
  course: TCourse
}

export default function EditableLessonList(props: TProps) {
  const { course } = props
  const { data, isSuccess } = useLessons({ course_id: course.id })
  const [inOrderMode, setInOrderMode] = useState<boolean>(false)
  const [lessons, setLessons] = useState<TLesson[]>([])
  // const hasEdited = useRef(false)

  useEffect(() => {
    if (isSuccess && data && !inOrderMode) {
      setLessons(data)
    }
  }, [data, isSuccess, inOrderMode])

  return (
    <div className="py-6 flex flex-col w-full gap-3">
      <div className="w-full flex justify-between">
        <span className={dx('heading-04')}>Lessons</span>
        {inOrderMode && (
          <span className={dx('body-01', 'text-muted-foreground')}>
            You&apos;re in order mode.
          </span>
        )}
        <Toggle
          size="sm"
          aria-label="Toggle Order Mode"
          variant="outline"
          pressed={inOrderMode}
          onPressedChange={setInOrderMode}
        >
          <MoveVerticalIcon /> Order Lessons
        </Toggle>
      </div>

      <SortableList
        items={lessons}
        onItemsChange={setLessons}
        disabled={!inOrderMode}
        grabStrategy="both"
        renderItem={(item) => (
          <Card className="border h-40 rounded-lg flex overflow-hidden w-full flex-row gap-0 transition-transform">
            <div className="relative aspect-video h-full text-muted-foreground bg-muted flex items-center justify-center border-r">
              <Badge
                variant="outline"
                className="size-7 p-0 absolute top-3 left-3 bg-card"
              >
                {item.order}
              </Badge>
              <PlayCircleIcon className="size-10" />
            </div>
            <CardContent className="py-3 px-6 flex flex-col grow">
              <CardTitle className={dx('heading-03')}>{item.title}</CardTitle>
              <CardDescription className={dx('body-01', 'whitespace-pre-line')}>
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-end gap-1.5">
              <Button variant="outline" size="sm">
                <UploadIcon /> Upload Video
              </Button>
              <Button variant="outline" size="sm">
                <PencilIcon />
                Edit Lesson
              </Button>
            </CardFooter>
          </Card>
        )}
      />
    </div>
  )
}
