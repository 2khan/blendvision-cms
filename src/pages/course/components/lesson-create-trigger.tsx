import { useCallback, useState } from 'react'

import { CirclePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'

import { TCourse } from '@/shared/types/models/course'

import LessonCreateForm from './lesson-create.form'

interface TProps {
  course_id: TCourse['id']
  className?: string
  children?: React.ReactNode
}

export default function LessonCreateTrigger(props: TProps) {
  const { course_id, className, children } = props
  const [open, setOpen] = useState<boolean>(false)
  const onSuccess = useCallback(() => setOpen(false), [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button size="sm" variant="outline" className={className}>
            <CirclePlusIcon />
            Create Lesson
          </Button>
        )}
      </SheetTrigger>
      <LessonCreateForm course_id={course_id} onSuccess={onSuccess} />
    </Sheet>
  )
}
