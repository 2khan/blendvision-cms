import { dx } from '@/lib/dx'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import type { TCourse } from '@/shared/types/models/course'

interface TProps {
  course: TCourse
}

export default function CourseCard({ course }: TProps) {
  return (
    <Card className="font-client p-2 max-w-80 gap-2 shadow-lg relative z-0">
      <img
        src={course.thumbnail_url}
        alt="Course Thumbnail"
        className="rounded-md aspect-video object-cover"
      />

      <CardHeader className="p-4">
        <div className="flex gap-1 mb-2">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full px-3">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className={dx('heading-03')}>{course.title}</CardTitle>
        <CardDescription>{course.desc}</CardDescription>
      </CardHeader>
    </Card>
  )
}
