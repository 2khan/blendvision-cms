import { CirclePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'

import CourseCreateForm from './course-create.form'

interface TProps {
  className?: string
  children?: React.ReactNode
}

export default function CourseCreateTrigger(props: TProps) {
  const { className, children } = props
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children ?? (
          <Button size="sm" variant="outline" className={className}>
            <CirclePlusIcon />
            Create Course
          </Button>
        )}
      </SheetTrigger>
      <CourseCreateForm />
    </Sheet>
  )
}
