import { ColumnDef } from '@tanstack/react-table'
import { CirclePlusIcon } from 'lucide-react'

import { DataTable } from '@/components/custom/data-table'
import { getWidth } from '@/components/custom/data-table/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { TabsContent } from '@/components/ui/tabs'

import { useCourses } from '@/shared/queries/course/course-list'
import { usePreference } from '@/shared/stores/usePreference'
import { TCourse } from '@/shared/types/models/course'
import { secondsToHours } from '@/shared/utils/date'

import ActionMenu from './components/action-menu'
import CourseCreateForm from './components/course-create.form'

const columns: ColumnDef<TCourse>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    meta: {
      label: 'Title'
    },
    filterFn: 'includesString',
    enableColumnFilter: true,
    cell: ({ row }) => <div style={getWidth(150)}>{row.original.title}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: {
      label: 'Description'
    },
    enableSorting: false,
    cell: ({ row }) => (
      <div style={getWidth(250)}>{row.original.description}</div>
    )
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    meta: {
      label: 'Duration',
      align: 'center'
    },
    cell: ({ row }) => (
      <div style={getWidth(250)}>
        {secondsToHours(row.original.duration)} hours
      </div>
    )
  },
  {
    accessorKey: 'student_count',
    header: 'Students',
    meta: {
      label: 'Students',
      align: 'center'
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    meta: {
      label: 'Tags',
      filterVariant: 'multiselect'
    },
    filterFn: 'arrIncludesSome',
    enableColumnFilter: true,
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
    meta: {
      label: 'New',
      align: 'center'
    },
    cell: ({ row }) => (row.original.is_new ? <Badge>New</Badge> : '-')
  },
  {
    accessorKey: 'lesson_count',
    header: 'Lessons',
    cell: ({ row }) => row.original.lesson_count,
    meta: {
      label: 'Lessons',
      align: 'center'
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { label: 'Actions', align: 'center' },
    cell: ({ row }) => {
      const { id } = row.original
      return <ActionMenu course_id={id} />
    }
  }
]

export default function TableView() {
  const { data: courses, isSuccess: coursesReady } = useCourses()
  const page_size = usePreference((s) => s.course.default_page_size)
  const set_page_size = usePreference(
    (s) => s.handlers.course_set_table_page_size
  )

  return (
    coursesReady && (
      <TabsContent value="table">
        <DataTable
          columns={columns}
          data={courses}
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
          toolbar_actions={
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                  <CirclePlusIcon />
                  Create Course
                </Button>
              </SheetTrigger>
              <CourseCreateForm />
            </Sheet>
          }
        />
      </TabsContent>
    )
  )
}
