import { useCallback } from 'react'

import { MoreVerticalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useDeleteCourse } from '@/shared/mutations/course/course-delete'

interface TProps {
  course_id: number
}

export default function ActionMenu(props: TProps) {
  const { course_id } = props
  const { mutate: deleteCourse } = useDeleteCourse()

  const handleCourseDelete = useCallback(() => {
    deleteCourse({ course_id })
  }, [deleteCourse, course_id])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="sr-only">Open menu</span>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>Manage</DropdownMenuItem>
        <DropdownMenuItem>Students</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/courses/${course_id}`}>Edit Course</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              variant="destructive"
            >
              Delete Course
            </DropdownMenuItem>
          </DialogTrigger>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
