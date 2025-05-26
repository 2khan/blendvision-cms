import { MoreVerticalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { type TUser } from '@/shared/types/models/users'

import EditUserForm from './edit-user.form'

interface TProps {
  user: TUser
}

export default function ActionMenu(props: TProps) {
  const { user } = props
  return (
    <Dialog>
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
            <DialogTrigger className="w-full">Edit Student</DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            Delete Student
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserForm user={user} />
    </Dialog>
  )
}
