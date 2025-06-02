import { useCallback, useState } from 'react'

import { ClockIcon, FilmIcon, MoreVerticalIcon, Users2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { dx } from '@/lib/dx'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useDeleteCourse } from '@/shared/mutations/course/course-delete'
import type { TCourse } from '@/shared/types/models/course'
import { secondsToHours } from '@/shared/utils/date'

import { Badge } from '../ui/badge'

interface TProps {
  course: TCourse
}

export default function GridViewCard(props: TProps) {
  const [dialogsOpen, setDialogsOpen] = useState<Record<string, boolean>>({
    delete: false
  })
  const { course } = props
  const { mutate: deleteCourse } = useDeleteCourse()

  const handleCourseDelete = useCallback(() => {
    deleteCourse({ course_id: course.id })
  }, [deleteCourse, course])

  return (
    <Card className="gap-3 overflow-hidden">
      <div className="bg-muted text-muted-foreground relative flex aspect-video w-full flex-col items-center justify-center gap-1 border-b">
        <img
          src={course.thumbnail_url}
          alt="Course Thumbnail"
          className="w-full h-full object-cover absolute inset-0"
        />
        {course.tags.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <div className="flex flex-wrap gap-1">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-background">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 rounded-full dark:bg-card dark:hover:bg-accent"
            >
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/courses/${course.id}`}>Edit Course</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDialogsOpen((p) => ({ ...p, delete: true }))}
            >
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog
          open={dialogsOpen['delete']}
          onOpenChange={(open) =>
            setDialogsOpen((p) => ({ ...p, delete: open }))
          }
        >
          <DialogContent>
            <DialogTitle>Confirm Course Deletion</DialogTitle>
            <DialogDescription>
              You&apos;re about to permanently delete this course. This action
              cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button variant="destructive" onClick={handleCourseDelete}>
                  Delete Course
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CardHeader className="grow">
        <CardTitle className={dx('heading-compact-02', 'line-clamp-2')}>
          {course.title}
        </CardTitle>
        <CardDescription className={dx('body-compact-02')}>
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ClockIcon className="text-muted-foreground" />
          <span className={dx('label-02')}>
            {secondsToHours(course.duration)} hours
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FilmIcon className="text-muted-foreground" />
          <span className={dx('label-02')}>{course.lesson_count} lessons</span>
        </div>
        <div className="flex items-center gap-1">
          <Users2Icon className="text-muted-foreground" />
          <span className={dx('label-02')}>{course.student_count}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Button variant="outline">Students</Button>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link
              to={{
                pathname: `/courses/${course.id}`,
                search: '?tab=course'
              }}
            >
              Edit
            </Link>
          </Button>
          <Button asChild>
            <Link
              to={{
                pathname: `/courses/${course.id}`,
                search: '?tab=lessons'
              }}
            >
              Manage
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
