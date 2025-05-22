import { dx } from '@/lib/dx'

import { GlowEffect } from '@/components/custom/glow-effect'
import { ProgressiveBlur } from '@/components/custom/progressive-blur'
import { Badge } from '@/components/ui/badge'

import type { TCourse } from '@/shared/types/models/course'
import { secondsToHours } from '@/shared/utils/date'

interface TProps {
  course: TCourse
}

export default function CoverCard({ course }: TProps) {
  return (
    <div className="z-0 relative px-8 h-[31.25rem] w-full max-w-7xl text-foreground dark font-client">
      <GlowEffect className="-z-10 opacity-40" />
      <img
        src={course.thumbnail_url}
        alt="Course Thumbnail"
        className="absolute inset-0 w-full object-cover -z-10 h-full rounded-3xl"
      />
      <ProgressiveBlur className="w-full h-full absolute -z-10 rounded-3xl" />
      <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-t from-black/50 rounded-3xl" />

      <div className="text-center flex flex-col items-center justify-center overflow-hidden h-full w-full">
        <span className={dx('fluid-display-03', 'mb-1.5 line-clamp-3')}>
          {course.title}
        </span>
        {course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {course.desc && (
          <p className={dx('body-02', 'mb-3 whitespace-pre-line line-clamp-3')}>
            {course.desc}
          </p>
        )}
        <div className="flex gap-3">
          <div
            className={dx('label-02', 'flex items-center font-semibold gap-1')}
          >
            {secondsToHours(course.net_duration)} total hours
          </div>
          <div
            className={dx('label-02', 'flex items-center font-semibold gap-1')}
          >
            {course.lessons.length} lessons
          </div>
        </div>
      </div>
    </div>
  )
}
