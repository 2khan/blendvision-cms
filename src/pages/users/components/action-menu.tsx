import { Fragment, useCallback, useState } from 'react'

import { MoreVerticalIcon } from 'lucide-react'

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

import { useDeleteUser } from '@/shared/mutations/users/delete-user'
import { type TUser } from '@/shared/types/models/users'

import EditUserForm from './edit-user.form'

interface TProps {
  user: TUser
}

// FIXME: HACK! Overriding DropdownMenuItem onSelect
// due to issues with Radix Dropdown menu auto closing opened Dialog
// https://github.com/radix-ui/primitives/discussions/1436#discussioncomment-2898397

export default function ActionMenu(props: TProps) {
  const [dialogsOpen, setDialogsOpen] = useState<Record<string, boolean>>({
    delete: false,
    edit: false
  })
  const { user } = props
  const { mutate: deleteUser } = useDeleteUser()

  const handleUserDelete = useCallback(() => {
    deleteUser({ user_id: user.id })
  }, [deleteUser, user.id])

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
          <DropdownMenuItem
            onSelect={() => setDialogsOpen((p) => ({ ...p, edit: true }))}
          >
            Edit Student
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDialogsOpen((p) => ({ ...p, delete: true }))}
          >
            Delete Student
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={dialogsOpen['edit']}
        onOpenChange={(open) => setDialogsOpen((p) => ({ ...p, edit: open }))}
      >
        <EditUserForm user={user} />
      </Dialog>
      <Dialog
        open={dialogsOpen['delete']}
        onOpenChange={(open) => setDialogsOpen((p) => ({ ...p, delete: open }))}
      >
        <DialogContent>
          <DialogTitle>Confirm Student Deletion</DialogTitle>
          <DialogDescription>
            You&apos;re about to permanently delete this student account. This
            action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button variant="destructive" onClick={handleUserDelete}>
                Delete Student
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
