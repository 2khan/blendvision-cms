import { DataTable } from '@/components/custom/data-table'
import { getWidth } from '@/components/custom/data-table/utils'
import { Badge } from '@/components/ui/badge'
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
import { usePreference } from '@/shared/stores/usePreference'
import { TCourse } from '@/shared/types/models/course'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVerticalIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const columns: ColumnDef<TCourse>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => (
      <div style={getWidth(150)}>{getValue<string>()}</div>
    )
  },
  {
    accessorKey: 'desc',
    header: 'Description',
    enableSorting: false,
    cell: ({ getValue }) => (
      <div style={getWidth(250)}>{getValue<string>()}</div>
    )
  },
  {
    accessorKey: 'net_duration',
    header: 'Duration',
    meta: {
      align: 'center'
    }
  },
  {
    accessorKey: 'student_count',
    header: 'Students',
    meta: {
      align: 'center'
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => (
      <div style={getWidth(150)} className="flex flex-wrap gap-1">
        {row.original.tags.map((tag) => (
          <Badge variant="outline" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    )
  },
  {
    accessorKey: 'is_new',
    header: 'New',
    enableSorting: false,
    cell: ({ row }) => (row.original.is_new ? <Badge>New</Badge> : '-'),
    meta: {
      align: 'center'
    }
  },
  {
    accessorKey: 'lessons',
    header: 'Lessons',
    cell: ({ row }) => row.original.lessons.length,
    meta: {
      align: 'center'
    }
  },
  {
    accessorKey: 'recommended_courses',
    header: 'Recommended',
    cell: ({ row }) => row.original.recommended_courses.length,
    meta: {
      align: 'center'
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: {
      align: 'center'
    },
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
  const page_size = usePreference((s) => s.course.default_page_size)
  const set_page_size = usePreference(
    (s) => s.handlers.course_set_table_page_size
  )

  return (
    <TabsContent value="table">
      <DataTable
        columns={columns}
        data={MOCK_COURSES}
        meta={{
          onPageSizeChange: set_page_size
        }}
        options={{
          initialState: {
            pagination: {
              pageSize: page_size
            }
          }
        }}
      />
    </TabsContent>
  )
}
