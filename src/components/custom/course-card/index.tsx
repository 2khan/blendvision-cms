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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import type { TCourse } from '@/shared/types/models/course'

interface TProps {
  course: TCourse
}

export default function CourseCard(props: TProps) {
  const { course } = props
  return (
    <Card className="gap-3 overflow-hidden">
      <div className="bg-muted text-muted-foreground relative flex aspect-video w-full flex-col items-center justify-center gap-1 border-b">
        <img
          src={course.thumbnail_url}
          alt="Course Thumbnail"
          className="w-full h-full object-cover absolute inset-0"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 rounded-full"
            >
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Course</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader className="grow">
        <CardTitle className={dx('heading-compact-02', 'line-clamp-2')}>
          {course.title}
        </CardTitle>
        <CardDescription className={dx('body-compact-02')}>
          {course.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ClockIcon className="text-muted-foreground" />
          <span className={dx('label-02')}>{course.net_duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <FilmIcon className="text-muted-foreground" />
          <span className={dx('label-02')}>
            {course.lessons.length} lessons
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users2Icon className="text-muted-foreground" />
          <span className={dx('label-02')}>{course.student_count}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Button variant="outline">Students</Button>
        <Button asChild>
          <Link to={`/courses/${course.id}`}>Manage</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
