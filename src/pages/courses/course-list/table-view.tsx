import { DataTable } from '@/components/custom/data-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { TabsContent } from '@/components/ui/tabs'
import { MOCK_COURSES } from '@/shared/constants/mock'
import { TCourse } from '@/shared/types/models/course'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVerticalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const columns: ColumnDef<TCourse>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'desc',
    header: 'Description',
    enableSorting: false
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original
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
            <DropdownMenuItem asChild>
              <Link to={`/courses/${id}`}>Manage</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Students</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Course</DropdownMenuItem>
            <DropdownMenuItem>Duplicate Course</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export default function TableView() {
  return (
    <TabsContent value="table" className="">
      <DataTable columns={columns} data={MOCK_COURSES} />
    </TabsContent>
  )
}
