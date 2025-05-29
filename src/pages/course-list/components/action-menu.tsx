import { Fragment, useCallback, useState } from 'react'

import { MoreVerticalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useDeleteCourse } from '@/shared/mutations/course/course-delete'

interface TProps {
  course_id: string | number
}

export default function ActionMenu(props: TProps) {
  const [dialogsOpen, setDialogsOpen] = useState<Record<string, boolean>>({
    delete: false
  })
  const { course_id } = props
  const { mutate: deleteCourse } = useDeleteCourse()

  const handleCourseDelete = useCallback(() => {
    deleteCourse({ course_id })
  }, [deleteCourse, course_id])

  return (
    <Fragment>
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
          <DropdownMenuItem asChild>
            <Link to={`/courses/${course_id}/lessons`}>Manage</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Students</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/courses/${course_id}`}>Edit Course</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
        onOpenChange={(open) => setDialogsOpen((p) => ({ ...p, delete: open }))}
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
    </Fragment>
  )
}
